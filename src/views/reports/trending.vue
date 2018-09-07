<template>
  <!-- <div>销售额走势</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" class="demo-form-inline" label-width="68px" v-show="show">
          <el-form-item label="部门" class="input">
            <el-select v-model="condition.department" multiple collapse-tags placeholder="部门" @change="choosed">
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" class="input">
            <el-select v-model="condition.plat" multiple collapse-tags placeholder="平台" style="height: 40px;">
              <el-option v-for="(item,index) in plat" :index="index" :key="item.plat" :label="item.plat" :value="item.plat">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='销售员' class='input'>
            <el-select v-model='condition.member' filterable multiple collapse-tags placeholder='销售员'>
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for='(item,index) in member' :index='index' :key='item.username' :label='item.username' :value='item.username'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" class="input">
            <el-select v-model="condition.account" filterable multiple collapse-tags placeholder="账号">
              <el-button plain type="info" @click="selectall">全选</el-button>
              <el-button plain type="info" @click="noselect">取消</el-button>
              <el-option v-for="(item,index) in account" :index="index" :key="item.store" :label="item.store" :value="item.store"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示方式" class="input" prop="flag">
            <el-radio-group style="width:218px;" v-model="condition.flag">
              <el-radio style="padding-right:43px;" border v-for="(item,index) in flag" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
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
    <Myecharts :options="options" v-loading="listLoading" ref="myecharts"></Myecharts>
  </div>
</template>

<script>
import { getMyToken } from "../../api/api";
import {
  getSection,
  getPlatform,
  getMember,
  getAccount,
  getSalestrend
} from "../../api/profit";
import { compareUp, compareDown } from "../../api/tools";

export default {
  data() {
    return {
      allMember: [],
      isA: true,
      text: "显示输入框",
      id: "test",
      options: {
        title: {
          text: "销售额走势$"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      show: true,
      show1: false,
      searchTable: [],
      searchValue: "",
      listLoading: false,
      plat: [],
      member: [],
      account: [],
      department: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      flag: [{ id: 0, type: "按天" }, { id: 2, type: "按月" }],
      dateRange: [],
      condition: {
        department: [],
        plat: [],
        member: [],
        store: [],
        dateType: 0,
        flag: 0,
        dateRange: [],
        account: []
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
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.condition.department = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.condition.department = [];
      this.member = this.allMember;
    },
    selectall() {
      const allValues = [];
      for (const item of this.account) {
        allValues.push(item.store);
      }
      this.condition.account = allValues;
    },
    noselect() {
      this.condition.account = [];
    },
    choosed() {
      let res = [];
      this.member = [];
      this.condition.member = [];
      let val = this.condition.department;
      res = this.allMember;
      let per = [];
      if (val != "") {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele => ele.department == val[i] && ele.position == "销售"
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
      let myform = JSON.parse(JSON.stringify(form));
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true;
          if (this.condition.department != "" && this.condition.member == "") {
            let val = this.condition.department;
            let res = [];
            res = this.allMember;
            let per = [];
            for (let i = 0; i < val.length; i++) {
              per = res.filter(
                ele => ele.department == val[i] && ele.position == "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
            getSalestrend(myform).then(response => {
              this.listLoading = false;
              let ret = response.data.data;
              let lineName = [];
              let series = [];
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title);
                }
              });
              let date = [];
              lineName.forEach(name => {
                let sery = {
                  type: "line",
                  stack: "总量",
                  areaStyle: { normal: {} }
                };
                let amt = [];
                ret.map(element => {
                  if (element.title == name) {
                    amt.push(Number(element.totalamt));
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime);
                    }
                  }
                });
                sery["data"] = amt;
                sery["name"] = name;
                series.push(sery);
              });
              this.options.legend.data = lineName;
              this.options.xAxis[0].data = date;
              this.options.series = series;
              let _this = this;
              _this.$refs.myecharts.drawAreaStack(this.options);
            });
          } else if (this.condition.member != "") {
            this.listLoading = true;
            myform.member = this.condition.member;
            getSalestrend(myform).then(response => {
              this.listLoading = false;
              let ret = response.data.data;
              let lineName = [];
              let series = [];
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title);
                }
              });
              let date = [];
              lineName.forEach(name => {
                let sery = {
                  type: "line",
                  stack: "总量",
                  areaStyle: { normal: {} }
                };
                let amt = [];
                ret.map(element => {
                  if (element.title == name) {
                    amt.push(Number(element.totalamt));
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime);
                    }
                  }
                });
                sery["data"] = amt;
                sery["name"] = name;
                series.push(sery);
              });
              this.options.legend.data = lineName;
              this.options.xAxis[0].data = date;
              this.options.series = series;
              let _this = this;
              _this.$refs.myecharts.drawAreaStack(this.options);
            });
          } else {
            getSalestrend(myform).then(response => {
              this.listLoading = false;
              let ret = response.data.data;
              let lineName = [];
              let series = [];
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title);
                }
              });
              let date = [];
              lineName.forEach(name => {
                let sery = {
                  type: "line",
                  stack: "总量",
                  areaStyle: { normal: {} }
                };
                let amt = [];
                ret.map(element => {
                  if (element.title == name) {
                    amt.push(Number(element.totalamt));
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime);
                    }
                  }
                });
                sery["data"] = amt;
                sery["name"] = name;
                series.push(sery);
              });
              this.options.legend.data = lineName;
              this.options.xAxis[0].data = date;
              this.options.series = series;
              let _this = this;
              _this.$refs.myecharts.drawAreaStack(this.options);
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    getMember().then(response => {
      let res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position == "销售");
    });
    getAccount().then(response => {
      this.account = response.data.data;
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
.el-form-item {
  margin-bottom: 0px;
}
.el-select-dropdown {
  .el-button--info.is-plain {
    width: 50%;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    margin-left: 0;
    float: left;
    border-radius: 0 !important;
    color: #333;
    background-color: #fff;
  }
  .el-button:hover {
    color: #333;
    background-color: #ebebeb;
    border-color: #adadad;
  }
}
</style>
