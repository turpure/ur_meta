<template>
  <section>
    <el-table :data="this.tableData" height="890" v-loading="loading">
      <el-table-column label="订单编号" prop="tradeNid"></el-table-column>
      <el-table-column label="orderTime" prop="orderTime"></el-table-column>
      <el-table-column label="suffix" prop="suffix"></el-table-column>
      <el-table-column label="buyerId" prop="buyerId"></el-table-column>
      <el-table-column label="shipToName" prop="shipToName"></el-table-column>
      <el-table-column label="shipToStreet" prop="shipToStreet"></el-table-column>
      <el-table-column label="shipToStreet2" prop="shipToStreet2"></el-table-column>
      <el-table-column label="shipToCity" prop="shipToCity"></el-table-column>
      <el-table-column label="shipToZip" prop="shipToZip"></el-table-column>
      <el-table-column label="shipToCountryCode" prop="shipToCountryCode"></el-table-column>
      <el-table-column label="shipToPhoneNum" prop="shipToPhoneNum"></el-table-column>
    </el-table>
  </section>
</template>

<script>
import { Risk } from '../../api/api'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    Risk().then(response => {
      this.tableData = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>

</style>


