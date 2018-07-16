<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="出货仓库" class="input">
      <el-select v-model="value5" multiple placeholder="请选择">
        <el-option v-for="(item,index) in options" :index="index" :key="item.value" :label="item.label" :value="item.value">
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value5: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
