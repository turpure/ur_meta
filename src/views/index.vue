<template>
<div class="dashboard-editor-container">
<section>
   <el-alert
    title="旺季销售目标完成进度"
    show-icon
    type="info">
  </el-alert>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">New Visits</div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Messages</div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Purchases</div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
  <div class="tabs-container">
 <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:2%">
    <el-tab-pane label="上海销售" name="shanghai"></el-tab-pane>
    <el-tab-pane label="郑州销售" name="zhengzhou"></el-tab-pane>
    <el-tab-pane label="所有部门" name="depart"></el-tab-pane>
    <el-tab-pane label="所有开发" name="developer"></el-tab-pane>
  </el-tabs>
  </div>
  <div class='table-container'>
  <el-table
    :data="shanghaiTable"
    size="small"
    height="500"
    v-if="show.shanghai"
    v-scrollBar:slim
    @sort-change="sortNumber"
    >
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="depart"  label="部门" sortable></el-table-column>
    <el-table-column prop="username"  label="姓名" sortable></el-table-column>
    <el-table-column prop="role"  label="角色" width='50'></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)" min-width="100" sortable="custom"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)" min-width="100" sortable="custom"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)" min-width="90" sortable="custom"></el-table-column>
    <el-table-column prop="primaryRate"  label="初级目标完成度" min-width="120" sortable="custom" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate"  label="高级目标完成度" min-width="120" sortable="custom">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" min-width="120" label="统计截止日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{dateFormatter(scope.row.updatetime)}}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="zhengzhouTable"
    @sort-change="sortNumber"
    size="small"
    height="500"
    v-show="show.zhengzhou"
    >
    <el-table-column type="index" ></el-table-column>
    <el-table-column prop="depart" label="部门" ></el-table-column>
    <el-table-column prop="username"  label="姓名" sortable></el-table-column>
    <el-table-column prop="role"  label="角色"></el-table-column>
    <el-table-column prop="high"  label="毛利润(￥)" sortable="custom"></el-table-column>
    <el-table-column prop="highRate"  label="目标完成度" sortable="custom" >
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate"  label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" min-width="120" label="统计截止日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ dateFormatter(scope.row.updatetime) }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="departTable"
    size="small"
    height="500"
    v-show="show.depart"
    @sort-change="sortNumber"
    style="width:100%">
    <el-table-column type="index" width="60"></el-table-column>
    <el-table-column prop="depart" label="部门" sortable></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)" sortable="custom"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)" sortable="custom">
    </el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)" sortable="custom"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度" sortable="custom">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度" sortable="custom">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" min-width="120" label="统计截止日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ dateFormatter(scope.row.updatetime) }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="developerTable"
    size="small"
    height="500"
    v-show="show.developer"
    style="width:100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="depart"  label="部门" sortable></el-table-column>
    <el-table-column prop="username"  label="姓名" sortable></el-table-column>
    <el-table-column prop="role"  label="角色" width='50'></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)" min-width="100" sortable="custom"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)" min-width="100" sortable="custom"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)" min-width="90" sortable="custom"></el-table-column>
    <el-table-column prop="primaryRate"  label="初级目标完成度" min-width="120" sortable="custom" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate"  label="高级目标完成度" min-width="120" sortable="custom">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" min-width="140" label="统计截止日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{dateFormatter(scope.row.updatetime)}}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
  </section>
  </div>
</template>


<script>
import { ShangHaiTarget, ZhengZhouTarget, DepartTarget, DeveloperTarget } from '../api/api'
import { compareUp, compareDown } from '../api/tools'

export default {
  data() {
    return {
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      activeName: 'shanghai',
      show: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      for (const ele in this.show) {
        if (ele === tab.name) {
          this.show[ele] = true
        } else {
          this.show[ele] = false
        }
      }
    },
    dateFormatter(date) {
      const previous = new Date(date)
      previous.setDate(previous.getDate() - 1)
      return previous.toJSON().substring(0, 10)
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const tableName = this.activeName + 'Table'
      const data = this[tableName]
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    },
    checkStatus(row, prop) {
      if (row[prop] < row.dateRate) {
        return 'exception'
      }
      return 'success'
    }
  },
  mounted() {
    ShangHaiTarget().then((res) => {
      this.shanghaiTable = res.data.data
    })
    ZhengZhouTarget().then((res) => {
      this.zhengzhouTable = res.data.data
    })
    DepartTarget().then((res) => {
      this.departTable = res.data.data
    })
    DeveloperTarget().then((res) => {
      this.developerTable = res.data.data
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 80px;
  background-color: rgb(240, 242, 245);
  width:'100%';
  .chart-wrapper {
    background: #FFFFFF;  
    padding: 16px 16px 0;
  }
}

.table-container {
  background-color: #FFFFFF;
  margin:300px;
  margin-bottom: 80px;
  margin-top: 80px;
  .table-show {
    padding:30px;
  }
  .table-footer {
    height:30px 
  }
}
.tabs-container {
  background-color:#FFFFFF;
  // margin-left:300px;
  // margin-right:300px;
}
.el-table--fit {
  padding: 30px
}
.el-table__body{
    table-layout:auto !important;
}
</style>