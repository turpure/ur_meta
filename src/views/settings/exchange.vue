<template>
  <el-form :inline="true" :model="condition" class="demo-form-inline" label-width="9rem">
    <el-form-item label="销售汇率">
      <el-input v-model="sell.mun" :placeholder="placeholders"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
    <br>
    <el-form-item label="开发汇率">
      <el-input v-model="oper.mun" :placeholder="placeholderd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit2">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUpdateexchange, getExchange } from '../../api/profit'
export default {
  data() {
    return {
      placeholderd: '',
      placeholders: '',
      sell: {
        mun: ''
      },
      oper: {
        mun: ''
      },
      condition: {
        devRate: '',
        saleRate: ''
      }
    }
  },
  methods: {
    onSubmit(form) {
      form.saleRate = this.sell.mun
      form.devRate = this.oper.mun
      getUpdateexchange(form).then(response => {
        alert('更新销售汇率成功！')
      })
    },
    onSubmit2(form) {
      form.saleRate = this.sell.mun
      form.devRate = this.oper.mun
      getUpdateexchange(form).then(response => {
        alert('更新开发汇率成功！')
      })
    }
  },
  mounted() {
    getExchange().then(response => {
      const saler = response.data.data
      this.placeholders = saler.salerRate
    })
    getExchange().then(response => {
      const dev = response.data.data
      this.placeholderd = dev.devRate
    })
  }
}
</script>

<style scoped lang="scss">
.el-form {
  margin-top: 1rem;
}
</style>