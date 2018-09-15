<template>
  <div>
    <el-form :model='condition' :inline='true' ref='condition' label-width='100px' class='demo-form-inline'>
      <el-form-item label="平台">
        <el-select v-model="condition.plat" clearable>
          <el-option v-for="item in plat" :key="item.plat" :value="item.plat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卖家简称">
        <el-select v-model="condition.suffix" clearable>
          <el-option v-for="item in suffix" :key="item.id" :value="item.store"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业绩归属人1">
        <el-select v-model="condition.saler" clearable>
          <el-option v-for="(item,index) in saler" :index="index" :key="item.username" :value="item.username"></el-option>
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
    <el-table v-loading="listLoading" height="760" :data="tableData" @sort-change="sortNumber" style="width: 100%;">
      <el-table-column min-width="100px" prop="GoodsCode" label="商品编码" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="GoodsName" label="商品名称" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="GoodsSKUStatus" label="商品状态" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="80px" prop="CategoryName" label="类目" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="80px" prop="SalerName" label="归属1" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="80px" prop="SalerName2" label="归属2" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="CreateDate" label="创建日期" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="jinyitian" label="近1天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="shangyitian" label="上1天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="changeOneDay" label="1天销量变化" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="jinwutian" label="近5天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="shangwutian" label="上5天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="changeFiveDay" label="5天销量变化" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="120px" prop="jinshitian" label="近10天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="120px" prop="shangshitian" label="上10天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="changeTenDay" label="10天销量变化" :formatter="empty" sortable></el-table-column>

    </el-table>
    <div class="block" align="right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getPsales,
  getMember,
  getPlatform,
  getAccount
} from "../../api/profit";
export default {
  data() {
    return {
      listLoading: false,
      currentPage: 0,
      tableData: [],
      searchTable: [],
      searchValue: "",
      total: null,
      plat: [],
      suffix: [],
      saler: [],
      condition: { plat: "", suffix: "", saler: "" }
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmit() {
      this.listLoading = true;
      getPsales(this.condition).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data;
        this.total = this.tableData.length;
      });
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
      return cellValue ? cellValue : "--";
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
    getMember().then(response => {
      let s = response.data.data;
      this.saler = s.filter(e => e.position == "开发");
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
    getAccount().then(response => {
      this.suffix = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 10px;
}
</style>
