<template>
  <el-form label-width="200px">
    <el-form-item label="卖家账号：">
      <el-select v-model="condition.type" filterable clearable>
        <el-option v-for='(item,index) in type' :index='index' :key='item.ebaySuffix' :label='item.ebaySuffix' :value='item.ebaySuffix'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="站 点：">
      <el-select v-model="formInline.site" filterable clearable>
        <el-option v-for='item in site' :key='item' :value='item'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产品类别：">
      <el-input placeholder="Category1"></el-input>
      <el-input placeholder="Category2"></el-input>
    </el-form-item>
    <el-form-item label="商品编码：">
      <el-input style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="售 价：">
      <el-input style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="运 费：">
      <el-input placeholder="首件运费"></el-input>
      <el-input placeholder="续件运费"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">确认信息</el-button>
      <el-button type="primary">属性设置
        <i class="el-icon-caret-right"></i>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getToolaccount, getToolsite } from "../../api/profit";
export default {
  data() {
    return {
      site: [],
      type: [],
      formInline: {
        site: ""
      },
      condition: {
        type: ""
      }
    };
  },
  methods: {},
  mounted() {
    getToolaccount({ type: "eBay" }).then(response => {
      this.type = response.data.data;
    });
    getToolsite().then(response => {
      let s = response.data.data;
      this.site = s.map(m => {
        return m.Name;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-left: 30%;
  .el-input {
    width: 106px;
  }
}
</style>

