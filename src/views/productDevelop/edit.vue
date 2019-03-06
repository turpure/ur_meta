<template>
  <el-table :data="tableData">
    <el-table-column type="selection"
                     align="center"
                     header-align="center"></el-table-column>
    <el-table-column type="index"
                     align="center"
                     header-align="center">
    </el-table-column>
    <el-table-column label="操作"
                     header-align="center"
                     align="center">
      <template slot-scope="scope">
        <el-tooltip content="删除">
          <el-button type="text"
                     @click="del(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="SKU"
                     prop="sku"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.sku"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="款式1"
                     prop="property1"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.property1"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="款式2"
                     prop="property2"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.property2"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="款式3"
                     prop="property3"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.property3"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="成本价"
                     prop="CostPrice"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.CostPrice"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="重量"
                     prop="Weight"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.Weight"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="零售价"
                     prop="RetailPrice"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.RetailPrice"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="joom零售价"
                     prop="joomPrice"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.joomPrice"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="joom运费"
                     prop="joomShipping"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.joomShipping"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="备货数量"
                     prop="stockNum"
                     header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.stockNum"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { APIAttributeInfo } from '../../api/product'
export default {
  data() {
    return {
      tableData: [],
      condition: {
        id: 5
      }
    }
  },
  methods: {
    del(index, row) {},
    getData() {
      APIAttributeInfo(this.condition).then(res => {
        this.tableData = res.data.data.skuInFo
      })
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    // this.condition.id = this.$route.params.id
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
</style>

