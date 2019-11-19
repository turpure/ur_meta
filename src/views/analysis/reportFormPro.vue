<template>
  <section class="tabheught" :style="obj">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="background: #fff;">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="show.rl">
      <div class="w95">
        <div class="floet">
          <div class="floet01">
            <span>开发员</span>
            <el-select
              v-model="condition.salerName"
              placeholder="请选择"
              clearable
              size="small"
              style="width:150px;margin-left:10px;"
            >
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.devDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              clearable
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:250px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getData()">查询</el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import { getDeveloper } from "../../api/profit";
export default {
  data() {
    return {
      index: 1,
      activeName: "first",
      developer:[],
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      show:{
        rl:true
      },
      condition: {
        salerName:null,
        devDate: []
      },
      allMenu: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(vm) {
              const date = getMonthDate("thisMonth");
              vm.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const date = getMonthDate("previousMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const date = getMonthDate("lastMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleClick() {},
    getData(){

    },
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/products-engine/index");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/products-engine/dashboard") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
    getDeveloper().then(response => {
      this.developer = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.tabheught {
  background: #eee;
}
.w95 {
  width: 97%;
  overflow: hidden;
  background: #fff;
  margin: auto;
  padding: 10px 15px;
  margin-top: 10px;
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
.saleP {
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: right;
  padding-right: 10px;
}
.floet {
  overflow: hidden;
}
.floet01 {
  float: left;
  margin-right: 20px;
}
</style>

