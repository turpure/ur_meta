<template>
  <!-- <div>采购毛利润报表</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline" v-show="show">
          <el-form-item label="销售员" class="input">
            <el-select v-model="formInline.region" placeholder="销售员">
              <el-option v-for="(item,index) in member" :index="item[index]" :key="item.id" :label="item.username" :value="item.id"></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>

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
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0px;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i">
          </i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="2" :offset="20">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left;" type="default" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="690" style="width: 100%">
      <el-table-column min-width="90px" prop="purchaser" label="采购员" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="salemoneyrmbus" label="成交价$" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="salemoneyrmbzn" label="成交价￥" sortable="custom"></el-table-column>
      <el-table-column min-width="130px" prop="ppebayus" label="交易费汇总$" sortable="custom"></el-table-column>
      <el-table-column min-width="130px" prop="ppebayzn" label="交易费汇总￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="costmoneyrmb" label="商品成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="expressfarermb" label="运费成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="inpackagefeermb" label="包装成本￥" sortable="custom"></el-table-column>
      <el-table-column min-width="115px" prop="devofflinefee" label="死库处理￥" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="devopefee" label="运营杂费￥" sortable="custom"></el-table-column>
      <el-table-column min-width="90px" prop="netprofit" label="毛利￥" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="netrate" label="毛利率%" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="totalamount" label="采购差额￥" sortable="custom"></el-table-column>
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
      isA: true,
      text: "显示输入框",
      show: false,
      show1: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
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
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show == false) {
        this.text = "显示输入框";
      } else if (this.show == true) {
        this.text = "隐藏输入框";
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    onSubmit(form) {
      this.listLoading = true;
      getPurchase(form).then(response => {
        this.listLoading = false;
        this.tableData = this.searchTable = response.data.data;
      });
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
      sums[fileds.indexOf("netrate")] =
        Math.round(
          sums[fileds.indexOf("netprofit")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbzn")]
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
    }
    //  return wbout
  },
  mounted() {
    var access_token = getMyToken();
    getMember(access_token).then(response => {
      this.member = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
