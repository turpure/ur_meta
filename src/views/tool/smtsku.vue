<template>
  <div>
    <el-form v-model="condition" label-width="100px" class="demo-ruleForm login-container" v-show="show1">
      <el-form-item label="卖家账号：">
        <el-select v-model="condition.suffix" filterable clearable>
          <el-option v-for='(item,index) in suffix' :index='index' :key='item.DictionaryName' :label='item.DictionaryName' :value='item.DictionaryName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码：">
        <el-input v-model="condition.goodsCode"></el-input>
      </el-form-item>
      <el-form-item label="商品价格：">
        <el-input v-model="condition.price"></el-input>
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
          <h5 v-if="this.tableData.length<1?true:false">
            <font color="red">找不到商品编码：</font>
          </h5>
          <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共：{{this.tableData.length}}条记录
        </div>
        <div class="modal-body">
          <el-form :model="condition1" ref="condition1">
            <el-table :data="tableData" class="table table-hover" id="tb">
              <el-table-column prop="SKU" label="SKU">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.SKU"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.quantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pic_url" label="关联图片地址" width="300px">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.pic_url"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property1" label="Color">
                <template slot-scope="scope">
                  <el-select size=mini v-model="scope.row.property1" clearable>
                    <el-option v-for="item in color" :key="item" :value="item"></el-option>
                  </el-select>
                  <el-input size=mini placeholder="自定义"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property2" label="Size">
                <template slot-scope="scope">
                  <el-select size=mini v-model="scope.row.property2" clearable>
                    <el-option v-for="item in color" :key="item" :value="item"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="varition1" label="款式1">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.varition1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="varition2" label="款式2">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.varition2"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
      <div class="modal-footer">
        <input type="button" name="button1" value="返回上页" @click="back">
        <input type="button" @click="btnSavekkk(condition1)" id="btnSavekkk" value="导出多属性表">
      </div>
    </div>
  </div>
</template>

<script>
import {
  getToolaccount,
  getsmtsku,
  getsmtskutemplate,
  getToolcolor,
  getToolsize
} from "../../api/profit";
export default {
  data() {
    return {
      size: [],
      color: [],
      show: false,
      show1: true,
      tableData: [],
      suffix: [],
      condition: {
        suffix: "",
        goodsCode: "",
        price: ""
      },
      condition1: {
        contents: {
          SKU: [],
          quantity: [],
          price: [],
          pic_url: [],
          property1: [],
          property2: [],
          varition1: [],
          varition2: [],
          name1: []
        }
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
    btnSavekkk() {
      this.condition1.contents.SKU = this.tableData.map(e => e.SKU);
      this.condition1.contents.varition1 = this.tableData.map(e => e.varition1);
      this.condition1.contents.varition2 = this.tableData.map(e => e.varition2);
      this.condition1.contents.pic_url = this.tableData.map(e => e.pic_url);
      this.condition1.contents.property2 = this.tableData.map(e => e.property2);
      this.condition1.contents.property1 = this.tableData.map(e => e.property1);
      this.condition1.contents.quantity = this.tableData.map(e => e.quantity);
      this.condition1.contents.price = this.tableData.map(e => e.price);
      getsmtskutemplate(this.condition1).then(response => {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel;charset=UTF-8"
        });
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        let filename =
          "SMT商品SKU模板" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename + ".xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    },
    back() {
      this.show = false;
      this.show1 = true;
    }
  },
  mounted() {
    getToolaccount({ type: "SMT" }).then(response => {
      this.suffix = response.data.data;
    });
    getToolcolor().then(response => {
      this.color = response.data.data;
    });
    getToolsize().then(response => {
      this.size = response.data.data;
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
  .table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    max-height: 500px;
    overflow: auto;
  }
}
.modal-footer {
  padding: 19px 20px 20px;
  margin-top: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
  input[type="button"] {
    cursor: pointer;
  }
}
</style>