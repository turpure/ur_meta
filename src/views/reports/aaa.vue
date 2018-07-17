<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="出货仓库" class="input">
      <el-select v-model="conditionForm.store" multiple collapse-tags placeholder="请选择">
        <el-option v-for="(item,index) in store" :index="index" :key="item.store" :label="item.store" :value="item.store">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { getMyToken } from "../../api/api";
import { getStore } from "../../api/profit";

export default {
  data() {
    return {
      store: [{ id: 1, store: "中国仓" }, { id: 2, store: "海外仓" }],
      conditionForm: {
        store: ""
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.listLoading = true;
      getSales(form).then(response => {
        this.listLoading = false;
        this.tableData = this.searchTable = response.data.data;
      });
    }
  },
  mounted() {
    var access_token = getMyToken();
    getStore(access_token).then(response => {
      this.options = response.dataget;
    });
  }
};
</script>
<style lang="sass" scoped>

</style>
