<template>
  <!-- <div>美工毛利润报表</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline" v-show="show">
          <el-form-item label="部门" class="input">
            <el-select v-model="formInline.region" multiple collapse-tags placeholder="部门" @change="choosed">
              <el-option v-for="(item,index) in section" :index="item[index]" :key="item.department" :label="item.department" :value="item.department"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="美工员" class="input">
            <el-select v-model="condition.member" multiple collapse-tags placeholder="美工员">
              <el-option v-for="(item,index) in member" :index="item[index]" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
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
    <el-table ref="table" :data="tableData" id="sale-table" size="medium" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight" :highlight-current-row="true" style="width: 100%;zoom:0.9;">
      <el-table-column min-width="90px" prop="possessman1Zero" label="责任人" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="salemoneyrmbznZero" label="销售额￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netprofitZero" label="毛利润￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netrateZero" label="毛利率%（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="salemoneyrmbznSix" label="销售额￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netprofitSix" label="毛利润￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netrateSix" label="毛利率%（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netprofitTwe" label="毛利润￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="190px" prop="netrateTwe" label="毛利率%（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="160px" prop="salemoneyrmbtotal" label="销售额￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="160px" prop="netprofittotal" label="毛利润￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="170px" prop="netratetotal" label="毛利率%￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
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
      autoHeight: "",
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      section: [],
      department: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      member: [],
      formInline: {
        user: "",
        region: []
      },
      condition: {
        member: [],
        dateType: 1,
        dateRange: []
      },
      membery: {
        id: "",
        region: ""
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
              let m = start.getMonth();
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
    choosed() {
      let res = [];
      this.member = [];
      let val = this.formInline.region;
      res = this.allMember;
      let per = [];
      if (val != "") {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele => ele.department == val[i] && ele.position == "美工"
          );
          this.member = this.member.concat(per);
        }
      } else {
        this.member = res;
      }
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show == false) {
        this.text = "显示输入框";
        let height = document.getElementById("app").clientHeight;
        this.autoHeight = height - 58 + "px";
        this.tableHeight = height - 58 + "px";
        let that = this;
        window.onload = () => {
          that.autoHeight = height - 58 + "px";
          that.tableHeight = height - 58 + "px";
        };
      } else if (this.show == true) {
        this.text = "隐藏输入框";
        let height = document.getElementById("app").clientHeight;
        this.autoHeight = height - 123 + "px";
        this.tableHeight = height - 123 + "px";
        let that = this;
        window.onload = () => {
          that.autoHeight = height - 123 + "px";
          that.tableHeight = height - 123 + "px";
        };
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    onSubmit(form) {
      let height = document.getElementById("app").clientHeight;
      this.autoHeight = height - 123 + "px";
      this.tableHeight = height - 123 + "px";
      let that = this;
      window.onload = () => {
        that.autoHeight = height - 123 + "px";
        that.tableHeight = height - 123 + "px";
      };
      this.show2 = true;
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true;
          if (
            this.formInline.region.length !== 0 &&
            this.condition.member.length === 0
          ) {
            let val = this.formInline.region;
            let res = [];
            let person = [];
            res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              person = res.filter(
                ele => ele.department == val[i] && ele.position == "美工"
              );
              this.member.concat(person);
            }
            form.member = this.member.map(m => {
              return m.username;
            });
            getPossess(form).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          } else if (this.condition.member.length !== 0) {
            this.listLoading = true;
            form.member = this.condition.member;
            getPossess(form).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          } else {
            this.listLoading = true;
            getPossess(form).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //空值显示“--”
    empty(row, column, cellValue, index) {
      return cellValue ? cellValue : "--";
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
    }
  },
  mounted() {
    getSection().then(response => {
      this.section = response.data.data;
    });
    getMember().then(response => {
      let res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position == "美工");
    });
  }
};
</script>

<style lang="scss">
.el-table__body {
  td {
    padding: 5px 0;
    .cell {
      line-height: normal;
    }
  }
}
.el-table__footer {
  .cell {
    line-height: normal;
    color: red;
    font-weight: 550;
  }
}
.el-radio.is-bordered {
  padding: 6px 16px 0 6px;
  height: 30px;
}
</style>
