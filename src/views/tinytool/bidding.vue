<template>
  <div class="toolbar" style="padding:10px">
    <el-row>
      <el-form
        :model="condition"
        :inline="true"
        ref="condition"
        label-width="5.8rem"
        class="demo-form-inline"
      >
        <el-form-item label="关键词" class="input">
          <el-input
            placeholder="关键词"
            v-model="condition.keyword"
            style="width:160px;"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table border :height="tableHeight" :data="tableData" :header-row-style="thClass">
      <el-table-column min-width="100" prop="keyword" label="关键词" :formatter="empty"></el-table-column>
      <el-table-column min-width="400" prop="url" label="链接" :formatter="empty">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getKeywordAnalysis } from "../../api/profit";
export default {
  data() {
    return {
      tableHeight:window.innerHeight -185,  
      tableData: [],
      condition: {
        keyword: null
      }
    };
  },
  methods: {
    onSubmit(data) {
      getKeywordAnalysis(data).then(response => {
        this.tableData = this.searchTable = response.data.data;
      });
    },
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    thClass({ row, rowIndex }) {
      return "color:#e42c4e";
    }
  },
  mounted() {
    this.onSubmit(this.condition)
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  a {
    color: #428bac;
    text-decoration: none;
  }
  a:hover {
    color: #2a6496;
    text-decoration: underline;
  }
}
</style>


