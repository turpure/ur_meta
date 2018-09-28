<template>
  <div>
    <el-form :model='condition' :inline='true' ref='condition' label-width='100px' class='demo-form-inline'>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="condition.brand"></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-select v-model="condition.country" clearable>
          <el-option v-for="item in country" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="condition.category" clearable>
          <el-option v-for="item in category" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row v-loading="listLoading">
      <el-col :span="6" class="mix" v-for="item in tableData.slice((condition.start-1)*pageSize,condition.start*pageSize)" :key="item.rowId">
        <img :src=item.imgUrl :alt="item.imgName">
        <p>
          <font color="black" size="3">
            <strong>{{item.brand}}</strong>
          </font>
        </p>
        <font color="black">
          {{item.country}}<br>{{item.category}}
        </font>
          <div class="mix-details">
            <a align="center" class="mix-link" :href="item.url" target="_blank">
              <i class="fa fa-link"></i>
            </a>
          </div>
      </el-col>
    </el-row>
    <el-col :span="24" class="toolbar" v-show="total>0">
      <div class="pagination-container" align="right">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="condition.start" :page-sizes="[20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getBrandcountry, getBrandcategory, getBrand } from "../../api/profit";
export default {
  data() {
    return {
      pageSize: 20,
      total: null,
      listLoading: false,
      tableData: [],
      country: [],
      category: [],
      condition: {
        brand: "",
        country: "",
        category: "",
        start: 1,
        limit: 1000
      }
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (from.name == "品牌列表") {
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
  //     this.listLoading = true;
  //     getBrand(this.condition)
  //       .then(response => {
  //         this.listLoading = false;
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
      getBrand(this.condition).then(response => {
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
    }
  },
  mounted() {
    getBrandcountry().then(response => {
      this.country = response.data.data;
    });
    getBrandcategory().then(response => {
      this.category = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-top: 10px;
}
.el-row {
  max-height: 760px;
  overflow: auto;
  .mix {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: inline-block;
    height: 150px;
    margin: 1rem;
    position: relative;
    transition: all 0.2s ease-in-out;
    width: 215px;
    margin-top: 15px;
    text-align: center;
    overflow: hidden;
    width: 300px;
    img {
      max-width: 100%;
    }
    p {
      margin: 0 0 10px;
    }
    .mix-details:hover {
      bottom: 0;
      transition: all 0.5s ease;
    }
    .mix-details {
      color: #fff;
      width: 100%;
      height: 200%;
      bottom: -100%;
      text-align: center;
      position: absolute;
      a.mix-link {
        right: 40%;
        margin-right: 5px;
        color: #555;
        display: block;
        cursor: pointer;
        margin-top: 170px;
        position: absolute;
        padding: 10px 15px;
        background: #16b2f4;
      }
      span.mix-preview {
        left: 50%;
        margin-left: 5px;
        color: #555;
        display: block;
        cursor: pointer;
        margin-top: 170px;
        position: absolute;
        padding: 10px 15px;
        background: #16b2f4;
      }
      a.mix-link:hover,
      span.mix-preview:hover {
        color: #fff;
        padding: 9px 14px;
        text-decoration: none;
        border: solid 1px #eee;
      }
    }
  }
}
</style>

