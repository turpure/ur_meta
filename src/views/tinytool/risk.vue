<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu" :label="item.name" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <div v-show="risk">
      <el-table :data="this.tableData" height="850" v-loading="loading">
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
    <div v-show="blacklist" class="toolbar" style="padding:10px 20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="data">
          <el-form-item>
            <el-input placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 黑名单列表 -->
      <!-- <el-table :data="this.blackData" :header-cell-style="thstyle" height="790" border v-loading="blackloading">
        <el-table-column label="平台" prop="addressowner"></el-table-column>
        <el-table-column label="买家ID" prop="buyerid"></el-table-column>
        <el-table-column label="收货人姓名" prop="shipToName"></el-table-column>
        <el-table-column label="收货人地址" prop="shiptostreet"></el-table-column>
        <el-table-column label="街道" prop="shiptostreet2"></el-table-column>
        <el-table-column label="收货人城市" prop="shiptocity"></el-table-column>
        <el-table-column label="收货人省份" prop="shiptostate"></el-table-column>
        <el-table-column label="国家" prop="shiptozip"></el-table-column>
        <el-table-column label="邮编" prop="shiptocountryCode"></el-table-column>
        <el-table-column label="电话" prop="SHIPtoPHONEnUM"></el-table-column>
      </el-table> -->
      <table border="1px solid #ebeef5" cellpadding="15" style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th>平台</th>
            <th>买家ID</th>
            <th>收货人姓名</th>
            <th>收货人地址</th>
            <!-- <th>shiptostreet2</th>
            <th>国家</th>
            <th>收货人城市</th>
            <th>收货人省份</th> -->
            <th>邮编</th>
            <th>电话</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in blackData" :key="index">
            <td>{{ item.addressowner }}</td>
            <td>{{ item.buyerid}}</td>
            <td>{{ item.shipToName}}</td>
            <td>{{ item.shiptozip}}{{ item.shiptostate}}{{ item.shiptocity}}{{ item.shiptostreet}}{{ item.shiptostreet2}}</td>
            <td>{{ item.shiptocountryCode}}</td>
            <!-- <td></td>
            <td></td>
            <td></td>
            <td></td> -->
            <td>{{ item.SHIPtoPHONEnUM}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 新增界面  -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :inline="true" :model="data" label-width="100px" ref="data">
            <el-form-item label="平台">
              <el-input v-model="data.addressowner" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否模糊匹配">
              <el-switch v-model="value1" @change="platmatch" active-color="#13ce66" inactive-color="#909399"></el-switch>
            </el-form-item>
            <br>
            <el-form-item label="买家ID">
              <el-input v-model="data.buyerId"></el-input>
            </el-form-item>
            <el-form-item label="是否模糊匹配">
              <el-switch v-model="value2" @change="idmatch" active-color="#13ce66" inactive-color="#909399"></el-switch>
            </el-form-item>
            <br>
            <el-form-item label="收货人姓名">
              <el-input v-model="data.shipToName"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="区">
              <el-input v-model="data.shipToStreet"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="街道">
              <el-input v-model="data.shipToStreet2"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收货人城市">
              <el-input v-model="data.shipToCity"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收货人省份">
              <el-input v-model="data.shipToState"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="国家">
              <el-input v-model="data.shipToZip"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="邮编">
              <el-input v-model="data.shipToCountryCode"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="电话">
              <el-input v-model="data.shipToPhoneNum"></el-input>
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
      value1: false,
      value2: false,
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
        addressowner: '',
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
    thstyle() {
      return 'color:black'
    },
    platmatch() {
      if (this.value1 === true) {
        if (this.data.addressowner === undefined) {
          this.data.addressowner = ''
        } else if (this.data.addressowner !== undefined) {
          this.data.addressowner = '%' + this.data.addressowner + '%'
        }
      } else {
        this.data.addressowner = this.data.addressowner.split('%').join('')
      }
    },
    idmatch() {
      if (this.value2 === true) {
        if (this.data.buyerId === undefined) {
          this.data.buyerId = ''
        } else if (this.data.buyerId !== undefined) {
          this.data.buyerId = '%' + this.data.buyerId + '%'
        }
      } else {
        this.data.buyerId = this.data.buyerId.split('%').join('')
      }
    },
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
      this.data = Object.assign({})
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
          this.getOrder(this.activeName)
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


