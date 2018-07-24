<template>
  <!-- <div>销售毛利润报表</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline" v-show="show">
          <el-form-item label="部门" class="input">
            <el-select v-model="condition.department" multiple collapse-tags placeholder="部门">
              <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" class="input">
            <el-select v-model="condition.plat" multiple collapse-tags placeholder="平台">
              <el-option v-for="(item,index) in plat" :index="index" :key="item.plat" :label="item.plat" :value="item.plat"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员" class="input">
            <el-select v-model="condition.member" multiple collapse-tags placeholder="销售员">
              <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出货仓库" class="input">
            <el-select v-model="condition.store" placeholder="请选择">
              <el-option v-for="(item,index) in store" :index="index" :key="item.store" :label="item.store" :value="item.store">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="账号" class="input">
            <el-select v-model="condition.account" multiple collapse-tags placeholder="账号">
              <el-option v-for="(item,index) in account" :index="item[index]" :key="item.store" :label="item.store" :value="item.store"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input">
            <el-date-picker v-model="condition.dateRange" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="input" @click="onSubmit(condition)">查询</el-button>
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
    <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" height="820" style="width: 100% ">
      <el-table-column min-width="72px" prop="pingtai" label="平台" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="72px" prop="suffix" label="账号" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="87px" prop="salesman" label="销售员" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="94px" prop="salemoney" label="成交价$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="salemoneyzn" label="成交价￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="130px" prop="ebayFeeebay" label="eBay成交费$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="140px" prop="ebayfeeznebay" label="eBay成交费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="ppFee" label="PP成交费$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="ppFeezn" label="PP成交费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="costmoney" label="商品成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="expressFare" label="运费成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="inpackagemoney" label="包装成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="storename" label="发货仓库" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="refund" label="退款金额￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="refundrate" label="退款率%" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="diefeeZn" label="死库处理￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="insertionFee" label="店铺杂费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120px" prop="saleOpeFeeZn" label="运营杂费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="grossprofit" label="毛利￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100px" prop="grossprofitRate" label="毛利率%" :formatter="empty" sortable="custom"></el-table-column>
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
      isA: true,
      text: "显示输入框",
      show: false,
      show1: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      department: [],
      plat: [],
      member: [],
      store: [{ id: 1, store: "中国仓" }, { id: 2, store: "海外仓" }],
      dateType: [{ id: 0, type: "发货时间" }, { id: 1, type: "交易时间" }],
      dateRange: [],
      account: [],
      condition: {
        department: "",
        plat: "",
        member: "",
        store: [],
        dateType: "",
        dateRange: ["2018-07-04", "2018-07-13"],
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
      getSales(form).then(response => {
        this.listLoading = false;
        this.tableData = this.searchTable = response.data.data;
      });
    },
    empty(row, column, cellValue, index) {
      return cellValue ? cellValue : "--";
    },
    //搜索
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
    //格式化数据
    formatter(row, column) {
      return parseFloat(row.salemoneyzn);
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
    //合计
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
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    getSection().then(response => {
      this.department = response.data.data;
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
    getMember().then(response => {
      this.member = response.data.data;
    });
    getStore().then(response => {
      this.options = response.dataget;
    });
    getAccount().then(response => {
      this.account = response.data.data;
    });
  }
};
</script>

<style lang="scss">
.el-radio.is-bordered {
  padding: 6px 16px 0 6px;
  height: 30px;
}
</style>

