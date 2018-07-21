<template>
  <!-- <div>销售额走势</div>     -->
  <div>
    <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline">
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
        <el-select v-model="condition.plat" multiple placeholder="平台">
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
        <el-date-picker v-model="condition.dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="开始日期至结束日期" :picker-options="pickerOptions2">
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
     <div id="chartArea" style="width:100%; height:400px;"></div>
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

export default {
  data() {
    return {
      id: "test",
      options: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
    },
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
        department:"",
        plat: "",
        member: "",
        store: [],
        dateType: "",
        dateRange: ["2018-07-01", "2018-07-13"],
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
    onSubmit(form) {
      this.listLoading = true;
      form.department = ["运营一部","运营二部","运营三部"];
       getSalestrend(form).then(response => {
        this.listLoading = false;
        let ret = response.data.data;
        let lineName = [];
        let series = []
        ret.forEach(element => {
          if (lineName.indexOf(element.title) < 0) {
            lineName.push(element.title);
          }  
        });
        let date = [];
        lineName.forEach(name => {
          let sery = {};
          let amt = [];
          ret.map(element => {
            if (element.title == name){
              amt.push(Number(element.totalamt));
              date.push(element.ordertime);
            }
          })
          sery["data"] = amt;
          sery["name"] = name;
          series.push(sery);
        })
        this.options.xAxis.categories = date;
        this.options.series = series; 
      })
    },
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

<style lang="scss" scoped>
</style>
