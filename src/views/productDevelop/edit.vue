<template>
  <section>
    <el-form :model="editForm"
             :inline="true"
             ref="editForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="图片"
                        prop="picUrl">
            <img :src='editForm.picUrl'
                 style="width: 150px;height: 100px;">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品图片链接"
                        prop="picUrl">
            <el-input v-model="editForm.picUrl"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否备货"
                        prop="editForm.stockUp">
            <el-select v-model="editForm.stockUp">
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品编码"
                        prop="GoodsCode">
            <el-input v-model="editForm.GoodsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品名称"
                        prop="GoodsName">
            <el-input v-model="editForm.GoodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中文申报名"
                        prop="AliasCnName">
            <el-input v-model="editForm.AliasCnName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="英文申报名"
                        prop="AliasEnName">
            <el-input v-model="editForm.AliasEnName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购"
                        prop="Purchaser">
            <el-input v-model="editForm.Purchaser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业绩归属人1"
                        prop="mapPersons">
            <el-input v-model="editForm.mapPersons"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="责任归属人1"
                        prop="possessMan1">
            <el-input v-model="editForm.possessMan1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商名称"
                        prop="SupplierName">
            <el-input v-model="editForm.SupplierName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格"
                        prop="PackName">
            <el-select v-model="editForm.PackName">
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="特殊属性必填"
                        prop="">
            <el-select>
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="仓库"
                        prop="StoreName">
            <el-select v-model="editForm.StoreName">
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="季节"
                        prop="Season">
            <el-select v-model="editForm.Season">
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述"
                        prop="description">
            <el-input type="textarea"
                      v-model="editForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  </section>
</template>
<script>
import { APIAttributeInfo } from '../../api/product'
export default {
  data() {
    return {
      tableData: [],
      condition: {
        id: 5
      },
      editForm: {}
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

