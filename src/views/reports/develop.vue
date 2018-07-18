<template>
  <!-- <div>开发毛利润报表</div>     -->
  <div>
    <el-form :model="condition" :inline="true" ref="condition" label-width="100px" class="demo-form-inline">
      <el-form-item label="部门" class="input">
        <el-select v-model="formInline.region" placeholder="部门">
          <el-option v-for="(item,index) in section" :index="item[index]" :key="item.id" :label="item.department" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员" class="input">
        <el-select v-model="condition.member" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="时间类型" class="input" prop="dateType">
        <el-radio-group v-model="condition.dateType">
          <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期" class="input">
        <el-date-picker v-model="condition.dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
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
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="业绩归属1人表" name="first">
        <el-table :data="tableData01" id="sale-table01" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="630" style="width: 100%">
          <el-table-column prop="salernameZero" label="业绩归属人" sortable></el-table-column>
          <el-table-column prop="salemoneyrmbznZero" label="销售额￥（0-6月）" sortable></el-table-column>
          <el-table-column prop="netprofitZero" label="毛利润￥（0-6月）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateZero" label="毛利率%（0-6月）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbznSix" label="销售额￥（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofitSix" label="毛利润￥（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateSix" label="毛利率%（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofitTwe" label="毛利润￥（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateTwe" label="毛利率%（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbtotal" label="销售额￥（汇总）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofittotal" label="毛利润￥（汇总）" sortable="custom"></el-table-column>
          <el-table-column prop="netratetotal" label="毛利率%（汇总）" sortable="custom"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="业绩归属2人表" name="second">
        <el-table :data="tableData02" id="sale-table02" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="630" style="width: 100%">
          <el-table-column prop="salernameZero" label="业绩归属人2" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbznZero" label="销售额￥（0-6月）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofitZero" label="毛利润￥（0-6月）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateZero" label="毛利率%（0-6月）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbznSix" label="销售额￥（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofitSix" label="毛利润￥（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateSix" label="毛利率%（6-12月）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofitTwe" label="毛利润￥（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="netrateTwe" label="毛利率%（12月以上）" sortable="custom"></el-table-column>
          <el-table-column prop="salemoneyrmbtotal" label="销售额￥（汇总）" sortable="custom"></el-table-column>
          <el-table-column prop="netprofittotal" label="毛利润￥（汇总）" sortable="custom"></el-table-column>
          <el-table-column prop="netratetotal" label="毛利率%（汇总）" sortable="custom"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
// import { getSection,getPlatform,getMember,getStore,getAccount } from '../../api/profit'

export default {
  data() {
    return {
      activeName: "first",
      tableData01: [],
      tableData02: [],
      searchTableFirst: [],
      searchTableSecond: [],
      searchValue: "",
      listLoading: false,
      section: [],
      member: [],
      department: [],
      dateRange: [],
      dateType: [{ id: 0, type: "发货时间" }, { id: 1, type: "交易时间" }],
      formInline: {
        user: "",
        region: ""
      },
      condition: {
        member: "",
        dateType: "",
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
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    onSubmit(form) {
      this.listLoading = true;
      getDevelop(form).then(response => {
        this.listLoading = false;
        const ret = response.data.data;
        let posseman1Data = ret.filter(ele => ele.tableType == "归属1人表");
        let posseman2Data = ret.filter(ele => ele.tableType == "归属2人表");
        this.tableData01 = this.searchTableFirst = posseman1Data;
        this.tableData02 = this.searchTableSecond = posseman2Data;
      });
    },
    handleSearch() {
      let searchValue = this.searchValue && this.searchValue.toLowerCase();
      const tableMap = {
        first: {
          tableData: 'tableData01',
          searchTable: 'searchTableFirst'
        },
        second:{
          tableData: 'tableData02',
          searchTable: 'searchTableSecond'
        },
      };
      let activeTable = this.activeName;
      let data = this[tableMap[activeTable]['searchTable']];
      if (searchValue) {
        this[tableMap[activeTable]['tableData']] = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])  
                .toLowerCase()
                .indexOf(searchValue) > -1
            );
          });
        });
      } else {
        this[tableMap[activeTable]['tableData']] = data;
      }
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
    getSection().then(response => {
      this.department = response.data.data;
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.input {
  margin-left: 100px;
  .input_w {
    width: 350px;
  }
}
</style>
