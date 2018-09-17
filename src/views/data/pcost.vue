<template>
  <div>
    <el-form :model='condition' :inline='true' ref='condition' label-width='150px' class='demo-form-inline'>
      <el-form-item label="发货开始时间" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]" prop="beginDate">
        <el-date-picker v-model='condition.beginDate' type='date' value-format='yyyy-MM-dd' placeholder='开始日期'></el-date-picker>
      </el-form-item>
      <el-form-item label="发货结束时间" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]" prop="endDate">
        <el-date-picker v-model='condition.endDate' type='date' value-format='yyyy-MM-dd' placeholder='结束日期'></el-date-picker>
      </el-form-item>
      <el-form-item label="物流公司">
        <el-select v-model="condition.wlCompany" clearable>
          <el-option v-for="item in wlCompany" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter='10'>
      <el-col :span='2' :offset='20'>
        <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left' type='default' @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table id="sale-table" :row-style="row" :header-row-style="rowheader" v-loading="listLoading" height="800" :data="tableData" @sort-change="sortNumber" style="width: 100%;" v-show="show">
      <el-table-column prop="wlCompany" label="物流公司" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="eBay" label="eBay￥" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="Wish" label="Wish￥" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="Amazon" label="Amazon￥" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="SMT" label="SMT$" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="Shopee" label="Shopee￥" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="total" label="合计￥" :formatter="empty" sortable></el-table-column>
      <el-table-column prop="fare" label="实际费用￥" :formatter="empty" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPerformlogistics, getPerformcost } from "../../api/profit";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      show: false,
      listLoading: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      wlCompany: [],
      condition: {
        beginDate: "",
        endDate: "",
        wlCompany: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.show = true;
          this.listLoading = true;
          getPerformcost(this.condition).then(response => {
            this.listLoading = false;
            let obj = response.data.data;
            let arr = [];
            for (let i in obj) {
              arr.push(obj[i]);
            }
            this.tableData = this.searchTable = arr;
            // console.log(this.tableData);
          });
        }
      });
    },
    row({ row, rowIndex }) {
      if (rowIndex === 17) {
        //指定坐标
        return "color:red";
      } else if (rowIndex === 16) {
        return "font-weight: 600;color:black";
      }
    },
    rowheader({ row, rowIndex }) {
      return "font-weight:600;color:black";
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#sale-table"));
      /* get binary string as output */
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      const filename =
        "物流费用" + year + month + strDate + hour + minute + second;
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          filename + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      //  return wbout
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase();
      const data = this.searchTable;
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            );
          });
        });
      } else {
        this.tableData = data;
      }
    },
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    }
  },
  mounted() {
    getPerformlogistics().then(response => {
      this.wlCompany = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 10px;
}
</style>
