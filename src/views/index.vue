<template>
<section>
   <el-alert
    title="旺季销售目标完成进度"
    show-icon
    type="info">
  </el-alert>
 <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:2%">
    <el-tab-pane label="上海销售" name="shanghai"></el-tab-pane>
    <el-tab-pane label="郑州销售" name="zhengzhou"></el-tab-pane>
    <el-tab-pane label="所有部门" name="depart"></el-tab-pane>
    <el-tab-pane label="所有开发" name="developer"></el-tab-pane>
  </el-tabs>
  <el-table
    :data="shanghaiTable"
    size="medium"
    height="700"
    v-show="show.shanghai"
    style="width:100%">
    <el-table-column type="index" width="60"></el-table-column>
    <el-table-column prop="depart" label="部门"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" label="当前日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.updatetime.substring(0,10) }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="zhengzhouTable"
    size="medium"
    height="700"
    v-show="show.zhengzhou"
    style="width:100%">
    <el-table-column type="index" width="60"></el-table-column>
    <el-table-column prop="depart" label="部门"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" label="当前日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.updatetime.substring(0,10) }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="departTable"
    size="medium"
    height="700"
    v-show="show.depart"
    style="width:100%">
    <el-table-column type="index" width="60"></el-table-column>
    <el-table-column prop="depart" label="部门"></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)"></el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度">
    </el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" label="当前日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.updatetime.substring(0,10) }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="developerTable"
    size="medium"
    height="700"
    v-show="show.developer"
    style="width:100%">
    <el-table-column type="index" width="60"></el-table-column>
    <el-table-column prop="depart" label="部门"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="primary" label="初级目标(￥)"></el-table-column>
    <el-table-column prop="high" label="高级目标(￥)"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度" >
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度">
     <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
      </template> 
    </el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" label="当前日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.updatetime.substring(0,10) }}</span>
      </template>
    </el-table-column>
  </el-table>
  </section>
</template>


<script>
import { ShangHaiTarget, ZhengZhouTarget, DepartTarget, DeveloperTarget } from '../api/api'
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

<style lang="scss" scoped >
</style>