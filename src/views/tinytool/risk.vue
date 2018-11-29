<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu" :label="item.name" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <div v-show="risk">
      <el-table :data="this.tableData" height="850" v-loading="loading">
        <el-table-column label="订单编号" prop="tradeNid"></el-table-column>
        <el-table-column label="交易时间" prop="orderTime"></el-table-column>
        <el-table-column label="账号简称" prop="suffix"></el-table-column>
        <el-table-column label="买家ID" prop="buyerId"></el-table-column>
        <el-table-column label="收货人" prop="shipToName"></el-table-column>
        <el-table-column label="收货地址" prop="shipToStreet"></el-table-column>
        <el-table-column label="收货地址2" prop="shipToStreet2"></el-table-column>
        <el-table-column label="城市" prop="shipToCity"></el-table-column>
        <el-table-column label="邮编" prop="shipToZip"></el-table-column>
        <el-table-column label="国家" prop="shipToCountryCode"></el-table-column>
        <el-table-column label="电话" prop="shipToPhoneNum"></el-table-column>
        <el-table-column label="处理人" prop="processor"></el-table-column>
        <el-table-column label="处理状态" prop="completeStatus">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.completeStatus }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column label="操作" >
            <template slot-scope="scope"> 
              <el-button type="info" round size="small" >标记完成</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div v-show="blacklist" class="toolbar" style="padding:10px 20px;">
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input clearable placeholder='search' v-model='searchValue' @keyup.native='handleSearch'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 黑名单列表 -->
      <table id="oTable" border="1px solid #ebeef5" cellpadding="15" style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th>平台</th>
            <th>买家ID</th>
            <th>收货人姓名</th>
            <th>收货人地址</th>
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
      searchValue: '',
      searchTable: [],
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
      },
      condition: {
        'beginDate': '',
        'endDate': ''
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
          if (menu[i].children[j].tabs.length) {
            this.allMenu = menu[i].children[j].tabs
          }
        }
      }
    })
  },
  methods: {
    // 搜索
    handleSearch() {
      const ot = document.getElementById('oTable')
      const rowsLength = ot.rows.length
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      for (let i = 1; i < rowsLength; i++) {
        const searchText = ot.rows[i].innerHTML
        if (searchText.toLowerCase().indexOf(searchValue) > -1) {
          ot.rows[i].style.display = ''
        } else {
          ot.rows[i].style.display = 'none'
        }
      }
    },
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
      const form = {
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
      // if (this.date !== null) {
      //   this.condition.beginDate = this.date[0]
      //   this.condition.endDate = this.date[1]
      // } else if (this.date === null) {
      //   this.condition.beginDate = ''
      //   this.condition.endDate = ''
      // }
      if (name === '风险订单') {
        this.loading = true
        Risk(this.condition).then(response => {
          this.loading = false
          this.tableData = response.data.data
        })
      } else if (name === '黑名单') {
        this.blackloading = true
        BlackList().then(response => {
          this.blackloading = false
          this.blackData = this.searchTable = response.data.data
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


