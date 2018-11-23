<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu" :label="item.name" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <div v-show="risk">
      <el-table :data="this.tableData" height="890" v-loading="loading">
        <el-table-column label="订单编号" prop="tradeNid"></el-table-column>
        <el-table-column label="orderTime" prop="orderTime"></el-table-column>
        <el-table-column label="suffix" prop="suffix"></el-table-column>
        <el-table-column label="buyerId" prop="buyerId"></el-table-column>
        <el-table-column label="shipToName" prop="shipToName"></el-table-column>
        <el-table-column label="shipToStreet" prop="shipToStreet"></el-table-column>
        <el-table-column label="shipToStreet2" prop="shipToStreet2"></el-table-column>
        <el-table-column label="shipToCity" prop="shipToCity"></el-table-column>
        <el-table-column label="shipToZip" prop="shipToZip"></el-table-column>
        <el-table-column label="shipToCountryCode" prop="shipToCountryCode"></el-table-column>
        <el-table-column label="shipToPhoneNum" prop="shipToPhoneNum"></el-table-column>
      </el-table>
    </div>
    <div v-show="blacklist">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="data">
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 黑名单列表 -->
      <el-table :data="this.blackData" height="890" v-loading="blackloading">
        <el-table-column label="platform" prop="platform"></el-table-column>
        <el-table-column label="buyerid" prop="buyerid"></el-table-column>
        <el-table-column label="shipToName" prop="shipToName"></el-table-column>
        <el-table-column label="shiptostreet" prop="shiptostreet"></el-table-column>
        <el-table-column label="shiptostreet2" prop="shiptostreet2"></el-table-column>
        <el-table-column label="shiptocity" prop="shiptocity"></el-table-column>
        <el-table-column label="shiptostate" prop="shiptostate"></el-table-column>
        <el-table-column label="shiptozip" prop="shiptozip"></el-table-column>
        <el-table-column label="shiptocountryCode" prop="shiptocountryCode"></el-table-column>
        <el-table-column label="SHIPtoPHONEnUM" prop="SHIPtoPHONEnUM"></el-table-column>
      </el-table>
      <!-- 新增界面  -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="data" label-width="80px" ref="data">
            <el-form-item label="平台">
              <el-input v-model="data.platform"></el-input>
            </el-form-item>
            <el-form-item label="买家账号">
              <el-input v-model="data.buyerid"></el-input>
            </el-form-item>
            <el-form-item label="卖家人称">
              <el-input v-model="data.shipToName"></el-input>
            </el-form-item>
            <el-form-item label="卖家店铺1">
              <el-input v-model="data.shiptostreet"></el-input>
            </el-form-item>
            <el-form-item label="卖家店铺2">
              <el-input v-model="data.shiptostreet2"></el-input>
            </el-form-item>
            <el-form-item label="卖家城市">
              <el-input v-model="data.shiptocity"></el-input>
            </el-form-item>
            <el-form-item label="卖家站点">
              <el-input v-model="data.shiptostate"></el-input>
            </el-form-item>
            <el-form-item label="卖家zip">
              <el-input v-model="data.shiptozip"></el-input>
            </el-form-item>
            <el-form-item label="卖家国家编码">
              <el-input v-model="data.shiptocountryCode"></el-input>
            </el-form-item>
            <el-form-item label="卖家电话">
              <el-input v-model="data.SHIPtoPHONEnUM"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit">提交</el-button>
          </div>
        </el-dialog>
    </div>
  </section>
</template>

<script>
import { Risk, BlackList, postBlacklist } from '../../api/api'
import { getMenu } from '../../api/login'
export default {
  data() {
    return {
      addFormVisible: false,
      risk: false,
      blacklist: false,
      blackloading: false,
      activeName: '',
      allMenu: [],
      loading: false,
      tableData: [],
      blackData: [],
      data: {
        platform: '',
        buyerId: '',
        shipToName: '',
        shipToStreet: '',
        shipToStreet2: '',
        shipToCity: '',
        shipToState: '',
        shipToZip: '',
        shipToCountryCode: '',
        shipToPhoneNum: ''
      }
    }
  },
  watch: {
    activeName: function(newVal, oldVal) {
      this.activeName = newVal
      this.getOrder(this.activeName)
    }
  },
  mounted() {
    // this.getOrder(this.activeName)
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === 'UR小工具')
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].children.length; j++) {
          this.allMenu = menu[i].children[j].tabs
        }
      }
    })
  },
  methods: {
    // 权限
    handleClick(tab, event) {
      if (tab.label === '风险订单') {
        this.risk = true
      } else {
        this.risk = false
      }
      if (tab.label === '黑名单') {
        this.blacklist = true
      } else {
        this.blacklist = false
      }
    },
    // 新增
    handleAdd() {
      const form = {
        platform: '',
        buyerId: '',
        shipToName: '',
        shipToStreet: '',
        shipToStreet2: '',
        shipToCity: '',
        shipToState: '',
        shipToZip: '',
        shipToCountryCode: '',
        shipToPhoneNum: ''
      }
      this.data = Object.assign({}, form)
      this.addFormVisible = true
    },
    addSubmit() {
      this.addFormVisible = false
      postBlacklist(this.data).then(response => {
        if (response.data.code === 200) {
          this.$confirm('成功!', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        } else {
          this.$confirm('失败！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    getOrder(name) {
      if (name === '风险订单') {
        this.loading = true
        Risk().then(response => {
          this.loading = false
          this.tableData = response.data.data
        })
      } else if (name === '黑名单') {
        this.blackloading = true
        BlackList().then(response => {
          this.blackloading = false
          this.blackData = response.data.data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 10px 10px;
}
</style>


