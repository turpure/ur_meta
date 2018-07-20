<template>
  <!-- <div>美工毛利润报表</div>     -->
  <div>
    <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline" v-show="show">
      <el-form-item label="部门" class="input">
        <el-select v-model="formInline.region" placeholder="部门">
          <el-option v-for="(item,index) in section" :index="item[index]" :key="item.id" :label="item.department" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销售员" class="input">
        <el-select v-model="membery.region" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="item[index]" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发货时间" class="input">
        <el-select v-model="formInline.region" placeholder="发货时间">
          <el-option label="发货时间" value="shanghai"></el-option>
          <el-option label="交易时间" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" class="input">
        <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="2" :offset="17">
        <el-input clearable placeholder="search" v-model="searchValue" v-on:change="handleSearch"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button style="float:left;" type="default" @click="exportExcel">导出Excel</el-button>
        <el-button style="float:right;" @click="show = !show">隐藏</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="690" style="width: 100%">
      <el-table-column min-width="90px" prop="possessman1Zero" label="责任人" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="salemoneyrmbznZero" label="销售额￥（0-6月）" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netprofitZero" label="毛利润￥（0-6月）" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netrateZero" label="毛利率%（0-6月）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="salemoneyrmbznSix" label="销售额￥（6-12月）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netprofitSix" label="毛利润￥（6-12月）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netrateSix" label="毛利率%（6-12月）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netprofitTwe" label="毛利润￥（12月以上）" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netrateTwe" label="毛利率%（12月以上）" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="salemoneyrmbtotal" label="销售额￥（汇总）" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netprofittotal" label="毛利润￥（汇总）" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netratetotal" label="毛利率%￥（汇总）" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMyToken } from "../../api/api";
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
      show: "true",
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      section: [],
      member: [],
      formInline: {
        user: "",
        region: ""
      },
      condition: {
        member: "",
        dateType: 0,
        dateRange: ["2018-07-04", "2018-07-13"]
      },
      membery: {
        id: "",
        region: ""
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
      value5: [],
      value11: [],
      value7: ""
    };
  },
  methods: {
    onSubmit(form) {
      this.listLoading = true;
      getPossess(form).then(response => {
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
      sums[fileds.indexOf("netrateZero")] =
        Math.round(
          sums[fileds.indexOf("netprofitZero")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznZero")]
        ) / 100;
      sums[fileds.indexOf("netrateSix")] =
        Math.round(
          sums[fileds.indexOf("netprofitSix")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznSix")]
        ) / 100;
      sums[fileds.indexOf("netrateTwe")] =
        Math.round(
          sums[fileds.indexOf("netprofitTwe")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznTwe")]
        ) / 100;
      sums[fileds.indexOf("netratetotal")] =
        Math.round(
          sums[fileds.indexOf("netprofittotal")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbtotal")]
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
  },
  mounted() {
    var access_token = getMyToken();
    getSection(access_token).then(response => {
      this.section = response.data.data;
    });
    getMember(access_token).then(response => {
      this.member = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
