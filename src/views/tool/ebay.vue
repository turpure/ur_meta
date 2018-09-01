<template>
  <el-form :model='condition' label-width="200px" ref="condition">
    <el-form-item label="卖家账号：">
      <el-select v-model="condition.suffix" multiple>
        <el-option value="showtime688"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品编码：" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
      <el-input v-model="condition.goodsCode" placeholder="--必填--"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="input" @click="onSubmit(condition)">下载模板</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { geteBaytemplate, getToolaccount } from '../../api/profit'
export default {
  data() {
    return {
      condition: {
        suffix: ['showtime688'],
        goodsCode: '6C0046'
      }
    }
  },
  methods: {
    selectall() {
      const allValues = []
      for (const item of this.suffix) {
        allValues.push(item.ebaySuffix)
      }
      this.condition.suffix = allValues
    },
    noselect() {
      this.condition.suffix = []
    },
    onSubmit(form) {
      geteBaytemplate(form).then(response => {
        window.location.href = response
      })
    }
  },
  mounted() {
    getToolaccount({ type: 'eBay' }).then(response => {
      this.suffix = response.data.data
    })
  }
}
</script>

<style scoped>
.el-form-item {
  margin-left: 30%;
}
.el-input {
  width: 217px;
}
</style>

