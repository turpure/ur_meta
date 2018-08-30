<template>
  <el-form label-width="200px">
    <el-form-item label="卖家账号：">
      <el-select v-model="condition.type" filterable clearable>
        <el-option v-for='(item,index) in type' :index='index' :key='item.ibaySuffix' :label='item.ibaySuffix' :value='item.ibaySuffix'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品编码：">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="保留价(msrp$)：">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="商品售价(Price$)：">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="运费(Shipping$)：">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">确认信息</el-button>
      <router-link to="/wishskuEdit">
        <el-button type="primary">属性设置
          <i class="el-icon-caret-right"></i>
        </el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import { getToolaccount } from "../../api/profit";
export default {
  data() {
    return {
      type: [],
      condition: {
        type: ""
      }
    };
  },
  mounted() {
    getToolaccount({ type: "Wish" }).then(response => {
      this.type = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-left: 30%;
  .el-input {
    width: 217px;
  }
}
</style>

