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
          <h5 v-if="this.tableData.length<1?true:false">
            <font color="red">找不到商品编码：</font>
          </h5>
          <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共：{{this.tableData.length}}条记录
        </div>
        <div class="modal-body">
          <form>
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
      type: [],
      formInline: {
        type: ""
      },
      condition: {
        suffix: "aliexpress_SMT-19",
        goodsCode: "6A0895",
        price: "22"
      },
      condition1: {
        contents: {
          SKU: ["6C004601", "6C004602"],
          quantity: [20, 20],
          price: [0, 0],
          pic_url: [
            "http://121.196.233.153/images/6C004601.jpg",
            "http://121.196.233.153/images/6C004602.jpg"
          ],
          property1: ["红色", "粉色"],
          property2: ["", ""],
          varition1: ["Red", "Pink"],
          varition2: ["", ""],
          name1: ["Does not apply", "Does not apply"]
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
      getsmtskutemplate(this.condition1).then(response => {
        console.log(response);
      });
    },
    back() {
      this.show = false;
      this.show1 = true;
    }
  },
  mounted() {
    getToolaccount({ type: "SMT" }).then(response => {
      this.type = response.data.data;
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
.el-form-item {
  margin-left: 30%;
  .el-input[data-v-e9c3cdf0] {
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