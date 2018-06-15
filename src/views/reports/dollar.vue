<template>
    <el-form>
        <el-form :inline="true" :model="sell" class="demo-form-inline">
      <el-form-item label="销售汇率">
        <el-input v-model="sell.mun" placeholder="销售汇率"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="oper" class="demo-form-inline">
      <el-form-item label="开发汇率">
        <el-input v-model="oper.mun" placeholder="开发汇率"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit2">查询</el-button>
      </el-form-item>
    </el-form>
    </el-form>
    
</template>
<script>
  export default {
    data() {
      return {
        sell: {
          mun: ''
        },
        oper: {
          mun: ''
        }
      }
    },
    methods: {
      onSubmit() {
        alert('submit!');
      },
      onSubmit2() {
        alert('submit2!');
      }
    }
  }
</script>

<style scoped lang="scss">

</style>