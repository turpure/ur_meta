<template>
  <div>
    <el-form label-width="100px" class="demo-ruleForm login-container" v-show="show1">
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
        <el-button type="primary" @click="onSubmit(condition)">
          属性设置
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
          <el-form :model='condition1'>
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
              <el-table-column prop="property2" label="价格">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.property2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="BmpFileName" label="图片路径" width="300">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.BmpFileName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pro1" label="Color">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.pro1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pro2" label="Size">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.pro2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="UPC" label="UPC" width="140">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.UPC"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="EAN" label="EAN" width="140">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.EAN"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property1" label="款式1">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.property1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property2" label="款式2">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.property2"></el-input>
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
  getToolsite,
  geteBaysku,
  geteBayskutemplate
} from "../../api/profit";
export default {
  data() {
    return {
      show: false,
      show1: true,
      tableData: [],
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
      },
      condition1: {
        setting: {
          suffix: "showtime688",
          goodsCode: "6C0046",
          Site: "美国",
          Cat1: "女人世界",
          Cat2: "内衣",
          price: "22",
          shipping1: "5",
          shipping2: "5"
        },
        contents: {
          remark: ["abc", "edf"],
          SKU: ["6C004601", "6C004602"],
          Quantity: [20, 20],
          StartPrice: [0, 0],
          PictureURL: [
            "http://121.196.233.153/images/6C004601.jpg",
            "http://121.196.233.153/images/6C004602.jpg"
          ],
          Color: ["红色", "粉色"],
          Size: ["", ""],
          pro1: ["Red", "Pink"],
          pro2: ["", ""],
          EAN: ["Does not apply", "Does not apply"],
          UPC: ["Does not apply", "Does not apply"]
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.show1 = !this.show1;
      this.show = !this.show;
      geteBaysku(this.condition).then(response => {
        this.tableData = response.data.data.payload;
        console.log(this.tableData);
      });
    },
    btnSavekkk() {
      geteBayskutemplate(this.condition1).then(response => {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel;charset=UTF-8"
        });
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        downloadElement.download = "eBay商品SKU模板.xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    },
    back() {
      this.show = false;
      this.show1 = true;
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
    width: 106px;
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

