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
    <highcharts :options="options" style="height:600px"></highcharts>
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
import Highcharts from "Highcharts"

export default {
  data() {
    return {
      id: "test",
      options: {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Average fruit consumption during one week'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Fruit units'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12]
    }, {
        name: 'Jane',
        data: [1, 3, 4, 3, 3, 5, 4]
    }]
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
        department: "",
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
      // getSalestrend(form).then(response => {
      //   this.listLoading = false;
      //   let ret = response.data.data;
      //   let posseman1Data = ret.map(ele => {
      //     return ele.ordertime;
      //   });
      //   let posseman2Data = ret.map(ele => {
      //     return ele.totalamt;
      //   });
      //   this.options.xAxis.categories = posseman1Data;
      //   this.options.series[0].data = posseman2Data.map(Number);
      // });
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
