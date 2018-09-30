<template>
  <!-- <div>销售毛利润报表</div>     -->
  <div>
    <div class='demo-block demo-box demo-zh-CN demo-transition' @mouseover='changeActive' @mouseout='removeActive'>
      <transition name='el-fade-in-linear'>
        <el-form :model='condition' :inline='true' ref='condition' label-width='10rem' class='demo-form-inline' v-show='show'>
          <el-form-item label='部门' class='input'>
            <el-select v-model='condition.department' multiple collapse-tags placeholder='部门' @change='choosed'>
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option v-for='(item,index) in department' :index='index' :key='item.department' :label='item.department' :value='item.department'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='平台' class='input'>
            <el-select v-model='condition.plat' clearable placeholder='平台'>
              <el-option v-for='(item,index) in plat' :index='index' :key='item.plat' :label='item.plat' :value='item.plat'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='销售员' class='input'>
            <el-select v-model='condition.member' filterable multiple collapse-tags placeholder='销售员'>
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for='(item,index) in member' :index='index' :key='item.username' :label='item.username' :value='item.username'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='出货仓库' class='input'>
            <el-select v-model='condition.store' filterable multiple collapse-tags placeholder='请选择'>
              <el-button plain type="info" @click="selectalls">全选</el-button>
              <el-button plain type="info" @click="noselects">取消</el-button>
              <el-option v-for='item in store' :key='item' :value='item'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" class="input">
            <el-select v-model="condition.account" filterable multiple collapse-tags placeholder="账号">
              <el-button plain type="info" @click="selectall">全选</el-button>
              <el-button plain type="info" @click="noselect">取消</el-button>
              <el-option v-for="(item,index) in account" :index="item[index]" :key="item.id" :label="item.store" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='时间类型' class='input' prop='dateType'>
            <el-radio-group v-model='condition.dateType'>
              <el-radio border v-for='(item,index) in dateType' :index='index' :key='item.id' :label='item.id' :value='item.id' style="width:8.6rem">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-model="condition.sku" label="商品编码">
            <el-input style="width:18.1rem;"></el-input>
          </el-form-item>
          <el-form-item label='日期' class='input' prop='dateRange' :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker v-model='condition.dateRange' type='daterange' value-format='yyyy-MM-dd' align='right' unlink-panels range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' :picker-options='pickerOptions2' style="width:18.1rem;">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' class='input' @click='onSubmit(condition)'>查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class='demo-block-control' @click='handleChange' style='left:0rem'>
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class='transition-i'>
          </i>
        </transition>
        <transition>
          <span v-show='show1' class='transition-span'>{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row :gutter='10'>
      <el-col :span='2' :offset='20'>
        <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left' type='default' @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData.slice((condition.start-1)*pageSize,condition.start*pageSize)" id="sale-table" size="medium" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" :height="tableHeight" :max-height="tableHeight" v-show="show2" style="width: 100%;zoom:0.6;">
      <el-table-column min-width="50" prop="suffix" label="账号" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="55" prop="pingtai" label="平台" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="70" prop="salesman" label="销售员" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="80" prop="GoodsCode" label="商品编码" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="80" prop="GoodsName" label="商品名称" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100" prop="SalerName" label="开发员" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="102" prop="SKUQty" label="销量" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="90" prop="SaleMoneyRmb" label="销售额" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="90" prop="ProfitRmb" label="利润￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="90" prop="rate" label="利润率%" :formatter="empty" sortable="custom"></el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" style="margin-top:0rem" v-show="total>0">
      <div class="pagination-container">
        <el-pagination :current-page="condition.start" :page-sizes="[25,30,40,50]" :page-size="pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </el-col>
  </div>
</template>

<script>
import {
  getSection,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getaccount
} from '../../api/profit'
import { compareUp, compareDown } from '../../api/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      pageSize: 25,
      total: null,
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: '显示输入框',
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      listLoading: false,
      department: [],
      plat: '',
      member: [],
      store: [],
      dateType: [{ id: 1, type: '发货时间' }, { id: 0, type: '交易时间' }],
      dateRange: [],
      account: [],
      condition: {
        department: [],
        plat: '',
        member: [],
        store: [],
        sku: '',
        dateType: 1,
        dateRange: [],
        account: [],
        start: 1,
        limit: 1000
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const y = end.getFullYear()
              let m = end.getMonth() + 1
              if (m < 10) {
                m = '0' + m
              }
              const firstday = y + '-' + m + '-' + '01'
              const start = new Date()
              const sy = start.getFullYear()
              let sm = start.getMonth() + 1
              const sd = start.getDate()
              if (sm < 10) {
                sm = '0' + sm
              }
              const sfirstday = sy + '-' + sm + '-' + sd
              picker.$emit('pick', [firstday, sfirstday])
            }
          },
          {
            text: '上个月',
            onClick(picker) {
              const nowdays = new Date()
              let year = nowdays.getFullYear()
              let month = nowdays.getMonth()
              if (month === 0) {
                month = 12
                year = year - 1
              }
              if (month < 10) {
                month = '0' + month
              }
              const firstDay = [year, month, '01'].join('-')
              const myDate = new Date(year, month, 0)
              const lastDay = [year, month, myDate.getDate()].join('-')
              picker.$emit('pick', [firstDay, lastDay])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.condition.start = val
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    selectalls() {
      const allValues = []
      for (const item of this.store) {
        allValues.push(item)
      }
      this.condition.store = allValues
    },
    noselects() {
      this.condition.store = []
    },
    selectallm() {
      const allValues = []
      for (const item of this.member) {
        allValues.push(item.username)
      }
      this.condition.member = allValues
    },
    noselectm() {
      this.condition.member = []
    },
    selectalld() {
      const allValues = []
      for (const item of this.department) {
        allValues.push(item.department)
      }
      this.condition.department = allValues
      this.member = this.allMember
    },
    noselectd() {
      this.condition.department = []
      this.member = this.allMember
    },
    selectall() {
      const allValues = []
      for (const item of this.account) {
        allValues.push(item.id)
      }
      this.condition.account = allValues
    },
    noselect() {
      this.condition.account = []
    },
    choosed() {
      let res = []
      const val = this.condition.department
      res = this.allMember
      let per = []
      this.member = []
      this.condition.member = []
      if (val != '') {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele => ele.department == val[i] && ele.position == '销售'
          )
          this.member = this.member.concat(per)
        }
      } else {
        this.member = res
      }
    },
    handleChange() {
      this.show = !this.show
      this.isA = !this.isA
      if (this.show === false) {
        this.text = '显示输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height + 200 + 'px'
      } else if (this.show === true) {
        this.text = '隐藏输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height + 100 + 'px'
      }
    },
    changeActive() {
      this.show1 = true
    },
    removeActive() {
      this.show1 = false
    },
    onSubmit(form) {
      const myform = JSON.parse(JSON.stringify(form))
      const height = document.getElementById('app').clientHeight
      this.tableHeight = height + 100 + 'px'
      this.show2 = true
      this.$refs.condition.validate(valid => {
        if (valid) {
          if (myform.member.length === 0) {
            const val = form.department
            const res = this.allMember
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === '销售'
              )
              this.member.concat(per)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          }
          this.listLoading = true
          getaccount(myform).then(response => {
            this.listLoading = false
            this.tableData = this.searchTable = response.data.data
            this.total = this.tableData.length
          })
        } else {
          return false
        }
      })
    },
    // 搜索
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      const data = this.searchTable
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            )
          })
        })
      } else {
        this.tableData = data
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableData
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    },
    // 小数和空值格式化
    empty(row, column, cellValue, index) {
      row.SaleMoneyRmb = Math.round(row.SaleMoneyRmb * 100) / 100
      row.ProfitRmb = Math.round(row.ProfitRmb * 100) / 100
      row.rate = Math.round(row.rate * 100) / 100
      if (cellValue == '0') {
        return cellValue
      } else {
        return cellValue || '--'
      }
    },
    // 导出
    exportExcel() {
      const th = [
        '卖家简称',
        '平台',
        '销售员',
        '商品编码',
        '商品名称',
        '开发员',
        '销量',
        '销售额￥',
        '利润￥',
        '利润率%',
        ''
      ]
      const filterVal = [
        'rowId',
        'pingtai',
        'salesman',
        'GoodsCode',
        'GoodsName',
        'SalerName',
        'SKUQty',
        'SaleMoneyRmb',
        'ProfitRmb',
        'rate'
      ]
      const Filename = '账号产品利润表';
      const data = this.tableData.map(v => filterVal.map(k => v[k]))
      const [fileName, fileType, sheetName] = [Filename, 'xls']
      this.$toExcel({ th, data, fileName, fileType, sheetName })
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      const fileds = columns.map(item => item.property)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : 'unkonwn')
        )
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = Math.round(sums[index] * 100) / 100
        } else {
          sums[index] = 'N/A'
        }
      })
      // 退款率和利润率核算
      sums[fileds.indexOf('rate')] =
        Math.round(
          (sums[fileds.indexOf('ProfitRmb')] * 10000) /
            sums[fileds.indexOf('SaleMoneyRmb')]
        ) / 100
      return sums
    }
  },
  mounted() {
    getSection().then(response => {
      this.department = response.data.data
    })
    getPlatform().then(response => {
      this.plat = response.data.data
    })
    getMember().then(response => {
      const res = response.data.data
      this.allMember = this.member = res.filter(ele => ele.position === '销售')
    })
    getStore().then(response => {
      this.store = response.data.data
    })
    getAccount().then(response => {
      this.account = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 2rem;
  .el-form-item {
    margin-bottom: 0rem;
    .el-form-item__content {
      .el-date-editor--daterange {
        width: 18rem;
        .el-range-input {
          width: 100%;
        }
      }
    }
  }
}
.el-select-dropdown {
  .el-button--info.is-plain {
    width: 50%;
    padding: 0.5rem 1rem;
    font-size: 12px;
    line-height: 1.5;
    margin-left: 0;
    float: left;
    border-radius: 0 !important;
    color: #333;
    background-color: #fff;
  }
  .el-button:hover {
    color: #333;
    background-color: #ebebeb;
    border-color: #adadad;
  }
}
</style>

