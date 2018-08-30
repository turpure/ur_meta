<template>
  <el-form label-width="200px">
    <el-form-item label="卖家账号：">
      <el-select v-model="formInline.type" filterable clearable>
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
      <router-link to="/inlineEditTable">
        <el-button type="primary" @click="onSubmit(condition)">
          属性设置
          <i class="el-icon-caret-right"></i>
        </el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import { getToolaccount, getToolsite, geteBaysku } from "../../api/profit";
export default {
  data() {
    return {
      site: [],
      type: [],
      formInline: {
        site: "",
        type: ""
      },
      condition: {
        suffix: "showtime688",
        goodsCode: "6C0046",
        Site: "美国",
        Cat1: "女人世界",
        Cat2: "内衣",
        price: "22",
        shipping1: "5",
        shipping2: "5"
      }
    };
  },
  methods: {
    onSubmit() {
      geteBaysku(this.condition).then(response => {
        this.$store.commit("newTableData", response.data.data);
      });
    }
  },
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

