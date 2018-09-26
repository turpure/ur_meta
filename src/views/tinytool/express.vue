<template>
  <div>
    <el-row :gutter='10' class="toolbar" style="margin-bottom: 0px;margin-top:0px">
      <el-col :span='2' :offset='21'>
        <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
      </el-col>
    </el-row>
    <el-table border max-height=860 :data="tableData" :header-row-style="thClass">
      <el-table-column min-width="120" prop="NID" label="ID" :formatter="empty"></el-table-column>
      <el-table-column min-width="260" prop="DefaultExpress" label="物流公司" :formatter="empty"></el-table-column>
      <el-table-column min-width="450" prop="name" label="物流方式" :formatter="empty"></el-table-column>
      <el-table-column min-width="840" prop="URL" label="查询网址" :formatter="empty">
        <template slot-scope="scope">
          <a :href=scope.row.URL>{{scope.row.URL}}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getExpress } from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      searchTable: [],
      searchValue: ""
    };
  },
  methods: {
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    thClass({ row, rowIndex }) {
      return "color:#e42c4e";
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase();
      const data = this.searchTable;
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            );
          });
        });
      } else {
        this.tableData = data;
      }
    }
  },
  mounted() {
    getExpress().then(response => {
      this.tableData = this.searchTable = response.data.data;
    });
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


