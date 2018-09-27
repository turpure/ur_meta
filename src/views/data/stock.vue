<template>
  <el-row class="container">
    <el-col :span='24'>
      <div class="portlet">
        <el-row :gutter='10' class="toolbar" style="margin-top:0px;margin-bottom:0px;padding-bottom:2px;padding-top:2px">
          <el-col :span="8">
            <span>备注：报表中商品的销量和库存指的是对应
              <font color="red">
                <big>缺货SKU</big>
              </font>的销量和库存之和
            </span>
          </el-col>
          <el-col :span='2' :offset='12'>
            <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
          </el-col>
          <el-col :span='2'>
            <el-button style='float:left' type='default' @click='exportExcel'>导出Excel</el-button>
          </el-col>
        </el-row>
        <el-table :header-cell-style="thstyle" max-height="800" :data="tableData" @sort-change="sortNumber" style="width: 100%;">
          <el-table-column min-width="80px" prop="Season" label="季节" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="goodscode" label="商品编码" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="130px" prop="num" label="最大延迟天数" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="delay_days" label="SKU数" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="goodsname" label="商品名" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="GoodsCodeStat" label="商品状态" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="Purchaser" label="采购人" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="130px" prop="SalerName" label="业绩归属人1" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="130px" prop="StockDays" label="采购到货天数" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="130px" prop="sellDays" label="预警销售天数" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="100px" prop="SellCount1" label="5天销量" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="110px" prop="SellCount2" label="10天销量" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="110px" prop="SellCount3" label="20天销量" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="120px" prop="factStockNum" label="实际库存量" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="120px" prop="NotInStore" label="采购未入库" :formatter="empty" sortable></el-table-column>
          <el-table-column min-width="130px" prop="hopeUseNum" label="预计可用库存" :formatter="empty" sortable></el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar" v-show="total>0" style="margin-top:0px">
          <div class="pagination-container" align="right">
            <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getStock } from "../../api/profit";
export default {
  data() {
    return {
      page: 1,
      size: 2,
      total: 10,
      tableData: [],
      searchTable: [],
      searchValue: ""
    };
  },
  methods: {
    thstyle({ row, column, rowIndex, columnIndex }) {
      if (
        (rowIndex === 0 && columnIndex === 2) ||
        columnIndex === 13 ||
        columnIndex === 15
      ) {
        //指定坐标
        return "color:red";
      } else {
        return "";
      }
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
    },
    handleCurrentChange(val) {
      this.page = val;
    }
  },
  mounted() {
    getStock().then(response => {
      this.tableData = this.searchTable = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
span {
  color: black;
}
.el-col-24 {
  .portlet {
    .portlet-title {
      background-color: #4b8df8;
      //margin-bottom: 0px;
      padding: 8px 10px 4px 10px;
      border-bottom: 1px solid #eee;
      color: #fff !important;
    }
  }
}
</style>

