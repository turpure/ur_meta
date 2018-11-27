<template>
  <section>
    <el-form :inline="true" class="toolbar" label-width="100px">
      <el-form-item label="日期">
        <el-date-picker v-model="date" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="this.tableData" height="830" v-loading="loading">
      <el-table-column label="editor" prop="editor"></el-table-column>
      <el-table-column label="shipToName" prop="shipToName"></el-table-column>
      <el-table-column label="shipToZip" prop="shipToZip"></el-table-column>
      <el-table-column label="tableName" prop="tableName"></el-table-column>
      <el-table-column label="tradeNid" prop="tradeNid"></el-table-column>
    </el-table>
  </section>   
</template>

<script>
import { getEdition } from '../../api/profit'
export default {
  data() {
    return {
      loading: false,
      date: [],
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      // if (this.date !== null) {
      //   this.condition.beginDate = this.date[0]
      //   this.condition.endDate = this.date[1]
      // } else if (this.date === null) {
      //   this.condition.beginDate = ''
      //   this.condition.endDate = ''
      // }
      this.loading = true
      getEdition().then(response => {
        this.loading = false
        this.tableData = response.data.data
      })
    }
  },
  mounted() {
    this.loading = true
    getEdition().then(response => {
      this.loading = false
      this.tableData = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 10px
}
</style>
