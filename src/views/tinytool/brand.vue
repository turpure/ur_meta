<template>
  <div>
    <el-form :model='condition' :inline='true' ref='condition' label-width='10rem' class='demo-form-inline'>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="condition.brand" style="width:20.4rem"></el-input>
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
        <a :href="item.url" style="text-decoration:none;">
          <img :src=item.imgUrl :alt="item.imgName">
          <p>
            <font color="black" size="3">
              <strong>{{item.brand}}</strong>
            </font>
          </p>
          <font color="black">
            {{item.country}}<br>{{item.category}}
        </font>
        </a>
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
  beforeRouteLeave(to, from, next) {
    if (from.name === "品牌列表") {
      let condition = JSON.stringify(this.condition);
      sessionStorage.setItem("condition", condition);
    } else {
      sessionStorage.removeItem("condition");
    }
    next();
  },
  created() {
    let condition = sessionStorage.getItem("condition");
    if (condition != null) {
      this.condition = JSON.parse(condition);
      this.listLoading = true;
      getBrand(this.condition)
        .then(response => {
          this.listLoading = false;
          this.tableData = response.data.data;
          this.total = this.tableData.length;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
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
  margin: 0.5rem;
}
.el-row {
  max-height: 65rem;
  overflow: auto;
  .mix:hover {
    border-radius: 1rem;
    border: 0.2rem solid #03c4eb;
  }
  .mix {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: inline-block;
    height: 13.5rem;
    margin: 1rem;
    position: relative;
    transition: all 0.2s ease-in-out;
    margin-top: 1.5rem;
    text-align: center;
    overflow: hidden;
    width: 24rem;
    p {
      margin: 0 0 1rem;
    }
  }
}
</style>

