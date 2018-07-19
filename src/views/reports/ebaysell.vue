<template>
  <!-- <div>ebay销售毛利润报表</div>     -->
  <div>
    <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline">
      <el-form-item label="发货时间" class="input">
        <el-select v-model="formInline.region" placeholder="发货时间">
          <el-option label="发货时间" value="shanghai"></el-option>
          <el-option label="交易时间" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" class="input">
        <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="2" :offset="20">
        <el-input clearable placeholder="search" v-model="searchValue" v-on:change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="default" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="630" style="width: 100%">
      <el-table-column min-width="80px" prop="pingtai" label="平台" sortable></el-table-column>
      <el-table-column min-width="80px" prop="suffix" label="账号" sortable></el-table-column>
      <el-table-column min-width="90px" prop="salesman" label="销售员" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="salemoney" label="成交价$" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="salemoneyzn" label="成交价￥" sortable="custom"></el-table-column>
      <el-table-column min-width="130px" prop="ebayFeeebay" label="eBay成交费$" sortable="custom"></el-table-column>
      <el-table-column min-width="140px" prop="ebayfeeznebay" label="eBay成交费￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="ppFee" label="PP成交费$" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="ppFeezn" label="PP成交费￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="costmoney" label="商品成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="expressFare" label="运费成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="inpackagemoney" label="包装成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="storename" label="发货仓库" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="refund" label="退款金额￥" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="refundrate" label="退款率%" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="diefeeZn" label="死库处理￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="insertionFee" label="店铺杂费￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="saleOpeFeeZn" label="运营杂费￥" sortable="custom"></el-table-column>
      <el-table-column min-width="90px" prop="grossprofit" label="毛利￥" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="grossprofitRate" label="毛利率%" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getSection,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getSales,
  getDevelop,
  getPurchase,
  getPossess,
  getEbaysales,
  getSalestrend,
  getArtist
} from "../../api/profit";
import { compareUp, compareDown } from "../../api/tools";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      formInline: {
        user: "",
        region: ""
      },
      condition: {
        member: "",
        dateType: 0,
        dateRange: ["2018-07-04", "2018-07-13"]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      value7: ""
    };
  },
  methods: {
    onSubmit(form) {
      this.listLoading = true;
      getEbaysales(form).then(response => {
        this.listLoading = false;
        this.tableData = this.searchTable = response.data.data;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : "unkonwn")
        );
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Math.round(sums[index] * 100) / 100;
        } else {
          sums[index] = "N/A";
        }
      });
      //退款率和利润率核算
      sums[fileds.indexOf("refundrate")] =
        Math.round(
          sums[fileds.indexOf("refund")] *
            10000 /
            sums[fileds.indexOf("salemoneyzn")]
        ) / 100;
      sums[fileds.indexOf("grossprofitRate")] =
        Math.round(
          sums[fileds.indexOf("grossprofit")] *
            10000 /
            sums[fileds.indexOf("salemoneyzn")]
        ) / 100;
      return sums;
    },
    //数字排序
    sortNumber(column, prop, order) {
      let data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    //导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#sale-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      //  return wbout
    },
    handleSearch() {
      let searchValue = this.searchValue && this.searchValue.toLowerCase();
      let data = this.searchTable;

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
      console.log("Running!");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
