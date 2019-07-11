<template>
  <div class="joomCat">
    <el-row style="margin-top:10px;">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width:100%;margin-top:0px;"
          :height="tableHeight"
          :header-cell-style="getRowClass"
        >
          <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
          <el-table-column
            label="产品编号"
            prop="productId"
            header-align="center"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <a
                :href="'https://www.joom.com/en/products/'+scope.row.productId"
                target="_blank"
                class="classa"
              >{{scope.row.productId}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="类目ID"
            prop="cateId"
            header-align="center"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="产品名称"
            prop="productName"
            header-align="center"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <a
                :href="'https://www.joom.com/en/products/'+scope.row.productId"
                target="_blank"
                class="classa"
              >{{scope.row.productName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="price" header-align="center" align="center" width="130"></el-table-column>
          <el-table-column label="主图" prop="mainImage" header-align="center" width="130">
            <template slot-scope="scope">
              <a
                :href="'https://www.joom.com/en/products/'+scope.row.productId"
                target="_blank"
                style="display: block; width: 80px;height: 80px"
              >
                <el-tooltip
                  placement="right"
                  :open-delay="10"
                  class="exxHover"
                  popper-class="page-login-toolTipClass"
                >
                  <div slot="content">
                    <img :src="scope.row.mainImage" style="width: 300px;height: 300px;" />
                  </div>
                  <img
                    :src="scope.row.mainImage"
                    style="width: 80px;height: 80px;margin-left:15px;"
                  />
                </el-tooltip>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            label="评分"
            prop="rating"
            header-align="center"
            align="center"
            width="130"
          ></el-table-column>
          <el-table-column
            label="店铺ID"
            prop="storeId"
            header-align="center"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="taskCreatedTime"
            header-align="center"
            align="center"
            width="155"
          ></el-table-column>
          <el-table-column
            label="更新时间"
            prop="taskUpdatedTime"
            header-align="center"
            align="center"
            width="155"
          ></el-table-column>
          <el-table-column
            label="上架时间"
            prop="productCreatedTime"
            header-align="center"
            align="center"
            width="155"
          ></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.condition.page"
          :page-sizes="[20, 30, 40]"
          :page-size="this.condition.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import { APIJoomCateProduct } from "../../api/profit";

export default {
  data() {
    return {
      toolTipClass: "page-login-toolTipClass",
      tableHeight: window.innerHeight - 153,
      total: 0,
      tableData: [],
      condition: {
        cateId: null,
        pageSize: 20,
        page: 1
      }
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7";
      } else {
        return "";
      }
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.relation();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.relation();
    },
    relation() {
      APIJoomCateProduct(this.condition).then(response => {
        if (response.data.code == 200) {
          this.tableData = response.data.data.items;
          this.total = response.data.data._meta.totalCount;
          this.condition.pageSize = response.data.data._meta.perPage;
          this.condition.page = response.data.data._meta.currentPage;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.condition.cateId = this.$route.params.id;
    this.relation();
  }
};
</script>

<style lang="scss" scoped>
.joomCat {
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 10px;
}
.classa{
  color: black
}
</style>

