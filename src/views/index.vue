<template>
  <el-table
    :data=tableData
    style="width:100%">
    <el-table-column prop="depart" label="部门"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="primary" label="初级目标($)"></el-table-column>
    <el-table-column prop="high" label="高级目标($)"></el-table-column>
    <el-table-column prop="amt" label="毛利润(￥)"></el-table-column>
    <el-table-column prop="primaryRate" label="初级目标完成度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="scope.row.primaryRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="highRate" label="高级目标完成度"></el-table-column>
    <el-table-column prop="dateRate" label="时间进度">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="scope.row.dateRate*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="updatetime" label="当前日期"></el-table-column>
  </el-table>
</template>


<script>
import { ShangHaiTarget } from '../api/api'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    ShangHaiTarget().then((res) => {
      this.tableData = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped >
</style>