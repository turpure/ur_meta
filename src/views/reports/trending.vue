<template>
  <!-- <div>销售额走势</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" class="demo-form-inline" label-width="68px" v-show="show">
          <el-form-item label="时间类型" class="input">
            <el-select v-model="formInline.region" placeholder="按天">
              <el-option label="按天" value="shanghai"></el-option>
              <el-option label="按月" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" class="input">
            <el-select v-model="condition.department" multiple collapse-tags placeholder="部门" @change="choosed">
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
          <el-form-item label="销售员" class="input">
            <el-select v-model="condition.member" multiple collapse-tags placeholder="销售员">
              <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username">
              </el-option>
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
    <Myecharts :options="options" v-loading="listLoading" ref="myecharts"></Myecharts>
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
            //mark: { show: true },
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
      dateType: [{ id: 0, type: "发货时间" }, { id: 1, type: "交易时间" }],
      dateRange: [],
      formInline: {
        user: "",
        region: ""
      },
      condition: {
        department: "",
        plat: "",
        member: "",
        store: [],
        dateType: 0,
        dateRange: "",
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
    choosed() {
      let res = [];
      let val = this.condition.department;
      res = this.allMember;
      if (val != "") {
        for (let i = 0; i < val.length; i++) {
          this.member = res.filter(
            ele => ele.department == val[i] && ele.position == "销售"
          );
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
      this.$refs.condition.validate(valid => {
        if (valid) {
          if (this.condition.department != "" && this.condition.member == "") {
            this.listLoading = true;
            let val = this.condition.department;
            let res = [];
            res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              this.member = res.filter(
                ele => ele.department == val[i] && ele.position == "销售"
              );
              form.member = this.member.map(m => {
                return m.username;
              });
              console.log(form.member);
              //form.member = this.member.username;
            }
            getSales(form).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          } else if (this.condition.member != "") {
            this.listLoading = true;
            form.member = this.condition.member;
            getSales(form).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      let res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position == "销售");
    });
    getAccount(access_token).then(response => {
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
