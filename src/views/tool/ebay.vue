<template>
  <el-form :model='condition' label-width="200px" ref="condition">
    <!-- <el-form-item label="卖家账号：" :rules="[{required: true, message: '请选择账号', trigger: 'blur'}]">
      <el-select v-model="condition.suffix" multiple filterable collapse-tags placeholder="--必填--">
        <el-button plain type="info" @click="selectall">全选</el-button>
        <el-button plain type="info" @click="noselect">取消</el-button>
        <el-option v-for='(item,index) in suffix' :index='index' :key='item.ebaySuffix' :label='item.ebaySuffix' :value='item.ebaySuffix'></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="卖家账号：">
      <el-select v-model="condition.suffix" multiple>
        <el-option value="showtime688"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品编码：" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
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
      //suffix: [],
      //goodsCode: "",
      condition: {
        suffix: ["showtime688"],
        goodsCode: "6C0046"
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
      geteBaytemplate(form).then(response => {
        console.log(form, response);
        // const blob = new Blob([response], {
        //   type:
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        // });
        // const filename = "excel.xlsx";
        // if (typeof window.navigator.msSaveBlob !== "undefined") {
        //   window.navigator.msSaveBlob(blob, filename);
        // } else {
        //   var blobURL = window.URL.createObjectURL(blob);
        //   var tempLink = document.createElement("a");
        //   tempLink.style.display = "none";
        //   tempLink.href = blobURL;
        //   tempLink.setAttribute("download", filename);
        //   if (typeof tempLink.download === "undefined") {
        //     tempLink.setAttribute("target", "_blank");
        //   }
        //   document.body.appendChild(tempLink);
        //   tempLink.click();
        //   document.body.removeChild(tempLink);
        //   window.URL.revokeObjectURL(blobURL);
        // }
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
.el-form-item {
  margin-left: 30%;
  .el-input {
    width: 217px;
  }
}
</style>

