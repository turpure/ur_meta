<template>
  <div>
    <el-form label-width="200px" v-show="show1">
      <el-form-item label="卖家账号：">
        <el-select v-model="formInline.type" filterable clearable>
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
          <form>
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
      formInline: {
        type: ""
      },
      condition: {
        suffix: "wish_01-eshop",
        goodsCode: "S161",
        price: "22",
        msrp: "22",
        shipping: "22"
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
      getwishskutemplate(this.condition1).then(response => {
        console.log(response);
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
.el-form-item {
  margin-left: 30%;
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

