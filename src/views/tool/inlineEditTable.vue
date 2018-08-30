<template>
  <div aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:1300px;">
      <div class="modal-content">
        <div class="modal-header">
          <div align="right">
            <input type="button" name="button" id="button" value="x" onclick="history.go(-1)">
          </div>
          <h4 class="modal-title" id="myModalLabel">多属性设置</h4>
          <br>
          <h5>
            <font color="red">找不到商品编码：</font>
          </h5>
          <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共：0条记录
        </div>
        <div class="modal-body">
          <form action="/eBay/index.php/Variation/expVar.html" method="post">
            <table :data="tableData" class="table table-hover" border="1" id="tb">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>数量</th>
                  <th>价格</th>
                  <th>图片路径</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>UPC</th>
                  <th>EAN</th>
                  <th>款式1</th>
                  <th>款式2</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <input type="button" name="button1" value="返回上页" onclick="history.go(-1)">
      <input type="button" @click="btnSavekkk" id="btnSavekkk" value="导出多属性表">
    </div>
  </div>
  <!-- <div>
    <el-table>
      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div> -->
</template>

<script>
import { geteBayskutemplate } from "../../api/profit";
export default {
  name: "inlineEditTable",
  data() {
    return {
      tableData: this.$store.state.tableData,
      condition: {
        contents: {
          remark: ["abc", "edf"],
          SKU: ["6C004601", "6C004602"],
          Quantity: [20, 20],
          StartPrice: [0, 0],
          PictureURL: [
            "http://121.196.233.153/images/6C004601.jpg",
            "http://121.196.233.153/images/6C004602.jpg"
          ],
          Color: ["红色", "粉色"],
          Size: ["", ""],
          pro1: ["Red", "Pink"],
          pro2: ["", ""],
          EAN: ["Does not apply", "Does not apply"],
          UPC: ["Does not apply", "Does not apply"]
        }
      }
    };
  },
  methods: {
    btnSavekkk() {
      geteBayskutemplate(this.condition).then(response => {});
    }
    // cancelEdit(row) {
    //   row.title = row.originalTitle;
    //   row.edit = false;
    //   this.$message({
    //     message: "The title has been restored to the original value",
    //     type: "warning"
    //   });
    // },
    // confirmEdit(row) {
    //   row.edit = false;
    //   row.originalTitle = row.title;
    //   this.$message({
    //     message: "The title has been edited",
    //     type: "success"
    //   });
    // }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.modal-dialog {
  margin: 30px auto;
  position: relative;
  z-index: 1050;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  background-clip: padding-box;
}
.modal-header {
  min-height: 16.428571429px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.h4 {
  font-size: 18px;
  font-weight: 500;
}
.h5 {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.1;
}
.modal-body {
  position: relative;
  padding: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}
.table > thead:first-child > tr:first-child > th {
  border-top: 0;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
  padding: 8px;
}
th {
  text-align: left;
}
.modal-footer {
  padding: 19px 20px 20px;
  margin-top: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
input[type="button"] {
  cursor: pointer;
  -webkit-appearance: button;
}
input {
  line-height: inherit;
}
</style>


