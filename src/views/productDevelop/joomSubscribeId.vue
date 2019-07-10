<template>
  <div class="joomCat">
    <el-row style="margin-top:10px;">
      <el-col :span="24">
        <el-table :data="tableData" border style="width:100%;margin-top:0px;" :height="tableHeight">
          <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
          <el-table-column
            label="产品编号"
            prop="productId"
            header-align="center"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            label="类目ID"
            prop="cateId"
            header-align="center"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            label="产品名称"
            prop="productName"
            header-align="center"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column label="价格" prop="price" header-align="center" align="center" width="130"></el-table-column>
          <el-table-column label="主图" prop="mainImage" header-align="center" width="130">
            <template slot-scope="scope">
              <el-tooltip
                placement="right"
                :open-delay="10"
                class="exxHover"
                popper-class="page-login-toolTipClass"
              >
                <div slot="content">
                  <img :src="scope.row.mainImage" style="width: 300px;height: 300px;" />
                </div>
                <img :src="scope.row.mainImage" style="width: 80px;height: 80px;margin-left:15px;" />
              </el-tooltip>
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
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import { APIJoomCateProduct } from "../../api/profit";

export default {
  data() {
    return {
      toolTipClass: 'page-login-toolTipClass',
      tableHeight: window.innerHeight - 130,
      tableData: [],
      condition: {
        cateId: null
      }
    };
  },
  methods: {
    relation() {
      APIJoomCateProduct(this.condition).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
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
</style>

