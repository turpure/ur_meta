<template>
  <div>
    <el-form :model="condition" label-width="150px" class="demo-ruleForm login-container" v-show="show1">
      <el-form-item label="卖家账号：">
        <el-select v-model="condition.suffix" filterable clearable>
          <el-option v-for='(item,index) in type' :index='index' :key='item.ibaySuffix' :label='item.ibaySuffix' :value='item.ibaySuffix'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码：">
        <el-input v-model="condition.goodsCode"></el-input>
      </el-form-item>
      <el-form-item label="保留价(msrp$)：">
        <el-input v-model="condition.msrp"></el-input>
      </el-form-item>
      <el-form-item label="商品售价(Price$)：">
        <el-input v-model="condition.price"></el-input>
      </el-form-item>
      <el-form-item label="运费(Shipping$)：">
        <el-input v-model="condition.shipping"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认信息</el-button>
        <el-button type="primary" @click="onSubmit()">属性设置
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
          <el-form :model="condition1">
            <el-table :data="tableData" class="table table-hover" id="tb">
              <el-table-column prop="SKU" label="SKU*" width="95px">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.SKU"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property1" label="颜色">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.property1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property2" label="尺寸">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.property2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量*">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.quantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="shipping" label="运费(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.shipping"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="msrp" label="建议零售价(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.msrp"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="$shippingTime" label="运输时间">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.$shippingTime"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pic_url" label="主图" width="280px">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.pic_url"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="variation1" label="款式1">
                <template slot-scope="scope">
                  <el-input size=mini v-model="scope.row.varition1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="variation2" label="款式2">
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
        <input type="button" @click="btnSavekkk" id="btnSavekkk" value="导出多属性表">
      </div>
    </div>
  </div>
</template>

<script>
import {
  getToolaccount,
  getwishsku,
  getwishskutemplate,
  getToolcolor,
  getToolsize
} from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      show1: true,
      show: false,
      type: [],
      condition: {
        suffix: "",
        goodsCode: "",
        price: "",
        msrp: "",
        shipping: ""
      },
      condition1: {
        contents: {
          SKU: ["6C004601", "6C004602"],
          variation1: [1, 2],
          variation2: ["黄色", "粉色"],

          pic_url: [
            "http://121.196.233.153/images/6C004601.jpg",
            "http://121.196.233.153/images/6C004602.jpg"
          ],
          property2: ["黄色", "粉色"],
          property1: [1, 2],
          quantity: [1000, 1000],
          price: [222, 222],
          msrp: [111, 111],
          shipping: [333, 333],
          shippingTime: ["7-21", "7-21"]
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.show = !this.show;
      this.show1 = !this.show1;
      getwishsku(this.condition).then(response => {
        this.tableData = response.data.data;
      });
    },
    btnSavekkk() {
      this.condition1.contents.SKU = this.tableData.map(e => e.SKU);
      this.condition1.contents.variation1 = this.tableData.map(
        e => e.variation1
      );
      this.condition1.contents.variation2 = this.tableData.map(
        e => e.variation2
      );
      this.condition1.contents.pic_url = this.tableData.map(e => e.pic_url);
      this.condition1.contents.property2 = this.tableData.map(e => e.property2);
      this.condition1.contents.property1 = this.tableData.map(e => e.property1);
      this.condition1.contents.quantity = this.tableData.map(e => e.quantity);
      this.condition1.contents.price = this.tableData.map(e => e.price);
      this.condition1.contents.msrp = this.tableData.map(e => e.msrp);
      this.condition1.contents.shipping = this.tableData.map(e => e.shipping);
      this.condition1.contents.shippingTime = this.tableData.map(
        e => e.$shippingTime
      );
      getwishskutemplate(this.condition1).then(response => {
        debugger;
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
          "Wish商品SKU模板" + year + month + strDate + hour + minute + second;
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
    getToolaccount({ type: "Wish" }).then(response => {
      this.type = response.data.data;
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
  width: 450px;
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

