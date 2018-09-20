<template>
  <div>
    <el-form :model='condition' :inline='true' label-width='90px' class='demo-form-inline'>
      <el-form-item label='业绩归属人' class='input'>
        <el-select v-model='condition.possessMan1' clearable>
          <el-option v-for='item in possessMan1' :key='item.username' :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='开始时间' class='input'>
        <el-date-picker v-model='condition.beginDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label='关键字' class='input'>
        <el-input v-model='condition.goodsName' placeholder="商品名称关键字">
        </el-input>
      </el-form-item>
      <el-form-item label='产品状态' class='input'>
        <el-select v-model='condition.goodsSkuStatus' clearable>
          <el-option v-for='item in goodsSkuStatus' :key='item' :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='产品分类1' class='input'>
        <el-select v-model='condition.categoryParentName' clearable @change="productcategory">
          <el-option v-for='item in categoryParentName' :key='item.CategoryName' :value='item.CategoryName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='业绩归属人2' class='input'>
        <el-select v-model='condition.possessMan2' clearable>
          <el-option v-for='item in possessMan2' :key='item.username' :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='结束时间' class='input'>
        <el-date-picker v-model='condition.endDate' type='date' value-format='yyyy-MM-dd' placeholder='选择日期'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label='关键字' class='input'>
        <el-input v-model='condition.supplierName' placeholder="供应商名称关键字">
        </el-input>
      </el-form-item>
      <el-form-item label='产品分类2' class='input'>
        <el-select v-model='condition.categoryName' clearable :disabled="disabled">
          <el-option v-for='item in categoryName' :key='item.CategoryName' :value='item.CategoryName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='责任人' class='input'>
        <el-select v-model='condition.salerName' clearable>
          <el-option v-for='item in salerName' :key='item.username' :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class='input'>
        <el-button type="primary" @click="onSubmit(condition)">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row v-loading="listLoading">
      <el-col :span="4" class="mix" v-for="item in tableData.slice((condition.start-1)*pageSize,condition.start*pageSize)" :key="item.rowId">
        <div class="mix-inner">
          <div style="height:220px;width:200px">
            <img :src=item.BmpFileName :alt='item.GoodsName+item.GoodsSKUStatus'>
          </div>
          <p>&nbsp;{{item.GoodsCode}}&nbsp;{{item.CategoryParentName}}&nbsp;{{item.CategoryName}}<br>&nbsp;{{item.possessman1}}
          </p>
          <p>&nbsp;{{item.GoodsName}}&nbsp;&nbsp;&nbsp;{{item.GoodsSKUStatus}}</p>
          <div class="mix-details">
            <h4>{{item.GoodsCode}}{{item.possessman1}}</h4>
            <h5>{{item.CategoryParentName}}</h5>
            <h6>{{item.CategoryName}}</h6>
            <h5>{{item.GoodsName}}</h5>
            <h6>{{item.GoodsSKUStatus}}</h6>
            <a align="center" class="mix-link" :href="item.LinkUrl" target="_blank">
              <i class="fa fa-link"></i>
            </a>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="block" align="right" v-show="show">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="condition.start" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getGoodspicture,
  getGoodsstatus,
  getGoodscats,
  getMember
} from "../../api/profit";
export default {
  data() {
    return {
      category: [],
      show: false,
      pageSize: 10,
      total: null,
      disabled: true,
      listLoading: false,
      tableData: [],
      salerName: [],
      possessMan1: [],
      possessMan2: [],
      beginDate: "",
      endDate: "",
      goodsName: "",
      supplierName: "",
      goodsSkuStatus: [],
      categoryParentName: [],
      categoryName: [],
      condition: {
        salerName: "",
        possessMan1: "",
        possessMan2: "",
        beginDate: "",
        endDate: "",
        goodsName: "",
        supplierName: "",
        goodsSkuStatus: "",
        categoryParentName: "",
        categoryName: "",
        start: 1,
        limit: 100000
      }
    };
  },
  methods: {
    onSubmit() {
      this.listLoading = true;
      this.show = true;
      getGoodspicture(this.condition).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data;
        this.total = this.tableData.length;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.condition.start = val;
      this.onSubmit();
    },
    productcategory() {
      if (this.condition.categoryParentName != "") {
        this.disabled = false;
        const val = this.condition.categoryParentName;
        const res = this.category;
        this.categoryName = res.filter(e => e.CategoryParentName === val);
      } else if (this.condition.categoryParentName == "") {
        this.disabled = true;
      }
    }
  },
  mounted() {
    getGoodsstatus().then(response => {
      this.goodsSkuStatus = response.data.data;
    });
    getGoodscats().then(response => {
      this.category = this.categoryParentName = response.data.data;
    });
    getMember().then(response => {
      let possessMan = response.data.data;
      this.possessMan1 = this.possessMan2 = possessMan.filter(
        e => e.position == "开发"
      );
      this.salerName = possessMan.filter(e => e.position == "美工");
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 10px;
}
.el-row {
  height: 740px;
  overflow: auto;
  .mix {
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    display: block;
    opacity: 1;
    .mix-inner {
      position: relative;
      width: 100%;
      img {
        display: block;
        height: auto;
        max-width: 100%;
      }
      .mix-details {
        margin-left: -45px;
        color: #fff;
        width: 100%;
        height: 200%;
        bottom: -100%;
        text-align: center;
        position: absolute;
        h4 {
          color: #fff;
          margin-top: 300px;
          font-size: 18px;
          margin-bottom: 10px;
        }
        h5 {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        h6 {
          font-size: 12px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        a.mix-link {
          right: 40%;
          margin-right: 5px;
          color: #555;
          display: block;
          cursor: pointer;
          margin-top: 10px;
          position: absolute;
          padding: 10px 15px;
          background: #16b2f4;
        }
        a.mix-preview {
          left: 50%;
          margin-left: 5px;
          color: #555;
          display: block;
          cursor: pointer;
          margin-top: 10px;
          position: absolute;
          padding: 10px 15px;
          background: #16b2f4;
        }
        a.mix-link:hover,
        a.mix-preview:hover {
          color: #fff;
          padding: 9px 14px;
          text-decoration: none;
          border: solid 1px #eee;
        }
      }
      .mix-details:hover {
        bottom: 0;
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
