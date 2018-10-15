<template>
  <el-row class="toolbar">
    <el-row :gutter='10'>
      <el-col :span="8">
        <span>备注：报表中商品的销量和库存指的是对应
          <font color="red">
            <big>缺货SKU</big>
          </font>的销量和库存之和
        </span>
      </el-col>
      <el-col :span='2' :offset='12'>
        <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left' type='default' @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="sale-table" :header-cell-style="thstyle" height="765" v-loading="listLoading">
      <el-table-column prop="Season" label="季节" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="goodscode" label="商品编码" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="num" label="最大延迟天数" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="delay_days" label="SKU数" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="goodsname" label="商品名" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="GoodsCodeStat" label="商品状态" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="Purchaser" label="采购人" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="SalerName" label="业绩归属人1" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="StockDays" label="采购到货天数" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="sellDays" label="预警销售天数" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100px" prop="SellCount1" label="5天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="SellCount2" label="10天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="110px" prop="SellCount3" label="20天销量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="120px" prop="factStockNum" label="实际库存量" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="120px" prop="NotInStore" label="采购未入库" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="130px" prop="hopeUseNum" label="预计可用库存" :formatter="empty" sortable></el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" v-show="filters.total>0">
      <div class="pagination-container">
        <el-pagination 
          :current-page="filters.page" 
          :page-sizes=[this.filters.total,100,200,500,1000,] 
          :page-size="filters.pageSize" 
          :total="filters.total" 
          background 
          layout="total, sizes, slot, prev, pager, next, jumper" 
          @current-change="handleCurrentChange" 
          @size-change="handleSizeChange">
          <span>
            <el-button type="text" @click="showAll">显示全部</el-button>
          </span>
        </el-pagination>
        
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getStock } from '../../api/profit'
import { compareUp, compareDown } from '../../api/tools'
export default {
  data() {
    return {
      listLoading: false,
      page: 1,
      size: 2,
      total: null,
      tableDataAll: [],
      tableData: [],
      searchTable: [],
      searchValue: '',
      filters: {
        page: 1,
        pageSize: null,
        total: null
      }
    }
  },
  methods: {
    showAll() {
      this.handleSizeChange(this.filters.total)
    },
    thstyle({ row, column, rowIndex, columnIndex }) {
      if (
        (rowIndex === 0 && columnIndex === 2) ||
        columnIndex === 13 ||
        columnIndex === 15
      ) {
        // 指定坐标
        return 'color:red'
      } else {
        return ''
      }
    },
    // 导出
    exportExcel() {
      const th = [
        '季节',
        '商品编码',
        'SKU数',
        '商品名称',
        '商品状态',
        '采购人',
        '业绩归属人',
        '采购到货天数',
        '预警销售天数',
        '5天销量',
        '10天销量',
        '20天销量',
        '实际库存量',
        '采购未入库',
        '预计可用库存'
      ]
      const filterVal = [
        'Season',
        'goodscode',
        'delay_days',
        'goodsname',
        'GoodsCodeStat',
        'Purchaser',
        'SalerName',
        'StockDays',
        'sellDays',
        'SellCount1',
        'SellCount2',
        'SellCount3',
        'factStockNum',
        'NotInStore',
        'hopeUseNum'
      ]
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month <= 9) {
        month = '0' + month
      }
      if (strDate <= 9) {
        strDate = '0' + strDate
      }
      const filename = '缺货产品表_' + year + '_' + month + '_' + strDate
      const data = this.tableDataAll.map(v => filterVal.map(k => v[k]))
      const [fileName, fileType, sheetName] = [filename, 'xls']
      this.$toExcel({ th, data, fileName, fileType, sheetName })
    },
    handleCurrentChange(val) {
      this.filters.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.filters.pageSize = val
      this.getData()
    },
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
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    },
    sortNumber(column, prop, order) {
      const data = this.tableData
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    },
    getData() {
      this.listLoading = true
      getStock(this.filters).then(response => {
        this.listLoading = false
        const res = response.data.data
        this.tableData = res.items
        this.filters.total = res._meta.totalCount
        this.filters.page = res._meta.currentPage
        this.filters.pageSize = res._meta.perPage
      })
    }
  },
  mounted() {
    this.getData()
    getStock(this.filters).then(response => {
      const res = response.data.data
      this.tableDataAll = res.items
    })
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  margin-top: 0rem;
  .el-col-2 {
    margin-bottom: 0.5rem;
  }
}
</style>

