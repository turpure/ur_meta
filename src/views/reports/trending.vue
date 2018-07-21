<template>
  <!-- <div>销售额走势</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" class="demo-form-inline" label-width="68px" v-show="show">
          <el-form-item label="时间类型" class="input">
            <el-select v-model="condition.dateType" placeholder="按天">
              <el-option label="按天" value="shanghai"></el-option>
              <el-option label="按月" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" class="input">
            <el-select v-model="condition.department" multiple placeholder="部门">
              <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" class="input">
            <el-select v-model="condition.plat" multiple placeholder="平台" style="height: 30px;">
              <el-option v-for="(item,index) in plat" :index="index" :key="item.plat" :label="item.plat" :value="item.plat">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员" class="input">
            <el-select v-model="condition.member" multiple placeholder="销售员">
              <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型" class="input">
            <el-select v-model="condition.dateType" placeholder="发货时间">
              <el-option label="发货时间" value="shanghai"></el-option>
              <el-option label="交易时间" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="input">
            <el-date-picker v-model="condition.dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="账号" class="input">
            <el-select v-model="condition.account" multiple collapse-tags placeholder="账号">
              <el-option v-for="(item,index) in account" :index="item[index]" :key="item.store" :label="item.store" :value="item.store"></el-option>
            </el-select>
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
    <highcharts :options="options" style="height:700px;width:100%;"></highcharts>
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
import highcharts from "../charts/highcharts";

export default {
  data() {
    return {
      isA: true,
      text: "显示输入框",
      id: "test",
      options: {
        chart: {
          type: "areaspline"
        },
        title: {
          text: "销售额走势$"
        },
        subtitle: {
          text: "数据来源: "
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: "美元 ( $ )"
          },
          labels: {
            formatter: function() {
              return this.value + "$";
            }
          }
        },
        tooltip: {
          shared: true,
          pointFormat: "{series.name}：<b>{point.y:,.2f}</b>"
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        series: [
          {
            name: "公司全部",
            data: []
          }
        ]
      },
      show: false,
      show1: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      section: [],
      platform: [],
      plat: [],
      member: [],
      account: [],
      department: [],
      dateType: [],
      dateRange: [],
      condition: {
        department: "",
        plat: "",
        member: "",
        store: [],
        dateType: "",
        dateRange: [],
        account: []
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
      getSalestrend(form).then(response => {
        this.listLoading = false;
        let ret = response.data.data;
        let posseman1Data = ret.map(ele => {
          return ele.ordertime;
        });
        let posseman2Data = ret.map(ele => {
          return ele.totalamt;
        });
        this.options.xAxis.categories = posseman1Data;
        this.options.series[0].data = posseman2Data.map(Number);
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
      this.section = response.data;
    });
    getPlatform(access_token).then(response => {
      this.platform = response.data;
    });
    getMember(access_token).then(response => {
      this.member = response.data;
    });
    getAccount(access_token).then(response => {
      this.account = response.data.data;
    });
    getMember().then(response => {
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

<style lang="scss">
.container .main .content-container[data-v-0ff1e341] {
  margin: 0px;
  padding: 1px;
  .demo-block.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  .demo-block {
    border: 0px solid #ebebeb;
    border-radius: 3px;
    transition: height 0.2s;
    .demo-block-control:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    .demo-block-control {
      border-bottom: 1px solid #eaeefb;
      border-top: 1px solid #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
      i {
        font-size: 16px;
        line-height: 44px;
        transition: 0.3s;
      }
      i.hovering {
        transform: translateX(-40px);
      }
      [class^="el-icon-"] {
        font-family: element-icons !important;

        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .demo-block-control > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: 0.3s;
      }
    }
    form {
      margin-left: 5px;
      background-color: #fafafa;
      transition: 0.2s 0.2s;
      .el-input__inner {
        height: 30px !important;
      }
      .el-date-editor .el-range__icon {
        line-height: 1px;
      }
      .el-date-editor .el-range-separator {
        line-height: 20px;
      }
    }
  }
}
</style>
