<template>
  <div>
    <el-form label-width="200px" v-show="show1">
      <el-form-item label="卖家账号：">
        <el-select v-model="formInline.type" filterable clearable>
          <el-option v-for='(item,index) in type' :index='index' :key='item.DictionaryName' :label='item.DictionaryName' :value='item.DictionaryName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品价格：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认信息</el-button><br>
        <el-button type="text">下载单属性
          <i class="el-icon-caret-bottom"></i>
        </el-button>
        <el-button type="text" @click="onSubmit()">多属性设置
          <i class="el-icon-caret-right"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <div v-show="show" class="modal-dialog" style="width:1300px;">
      <div class="modal-content">
        <div class="modal-header">
          <div align="right">
            <input type="button" name="button" id="button" value="x" @click="back">
          </div>
          <h4 class="modal-title" id="myModalLabel">多属性设置</h4>
          <br>
          <h5>
            <font color="red">找不到商品编码：</font>
          </h5>
          <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共：0条记录
        </div>
        <div class="modal-body">
          <form>
            <el-table :data="tableData" class="table table-hover" id="tb">
              <el-table-column prop="SKU" label="SKU"></el-table-column>
              <el-table-column prop="quantity" label="数量"></el-table-column>
              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column prop="pic_url" label="关联图片地址"></el-table-column>
              <el-table-column prop="property1" label="Color"></el-table-column>
              <el-table-column prop="property2" label="Size"></el-table-column>
              <el-table-column prop="varition1" label="款式1"></el-table-column>
              <el-table-column prop="varition2" label="款式2"></el-table-column>
            </el-table>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <input type="button" name="button1" value="返回上页" @click="back">
        <input type="button" @click="btnSavekkk" id="btnSavekkk" value="导出多属性表">
      </div>
    </div>
  </div>
</template>

<script>
import { getToolaccount, getsmtsku } from "../../api/profit";
export default {
  data() {
    return {
      show: false,
      show1: true,
      tableData: [],
      type: [],
      formInline: {
        type: ""
      },
      condition: {
        suffix: "aliexpress_SMT-19",
        goodsCode: "6A0895",
        price: "22"
      }
    };
  },
  methods: {
    onSubmit() {
      this.show = !this.show;
      this.show1 = !this.show1;
      getsmtsku(this.condition).then(response => {
        this.tableData = response.data.data;
      });
    },
    btnSavekkk() {},
    back() {
      this.show = false;
      this.show1 = true;
    }
  },
  mounted() {
    getToolaccount({ type: "SMT" }).then(response => {
      this.type = response.data.data;
    });
  }
};
</script>

<style scoped>
.el-form-item {
  margin-left: 30%;
}
.el-input {
  width: 217px;
}
.modal-dialog {
  margin: 30px auto;
  position: relative;
  z-index: 1050;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  background-clip: padding-box;
}
.modal-header {
  min-height: 16.428571429px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.h4 {
  font-size: 18px;
  font-weight: 500;
}
.h5 {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.1;
}
.modal-body {
  position: relative;
  padding: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  max-height: 500px;
  overflow: auto;
}
.table > thead:first-child > tr:first-child > th {
  border-top: 0;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
  padding: 8px;
}
th {
  text-align: left;
}
.modal-footer {
  padding: 19px 20px 20px;
  margin-top: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
input[type="button"] {
  cursor: pointer;
  -webkit-appearance: button;
}
input {
  line-height: inherit;
}
</style>