<template>
  <div>
    <el-form :model='condition' :inline='true' ref='condition' label-width='120px' class='demo-form-inline'>
      <el-form-item label="交易开始时间" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]" prop="beginDate">
        <el-date-picker v-model='condition.beginDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'></el-date-picker>
      </el-form-item>
      <el-form-item label="交易结束时间" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]" prop="endDate">
        <el-date-picker v-model='condition.endDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'></el-date-picker>
      </el-form-item>
      <el-form-item label="新品创建时间">
        <el-date-picker v-model='condition.createBeginDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'></el-date-picker>
      </el-form-item>
      <el-form-item label="新品结束时间">
        <el-date-picker v-model='condition.createEndDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="tab" v-show="show" v-loading="listLoading">
      <el-row>
        <el-col :span="12">
          <Myecharts :options="options" ref="myecharts"></Myecharts>
        </el-col>
        <el-col :span="12">
          <Myecharts :options="options" ref="myecharts"></Myecharts>
        </el-col>
      </el-row>
      <el-col :span="24" style="background-color:#e02222;color:white;font-size:18px;line-height:30px;">
        &nbsp;
        <i class="fa fa-cogs"></i>----所有状态</el-col>
      <el-table :header-row-style="rowheader" height="630" :data="tableData1" style="width: 100%;">
        <el-table-column min-width="100px" prop="salername" label="业绩归属人1" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="goodsNum" label="商品总数" :formatter="empty"></el-table-column>
        <el-table-column min-width="90px" prop="SoldNum" label="出单商品数" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SoldRate" label="出单率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SkuSoldNum" label="销量数量" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="saleMoneyRmb" label="销售额(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="90px" prop="profitRmb" label="利润(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="ProfitRate" label="利润率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="130px" prop="wishSoldNum" label="Wish出单商品数" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="wishRate" label="Wish出单率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="130px" prop="eabySoldNum" label="eBay出单商品数" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="eBayRate" label="eBay出单率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="120px" prop="SMTSoldNum" label="SMT出单商品数" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="SMTRate" label="SMT出单率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="150px" prop="amaSoldNum" label="Amazon出单商品数" :formatter="empty"></el-table-column>
        <el-table-column min-width="130px" prop="amaRate" label="Amazon出单率%" :formatter="empty"></el-table-column>
      </el-table>
      <el-col :span="24" style="background-color:#e02222;color:white;font-size:18px;line-height:30px;">
        &nbsp;
        <i class="fa fa-cogs"></i>----爆款</el-col>
      <el-table :header-row-style="rowheader" height="630" :data="tableData2" style="width: 100%;">
        <el-table-column min-width="100px" prop="salername" label="业绩归属人1" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="goodsNum" label="商品总数" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SoldNum" label="爆款总数" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SoldRate" label="爆款率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SkuSoldNum" label="销量数量" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="saleMoneyRmb" label="销售额(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="90px" prop="profitRmb" label="利润(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="ProfitRate" label="利润率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="wishSoldNum" label="Wish爆款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="wishRate" label="Wish爆款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="eabySoldNum" label="eBay爆款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="eBayRate" label="eBay爆款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="SMTSoldNum" label="SMT爆款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="SMTRate" label="SMT爆款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="120px" prop="amaSoldNum" label="Amazon爆款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="160px" prop="amaRate" label="Amazon爆款贡献率%" :formatter="empty"></el-table-column>
      </el-table>
      <el-col :span="24" style="background-color:#4b8df8;color:white;font-size:18px;line-height:30px;">
        &nbsp;
        <i class="fa fa-cogs"></i>----旺款</el-col>
      <el-table :header-row-style="rowheader" height="630" :data="tableData3" style="width: 100%;">
        <el-table-column min-width="100px" prop="salername" label="业绩归属人1" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="goodsNum" label="商品总数" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SoldNum" label="旺款总数" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SoldRate" label="旺款率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="SkuSoldNum" label="销售数量" :formatter="empty"></el-table-column>
        <el-table-column min-width="110px" prop="saleMoneyRmb" label="销售额(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="90px" prop="profitRmb" label="利润(RMB)" :formatter="empty"></el-table-column>
        <el-table-column min-width="80px" prop="ProfitRate" label="利润率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="wishSoldNum" label="Wish旺款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="wishRate" label="Wish旺款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="eabySoldNum" label="eBay旺款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="eBayRate" label="eBay旺款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="100px" prop="SMTSoldNum" label="SMT旺款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="140px" prop="SMTRate" label="SMT旺款贡献率%" :formatter="empty"></el-table-column>
        <el-table-column min-width="120px" prop="amaSoldNum" label="Amazon旺款数" :formatter="empty"></el-table-column>
        <el-table-column min-width="160px" prop="amaRate" label="Amazon旺款贡献率%" :formatter="empty"></el-table-column>
      </el-table>
      <el-col :span="24" style="background-color:#000;color:#999999;padding: 8px 20px 5px 20px;">
        <font color="red" size="5">
          <big>注意：以上所有数据都不包含缺货订单！！！</big>
        </font>
        <br>
        <big>所有商品:</big>
        各开发名下的所有商品<br>
        <big>新 品:</big>
        所选创建时间内开发的商品
      </el-col>
    </div>
  </div>
</template>

<script>
import { getPerform } from "../../api/profit";
export default {
  data() {
    return {
      show: false,
      listLoading: false,
      options: {
        title: {
          text: "销售额(RMB)"
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
              formatter: "{value}"
            }
          }
        ],
        series: [Object]
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      condition: {
        beginDate: "",
        endDate: "",
        createBeginDate: "",
        createEndDate: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.show = true;
          this.listLoading = true;
          getPerform(this.condition).then(response => {
            this.listLoading = false;
            debugger;
            let tableData = response.data.data;
            this.tableData1 = tableData.AllReport;
            this.tableData2 = tableData.HotReport;
            this.tableData3 = tableData.PopReport;
            const ret = this.tableData1;
            const lineName = [];
            const series = [];
            ret.forEach(element => {
              if (lineName.indexOf(element.title) < 0) {
                lineName.push("销售额");
              }
            });
            const date = [];
            lineName.forEach(name => {
              const sery = {
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} }
              };
              const amt = [];
              ret.map(element => {
                if (element.title === name) {
                  amt.push(Number(element.saleMoneyRmb));
                  if (date.indexOf(element.salername) < 0) {
                    date.push(element.salername);
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
            const _this = this;
            _this.$refs.myecharts.drawAreaStack(this.options);
          });
        } else {
          return false;
        }
      });
    },
    rowheader({ row, rowIndex }) {
      return "color:black";
    },
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 10px;
}
.el-col-24 {
  margin-top: 20px;
  margin-bottom: 10px;
}
.tab {
  max-height: 830px;
  overflow: auto;
}
</style>
