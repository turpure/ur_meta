<template>
  <el-form :model='condition' label-width="100px" class="demo-ruleForm login-container" ref="condition">
    <el-form-item label="卖家账号：" prop="suffix" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
      <el-select v-model="condition.suffix" filterable multiple collapse-tags>
        <el-button plain type="info" @click="selectall">全选</el-button>
        <el-button plain type="info" @click="noselect">取消</el-button>
        <el-option v-for="item in suffix" :key="item.ebayName" :value="item.ebaySuffix"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品编码：" prop="goodsCode" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
      <el-input v-model="condition.goodsCode" placeholder="--必填--"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="input" @click="onSubmit(condition)">下载模板</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { geteBaytemplate, getToolaccount } from "../../api/profit";
export default {
  data() {
    return {
      suffix: [],
      goodsCode: "",
      condition: {
        suffix: [],
        goodsCode: ""
      }
    };
  },
  methods: {
    selectall() {
      const allValues = [];
      for (const item of this.suffix) {
        allValues.push(item.ebaySuffix);
      }
      this.condition.suffix = allValues;
    },
    noselect() {
      this.condition.suffix = [];
    },
    onSubmit(form) {
      this.$refs.condition.validate(valid => {
        if (valid) {
          geteBaytemplate(form).then(response => {
            const blob = new Blob([response.data], {
              type: "application/vnd.ms-excel;charset=UTF-8"
            });
            const downloadElement = document.createElement("a");
            const objectUrl = window.URL.createObjectURL(blob);
            downloadElement.href = objectUrl;
            downloadElement.download = "eBay商品模板.xlsx";
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          });
        }
      });
    }
  },
  mounted() {
    getToolaccount({ type: "eBay" }).then(response => {
      this.suffix = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .el-input {
    width: 217px;
  }
}
</style>

