<template>
  <div>
    <el-form :model='condition'
             :inline='true'
             label-width='100px'
             style="padding:10px 0 0 8px;"
             class='demo-form-inline toolbar'>
      <el-form-item label='美工1'
                    class='input'>
        <el-select size="small"
                   style="width:220px;" 
                   v-model='condition.possessMan1'
                   clearable>
          <el-option v-for='item in possessMan1'
                     :key='item.username'
                     :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='美工2'
                    class='input'>
        <el-select size="small"
                   style="width:220px;"  
                   v-model='condition.possessMan2'
                   clearable>
          <el-option v-for='item in possessMan2'
                     :key='item.username'
                     :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='商品关键字'
                    class='input'>
        <el-input size="small"
                  style="width:220px;" 
                  v-model='condition.goodsName'
                  placeholder="多个关键字用逗号隔开">
        </el-input>
      </el-form-item>
      <el-form-item label='产品分类1'
                    class='input'>
        <el-select size="small"
                  style="width:220px;" 
                   v-model='condition.categoryParentName'
                   clearable
                   @change="productcategory">
          <el-option v-for='item in ParentName'
                     :key='item.CategoryName'
                     :value='item.CategoryName'
                     :label="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='产品分类2'
                    class='input'>
        <el-select size="small"
                  style="width:220px;" 
                   v-model='condition.categoryName'
                   clearable
                   :disabled="disabled">
          <el-option v-for='item in categoryName'
                     :key='item.CategoryName'
                     :value='item.CategoryName'
                     :label="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='供应商关键字'
                    class='input'>
        <el-input size="small"
                  style="width:220px;" 
                  v-model='condition.supplierName'
                  placeholder="供应商名称关键字">
        </el-input>
      </el-form-item>
      <el-form-item label='产品状态'
                    class='input'>
        <el-select size="small"
                   multiple
                   collapse-tags 
                   style="width:220px;"  
                   v-model='condition.goodsSkuStatus'
                   clearable>
          <el-option v-for='item in goodsSkuStatus'
                     :key='item'
                     :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='开发'
                    class='input'>
        <el-select size="small"
                   style="width:220px;"  
                   v-model='condition.salerName'
                   clearable>
          <el-option v-for='item in salerName'
                     :key='item.username'
                     :value='item.username'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='日期'>
        <el-date-picker size="small"
                        style="width:220px"
                        v-model='dateRange'
                        type='daterange'
                        value-format='yyyy-MM-dd'
                        align='right'
                        unlink-panels
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        :picker-options='pickerOptions2'>
        </el-date-picker>
      </el-form-item>
      <el-form-item class='input'
                    style="margin-left:1.5rem">
        <el-button size="small"
                   type="primary"
                   @click="onSubmit(condition)">搜索</el-button>
      </el-form-item>
    </el-form>
    <div v-loading="listLoading"
         element-loading-text="正在加载中...">
      <el-row>
        <div 
                class="mix"
                v-for="item in this.tableData"
                :key="item.rowId">
          <div class="mix-inner">
            <a :href="item.LinkUrl"
               target="_blank"
               class="a100"
               style="text-decoration:none;">
              <img :src=item.BmpFileName
                   :alt='item.GoodsName+item.GoodsSKUStatus'>
            </a>
            <p>
              <font color="black">
                &nbsp;{{item.GoodsCode}}&nbsp;{{item.CategoryParentName}}&nbsp;{{item.CategoryName}}
              </font>
              <br>
              <font color="black">
                &nbsp;{{item.developer}}
              </font>
            </p>
            <font color="black">&nbsp;{{item.GoodsName}}&nbsp;&nbsp;&nbsp;{{item.GoodsSKUStatus}}</font>
          </div>
        </div>
      </el-row>
      <el-col :span="24"
              class="toolbar posbottom"
              v-show="total>0">
        <div class="pagination-container">
          <el-pagination background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="condition.page"
                         :page-sizes="[50, 100, 500,1000,this.total]"
                         :page-size="condition.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import {
  getGoodspicture,
  getGoodsstatus,
  getGoodscats,
  getUsers
} from '../../api/profit'
export default {
  data() {
    return {
      dateRange: [],
      category: [],
      total: null,
      disabled: true,
      listLoading: false,
      tableData: [],
      salerName: [],
      possessMan1: [],
      possessMan2: [],
      beginDate: '',
      endDate: '',
      goodsName: '',
      supplierName: '',
      goodsSkuStatus: [],
      categoryParentName: [],
      ParentName: [],
      categoryName: [],
      condition: {
        salerName: '',
        possessMan1: '',
        possessMan2: '',
        beginDate: '',
        endDate: '',
        goodsName: '',
        supplierName: '',
        goodsSkuStatus: [],
        categoryParentName: '',
        categoryName: '',
        page: 1,
        pageSize: 50
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
              let sd = start.getDate()
              if (sm < 10) {
                sm = '0' + sm
              }
              if (sd < 10) {
                sd = '0' + sd
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
    onSubmit() {
      this.getData()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    productcategory() {
      if (this.condition.categoryParentName !== '') {
        this.disabled = false
        const val = this.condition.categoryParentName
        const res = this.category
        this.categoryName = res.filter(e => e.CategoryParentName === val)
      } else if (this.condition.categoryParentName === '') {
        this.condition.categoryName = ''
        this.disabled = true
      }
    },
    getData() {
      this.listLoading = true
      this.condition.beginDate = this.dateRange[0]
      this.condition.endDate = this.dateRange[1]
      getGoodspicture(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = response.data.data._meta.totalCount
        this.condition.page = response.data.data._meta.currentPage
        this.condition.pageSize = response.data.data._meta.perPage
      })
    }
  },
  mounted() {
    getGoodsstatus().then(response => {
      this.goodsSkuStatus = response.data.data
    })
    getGoodscats().then(response => {
      this.category = response.data.data
      this.ParentName = this.category.filter(
        e => e.CategoryParentName === '全部类别'
      )
    })
    getUsers().then(response => {
      const possessMan = response.data.data
      this.possessMan1 = this.possessMan2 = possessMan.filter(
        e => e.position === '美工'
      )
      this.salerName = possessMan.filter(e => e.position === '开发')
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
  }
}
.el-row {
  max-height: 65rem;
  overflow: auto;
  margin-bottom: 30px;
  .mix:hover {
    border-radius: 1rem;
    border: 1px solid #03c4eb;
  }
  .mix {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border: #ffffff solid 1px;
    display: inline-block;
    height: 28rem;
    width: 18.8%;
    margin-left: 0.9%;
    position: relative;
    transition: all 0.2s ease-in-out;
    margin-top: 1.5rem;
    text-align: center;
    overflow: hidden;
    .mix-inner {
      position: relative;
      width: 100%;
      img {
        max-width: 100%;
        margin-top: 10px;
        height: 17rem;
      }
    }
  }
}
.posbottom{
  position: fixed;
  bottom: 0;
}
.a100{
  display: block;
  width: 100%;
  height: 17rem;
}
</style>
