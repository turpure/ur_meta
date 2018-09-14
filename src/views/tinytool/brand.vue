<template>
  <div>
    <el-col :span="24" style="background-color:red;text-indent:4px;line-height:20px;font-size:18px;color:white;">
      <i class="fa fa-globe">查询条件</i>
      <el-button type="text" style="margin-left:80%;line-height:5px;">导入excel文件</el-button>
    </el-col>
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
    <el-row>
      <el-col :span="6" class="mix" v-for="item in tableData" :key="item.rowId">
        <img :src=item.imgUrl :alt="item.imgName">
        <p>
          <font color="white" size="3">
            <strong>{{item.brand}}</strong>
          </font>
        </p>
        <font color="white">
          {{item.country}}<br>{{item.category}}
        </font>
        <div class="mix-details">
          <a align="center" class="mix-link" :href="item.url" target="_blank">
            <i class="fa fa-link"></i>
          </a>
          <a align="center" class="mix-preview" :href="item.imgUrl" data-rel="fancybox-button">
            <i class="fa fa-search"></i>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBrandcountry, getBrandcategory, getBrand } from "../../api/profit";
export default {
  data() {
    return {
      listLoading: false,
      tableData: [],
      country: [],
      category: [],
      condition: {
        brand: "",
        country: "",
        category: "",
        start: 1,
        limit: 10
      }
    };
  },
  methods: {
    onSubmit() {
      this.listLoading = true;
      getBrand(this.condition).then(response => {
        this.tableData = response.data.data;
      });
      this.listLoading = false;
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
  margin-top: 2px;
}
.el-row {
  background-color: black;
  height: 820px;
  .mix {
    margin-top: 15px;
    margin-left: 150px;
    text-align: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    width: 300px;
    display: block;
    opacity: 1;
    img {
      max-width: 100%;
      width: 200px;
      height: 90px;
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
        right: 50%;
        margin-right: 5px;
        color: #555;
        display: block;
        cursor: pointer;
        margin-top: 170px;
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
        margin-top: 170px;
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
  }
}
</style>

