<template>
  <!-- <div>采购毛利润报表</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="6.8rem" class="demo-form-inline" v-show="show">
          <el-form-item label="采购员" class="input">
            <el-select v-model="condition.member" multiple collapse-tags placeholder="采购员">
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for="(item,index) in member" :index="item[index]" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem;">
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
    <el-table :data="tableData" id="sale-table" size="medium" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight" :highlight-current-row="true" style="width: 100%">
      <el-table-column min-width="90" prop="purchaser" label="采购员" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100" prop="salemoneyrmbus" label="成交价$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100" prop="salemoneyrmbzn" label="成交价￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="130" prop="ppebayus" label="交易费汇总$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="130" prop="ppebayzn" label="交易费汇总￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="costmoneyrmb" label="商品成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="expressfarermb" label="运费成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="inpackagefeermb" label="包装成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="devofflinefee" label="死库处理￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120" prop="devopefee" label="运营杂费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="90" prop="netprofit" label="毛利￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100" prop="netrate" label="毛利率%" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120" prop="totalamount" label="采购差额￥" :formatter="empty" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMyToken } from "../../api/api";
import { getMember, getPurchase } from "../../api/profit";
import { compareUp, compareDown } from "../../api/tools";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      tableHeight: 0,
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      member: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      condition: {
        member: [],
        dateType: 1,
        dateRange: []
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const y = end.getFullYear();
              let m = end.getMonth() + 1;
              if (m < 10) {
                m = "0" + m;
              }
              const firstday = y + "-" + m + "-" + "01";
              const start = new Date();
              const sy = start.getFullYear();
              let sm = start.getMonth() + 1;
              const sd = start.getDate();
              if (sm < 10) {
                sm = "0" + sm;
              }
              const sfirstday = sy + "-" + sm + "-" + sd;
              picker.$emit("pick", [firstday, sfirstday]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              const y = start.getFullYear();
              const m = start.getMonth();
              let lastday;
              let firstday;
              if (
                m == 1 ||
                m == 3 ||
                m == 5 ||
                m == 7 ||
                m == 8 ||
                m == 10 ||
                m == 12
              ) {
                lastday = y + "-" + ("0" + m) + "-" + "31";
              } else if (m == 4 || m == 6 || m == 9 || m == 11) {
                lastday = y + "-" + ("0" + m) + "-" + "30";
              } else if (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) {
                lastday = y + "-" + "02" + "-" + "29";
              } else {
                lastday = y + "-" + "02" + "-" + "28";
              }
              firstday = y + "-" + ("0" + m) + "-" + "01";
              picker.$emit("pick", [firstday, lastday]);
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
          }
        ]
      }
    };
  },
  methods: {
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.condition.member = allValues;
    },
    noselectm() {
      this.condition.member = [];
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show == false) {
        this.text = "显示输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 140 + "px";
      } else if (this.show == true) {
        this.text = "隐藏输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 220 + "px";
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    onSubmit(form) {
      const height = document.getElementById("app").clientHeight;
      this.tableHeight = height - 220 + "px";
      this.show2 = true;
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true;
          getPurchase(form).then(response => {
            this.listLoading = false;
            this.tableData = this.searchTable = response.data.data;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      row.totalamount = Math.round(row.totalamount * 100) / 100;
      return cellValue || "--";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
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
      // 退款率和利润率核算
      sums[fileds.indexOf("netrate")] =
        Math.round(
          (sums[fileds.indexOf("netprofit")] * 10000) /
            sums[fileds.indexOf("salemoneyrmbzn")]
        ) / 100;
      return sums;
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    // 导出
    exportExcel() {
      const th = [
        "采购员",
        "成交价$",
        "成交价￥",
        "交易费汇总$",
        "交易费汇总￥",
        "商品成本￥",
        "运费成本￥",
        "包装成本￥",
        "死库处理￥",
        "运营杂费￥",
        "毛利￥",
        "毛利率%",
        "采购差额￥"
      ];
      const filterVal = [
        "purchaser",
        "salemoneyrmbus",
        "salemoneyrmbzn",
        "ppebayus",
        "ppebayzn",
        "costmoneyrmb",
        "expressfarermb",
        "inpackagefeermb",
        "devofflinefee",
        "devopefee",
        "netprofit",
        "netrate",
        "totalamount"
      ];
      const filename = "采购毛利润报表";
      const data = this.tableData.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data;
      this.member = res.filter(ele => ele.position == "采购");
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
