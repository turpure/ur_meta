<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <span>导出数据</span>
    </el-col>
    <el-col :span="22">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注：报表中商品的销量和库存指的是对应
        <font color="red">
          <big>缺货SKU</big>
        </font>的销量和库存之和
      </span>
    </el-col>
    <el-col :span='23'>
      <div class="portlet">
        <div class="portlet-title">
          <big>缺货产品表</big>
        </div>
        <el-col :span='2' :offset='22'>
          <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
        </el-col>
        <el-table height="700" :data="tableData" @sort-change="sortNumber" style="width: 100%;">
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
        <div class="block" align="right">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getStock } from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      searchTable: [],
      searchValue: "",
      total: null
      //currentPage: 5
    };
  },
  methods: {
    total() {
      return this.tableData.length;
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
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  },
  mounted() {
    getStock().then(response => {
      this.tableData = this.searchTable = response.data.data;
      this.total = this.tableData.length;
    });
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin: 0;
  border: 0px;
  padding: 0px;
  box-shadow: none;
  height: 42px;
  min-height: 42px;
  background-color: #212121;
  span {
    color: white;
    display: inline-block;
    margin-top: -1px;
    margin-right: 0;
    padding: 10px;
    font-size: 18px;
  }
}
.el-col-22 {
  margin-top: 20px;
  margin-bottom: 0;
}
.el-col-23 {
  padding-left: 20px;
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

