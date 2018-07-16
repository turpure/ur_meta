<template>
  <!-- <div>销售额走势</div>     -->
  <div>
    <el-form :model="conditionForm" :inline="true" ref="conditionForm" label-width="100px" class="demo-form-inline">
      <el-form-item label="时间类型" class="input">
        <el-select v-model="formInline.region" placeholder="按天">
          <el-option label="按天" value="shanghai"></el-option>
          <el-option label="按月" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门" class="input">
        <el-select v-model="value5" multiple placeholder="部门">
          <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="平台" class="input">
        <el-select v-model="value5" multiple placeholder="平台">
          <el-option v-for="(item,index) in plat" :index="index" :key="item.plat" :label="item.plat" :value="item.plat">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员" class="input">
        <el-select v-model="value5" multiple placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发货时间" class="input">
        <el-select v-model="formInline.region" placeholder="发货时间">
          <el-option label="发货时间" value="shanghai"></el-option>
          <el-option label="交易时间" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" class="input">
        <el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="开始日期至结束日期" :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账号" class="input">
        <el-select v-model="accounty.region" placeholder="账号">
          <el-option v-for="(item,index) in account" :index="item[index]" :key="item.id" :label="item.store" :value="item.id"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
      <el-table-column prop="pingtai" label="平台" sortable></el-table-column>
      <el-table-column prop="suffix" label="账号" sortable></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable="custom"></el-table-column>
      <el-table-column prop="salemoney" label="成交价$" sortable="custom"></el-table-column>
      <el-table-column prop="salemoneyzn" label="成交价￥" sortable="custom"></el-table-column>
      <el-table-column prop="ebayFeeebay" label="eBay成交费$" sortable="custom"></el-table-column>
      <el-table-column prop="ebayfeeznebay" label="eBay成交费￥" sortable="custom"></el-table-column>
      <el-table-column prop="ppFee" label="PP成交费$" sortable="custom"></el-table-column>
      <el-table-column prop="ppFeezn" label="PP成交费￥" sortable="custom"></el-table-column>
      <el-table-column prop="costmoney" label="商品成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="expressFare" label="运费成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="inpackagemoney" label="包装成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="storename" label="发货仓库" sortable="custom"></el-table-column>
      <el-table-column prop="refund" label="退款金额￥" sortable="custom"></el-table-column>
      <el-table-column prop="refundrate" label="退款率%" sortable="custom"></el-table-column>
      <el-table-column prop="diefeeZn" label="死库处理￥" sortable="custom"></el-table-column>
      <el-table-column prop="insertionFee" label="店铺杂费￥" sortable="custom"></el-table-column>
      <el-table-column prop="saleOpeFeeZn" label="运营杂费￥" sortable="custom"></el-table-column>
      <el-table-column prop="grossprofit" label="毛利￥" sortable="custom"></el-table-column>
      <el-table-column prop="grossprofitRate" label="毛利率%" sortable="custom"></el-table-column>
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

export default {
  data() {
    return {
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
      formInline: {
        user: "",
        region: ""
      },
      conditionForm: {
        department: "",
        plat: "",
        member: "",
        store: [],
        dateType: 0,
        dateRange: ["2018-07-04", "2018-07-13"],
        account: []
      },
      accounty: {
        user: "",
        region: ""
      },
      // options: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   },
      //   {
      //     value: "选项3",
      //     label: "蚵仔煎"
      //   },
      //   {
      //     value: "选项4",
      //     label: "龙须面"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北京烤鸭"
      //   }
      // ],
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
      date: ""
    };
  },
  methods: {
    onSubmit(form) {
      this.listLoading = true;
      getSalestrend(form).then(response => {
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
