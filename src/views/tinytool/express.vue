<template>
  <el-table border :data="tableData" :header-row-style="thClass">
    <el-table-column min-width="120" prop="NID" label="ID" :formatter="empty"></el-table-column>
    <el-table-column min-width="260" prop="DefaultExpress" label="物流公司" :formatter="empty"></el-table-column>
    <el-table-column min-width="450" prop="name" label="物流方式" :formatter="empty"></el-table-column>
    <el-table-column min-width="840" prop="URL" label="查询网址" :formatter="empty">
      <template slot-scope="scope">
        <a :href=scope.row.URL>{{scope.row.URL}}</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getExpress } from "../../api/profit";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    thClass({ row, rowIndex }) {
      return "color:#e42c4e";
    }
  },
  mounted() {
    getExpress().then(response => {
      this.tableData = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  max-height: 890px;
  overflow: auto;
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


