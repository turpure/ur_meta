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
      if (this.sell.mun === '' || this.oper.mun === '') {
        this.sell.mun = this.placeholders
        this.oper.mun = this.placeholderd
      }
      form.saleRate = this.sell.mun
      form.devRate = this.oper.mun
      getUpdateexchange(form).then(response => {
        this.$alert('更新销售汇率成功！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      })
    },
    onSubmit2(form) {
      if (this.sell.mun === '' || this.oper.mun === '') {
        this.sell.mun = this.placeholders
        this.oper.mun = this.placeholderd
      }
      form.saleRate = this.sell.mun
      form.devRate = this.oper.mun
      getUpdateexchange(form).then(response => {
        this.$alert('更新开发汇率成功！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      })
    }
  },
  mounted() {
    getExchange().then(response => {
      const saler = response.data.data
      const dev = response.data.data
      this.placeholders = saler.salerRate
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