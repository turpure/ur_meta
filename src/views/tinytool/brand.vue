<template>
  <div>
    <el-col :span="24" style="background-color:red;text-indent:4px;line-height:20px;font-size:18px;color:white;">
      <i class="fa fa-globe">查询条件</i>
      <el-button type="text" style="margin-left:80%;line-height:5px;">导入excel文件</el-button>
    </el-col>
    <el-form :model='condition' :inline='true' ref='condition' label-width='100px' class='demo-form-inline'>
      <el-form-item label="品牌">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="国家">
        <el-select>
          <el-option value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别">
        <el-select>
          <el-option value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="800" style="width: 100%;overflow:auto;"></el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      condition: {}
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-top: 2px;
}
.el-table {
  background-color: #3d3d3d;
}
</style>

