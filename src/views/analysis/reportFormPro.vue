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
          <div class="floet01" style="margin-left:5px;">
            <span>开发员</span>
            <el-select
              v-model="condition.developer"
              multiple
              collapse-tags
              placeholder="请选择"
              clearable
              size="small"
              style="width:170px;margin-left:10px;"
            >
              
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.dateRange"
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
      <div class="w95">
        <el-card class="box-card" :style="obj1">
          <el-col :span="24" style="margin-top:1px;">
            <el-col :span="24">
              <el-card>
                <div ref="or1" :style="sty" v-loading="listLoading"></div>
              </el-card>
            </el-col>
          </el-col>
        </el-card>
      </div>
    </div>
    <div v-show="show.ts">
       <div class="w95">
        <div class="floet">
          <div class="floet01" style="margin-left:5px;">
            <span>规则名称</span>
            <el-select
              v-model="condition.developer"
              multiple
              collapse-tags
              placeholder="请选择"
              clearable
              size="small"
              style="width:170px;margin-left:10px;"
            >
              
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.dateRange"
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
      <div class="w95">
        
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import { getDeveloper } from "../../api/profit";
import { formProductReport } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      index: 1,
      activeName: "first",
      developer: [],
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      obj1: {
        height: window.innerHeight - 205 + "px"
      },
      show: {
        rl: true,
        ts:false
      },
      sty: {
        width: "100%",
        height: window.innerHeight - 208 + "px"
      },
      condition: {
        developer: [],
        dateRange: []
      },
      listLoading: false,
      allMenu: [],
      options1: {
        tooltip: {
         trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
        },
        legend: {
          top:'2%',
          data: ["爆款数", "旺款数","产品总数"]
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
            top:'1%',
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "爆款数",
            type: "bar",
            data: [],
            // itemStyle: {   
            //     normal:{  
            //         color: function (params){
            //             var colorList = ['#409EFF'];
            //             return colorList[params.dataIndex];
            //         }
            //     },
            // },
          },
          {
            name: "旺款数",
            type: "bar",
            data: [],
            // itemStyle: {   
            //     normal:{  
            //         color: function (params){
            //             var colorList = ['#E6A23C'];
            //             return colorList[params.dataIndex];
            //         }
            //     },
            // },
          },
          {
            name: "产品总数",
            type: "bar",
            data: [],
            // itemStyle: {   
            //     normal:{  
            //         color: function (params){
            //             var colorList = ['#F56C6C'];
            //             return colorList[params.dataIndex];
            //         }
            //     },
            // },
          }
        ]
      },
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
    handleClick(tab, event) {
      if (tab.name === "/v1/products-engine/product-report") {
        this.show["rl"] = true;
      } else {
        this.show["rl"] = false;
      }
      if (tab.name === "/v1/products-engine/rule-report") {
        this.show["ts"] = true;
      } else {
        this.show["ts"] = false;
      }
    },
    getData() {
      this.listLoading = true;
      formProductReport(this.condition).then(res => {
        var data = res.data.data;
        var name=[]
        var data1=[]
        var data2=[]
        var data3=[]
        for(var i=0;i<data.length;i++){
          name.push(data[i].developer)
          data1.push(data[i].hotNum)
          data2.push(data[i].popNum)
          data3.push(data[i].totalNum)
        }
        this.options1.xAxis[0].data = name;
        this.options1.series[0].data = data1;
        this.options1.series[1].data = data2;
        this.options1.series[2].data = data3;
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        this.listLoading = false;
      });
    }
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
  margin-left: 0.5%;
  padding: 10px 10px;
  margin-top: 10px;
  border-radius: 5px;
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

