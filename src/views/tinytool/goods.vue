<template>
  <div>
    <el-form :model='condition' :inline='true' label-width='15rem' class='demo-form-inline'>
      <el-form-item label='业绩归属人' class='input'>
        <el-select v-model='condition.possessMan1' clearable>
          <el-option v-for='item in possessMan1' :key='item.username' :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='产品状态' class='input'>
        <el-select v-model='condition.goodsSkuStatus' clearable>
          <el-option v-for='item in goodsSkuStatus' :key='item' :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='关键字' class='input'>
        <el-input v-model='condition.goodsName' placeholder="商品名称关键字">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item label='业绩归属人2' class='input'>
        <el-select v-model='condition.possessMan2' clearable>
          <el-option v-for='item in possessMan2' :key='item.username' :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='产品分类1' class='input'>
        <el-select v-model='condition.categoryParentName' clearable @change="productcategory">
          <el-option v-for='item in categoryParentName' :key='item.CategoryName' :value='item.CategoryName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='关键字' class='input'>
        <el-input v-model='condition.supplierName' placeholder="供应商名称关键字">
        </el-input>
      </el-form-item>
      <br>
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
      <el-form-item label='日期' class='input'>
        <el-date-picker style="width:17rem" v-model='form.newRange' type='daterange' value-format='yyyy-MM-dd' align='right' unlink-panels range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' :picker-options='pickerOptions2'>
        </el-date-picker>
      </el-form-item>
      <el-form-item class='input' style="margin-left:6.5rem">
        <el-button type="primary" @click="onSubmit(condition)">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row v-loading="listLoading">
      <el-col :span="4" class="mix" v-for="item in tableData.slice((condition.start-1)*pageSize,condition.start*pageSize)" :key="item.rowId">
        <div class="mix-inner">
          <img :src=item.BmpFileName :alt='item.GoodsName+item.GoodsSKUStatus'>
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
    <el-col :span="24" class="toolbar" v-show="total>0">
      <div class="pagination-container" align="right">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="condition.start" :page-sizes="[12, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-col>
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
      form: {
        dateRange: ["", ""]
      },
      category: [],
      pageSize: 12,
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
        limit: 1000
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const y = end.getFullYear();
              let m = end.getMonth() + 1;
              if (m < 10) {
                m = "0" + m;
              }
              const firstday = y + "-" + m + "-" + "01";
              const start = new Date();
              const sy = start.getFullYear();
              let sm = start.getMonth() + 1;
              const sd = start.getDate();
              if (sm < 10) {
                sm = "0" + sm;
              }
              const sfirstday = sy + "-" + sm + "-" + sd;
              picker.$emit("pick", [firstday, sfirstday]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const nowdays = new Date();
              let year = nowdays.getFullYear();
              let month = nowdays.getMonth();
              if (month === 0) {
                month = 12;
                year = year - 1;
              }
              if (month < 10) {
                month = "0" + month;
              }
              const firstDay = [year, month, "01"].join("-");
              const myDate = new Date(year, month, 0);
              const lastDay = [year, month, myDate.getDate()].join("-");
              picker.$emit("pick", [firstDay, lastDay]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name != "goods") {
  //     let condition = JSON.stringify(this.condition);
  //     sessionStorage.setItem("condition", condition);
  //   } else {
  //     sessionStorage.removeItem("condition");
  //   }
  //   next();
  // },
  // created() {
  //   let condition = sessionStorage.getItem("condition");
  //   if (condition != null) {
  //     this.condition = JSON.parse(condition);
  //     getGoodspicture(this.condition)
  //       .then(response => {
  //         this.tableData = response.data.data;
  //         this.total = this.tableData.length;
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // },
  methods: {
    onSubmit() {
      this.listLoading = true;
      this.condition.beginDate = this.form.dateRange[0];
      this.condition.endDate = this.form.dateRange[1];
      getGoodspicture(this.condition).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data;
        this.total = this.tableData.length;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.condition.start = val;
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
  .el-form-item {
    margin: 0.2rem;
  }
}
.el-row {
  max-height: 64rem;
  overflow: auto;
  .mix {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: inline-block;
    height: 26rem;
    margin: 1rem;
    position: relative;
    transition: all 0.2s ease-in-out;
    margin-top: 1.5rem;
    text-align: center;
    overflow: hidden;
    width: 20rem;
    .mix-inner {
      position: relative;
      width: 100%;
      img {
        max-width: 100%;
        height: 17rem;
      }
      .mix-details {
        //margin-left: -45px;
        color: #fff;
        width: 100%;
        height: 200%;
        bottom: -100%;
        text-align: center;
        position: absolute;
        h4 {
          color: #fff;
          margin-top: 24rem;
          font-size: 18px;
          margin-bottom: 1rem;
        }
        h5 {
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: 14px;
        }
        h6 {
          font-size: 12px;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        a.mix-link {
          right: 35%;
          margin-right: 0.5rem;
          color: #555;
          display: block;
          cursor: pointer;
          margin-top: 1rem;
          position: absolute;
          padding: 1rem 1.5rem;
          background: #16b2f4;
        }
        a.mix-preview {
          left: 50%;
          margin-left: 0.5rem;
          color: #555;
          display: block;
          cursor: pointer;
          margin-top: 1rem;
          position: absolute;
          padding: 1rem 1.5rem;
          background: #16b2f4;
        }
        a.mix-link:hover,
        a.mix-preview:hover {
          color: #fff;
          padding: 0.9rem 1.4rem;
          text-decoration: none;
          border: solid 0.1rem #eee;
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
