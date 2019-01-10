<template>
    <section>
        <el-row class="toolbar">
            <el-col :span="2" :offset='18'>
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span='2'>
               <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'>
               </el-input>
            </el-col>
            <el-col :span='2'>
               <el-button style='float:left' type='default' @click='exportExcel'>导出Excel
               </el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" @sort-change="sortNumber" style="width:100%">
            <el-table-column prop="suffix" label="账号简称" sortable align="center"></el-table-column>
            <el-table-column prop="username" label="销售员" sortable align="center"></el-table-column>
            <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
            <el-table-column :label="this.time1" align="center">
                <el-table-column prop="num" label="上上周销量" sortable="custom" align="center"></el-table-column>
                <el-table-column prop="amt" label="上上周销售额" sortable="custom" align="center"></el-table-column>
            </el-table-column>
            <el-table-column :label="this.time" align="center">
                <el-table-column prop="lastNum" label="上周销量" sortable="custom" align="center"></el-table-column>
                <el-table-column prop="lastAmt" label="上周销售额" sortable="custom" align="center"></el-table-column>
            </el-table-column>
            <el-table-column :label="this.time2" align="center">
                <el-table-column prop="numDiff" label="销量变化" sortable="custom" align="center"></el-table-column>
                <el-table-column prop="amtDiff" label="销售额变化" sortable="custom" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" :formatter="empty" align="center"></el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination 
                background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="this.condition.page" 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.condition.pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="this.total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import { getSalesChange } from '../../api/profit'

export default {
    data() {
        return {
            value: '',
            time: '',
            time1: '',
            time2: '',
            searchValue: '',
            total: null,
            member: [],
            account: [],
            tableDataAll: [],
            tableData: [],
            options: [{
                label: '账号简称',
                value: 'suffix'
              }, {
                label: '销售员',
                value: 'salesman'
              }, {
                label: '商品编码',
                value: 'goodsCode'
              }, {
                label: '商品名称',
                value: 'goodsName'
            }],
            condition: {
                suffix: [],
                salesman: [],
                goodsName: '',
                goodsCode: '',
                page: 1,
                pageSize: 10,
                sort: ''
            }
        }
    },
    mounted() {
        this.getData()
        this.getDataAll()
    },
    methods: {
        // 搜索
        handleSearch() {
            var searchValue = this.searchValue
            if (searchValue !== '') {
                if (this.value === 'suffix') {
                    this.condition.suffix = [searchValue]
                    this.condition.salesman = ''
                    this.condition.goodsName = ''
                    this.condition.goodsCode = ''
                } else if (this.value === 'salesman') {
                    this.condition.salesman = [searchValue]
                    this.condition.suffix = ''
                    this.condition.goodsName = ''
                    this.condition.goodsCode = ''
                } else if (this.value === 'goodsName') {
                    this.condition.goodsName = searchValue
                    this.condition.suffix = ''
                    this.condition.salesman = ''               
                    this.condition.goodsCode = ''
                } else {
                    this.condition.goodsCode = searchValue
                    this.condition.suffix = ''
                    this.condition.salesman = ''
                    this.condition.goodsName = ''
                }
                this.getData()
            } else {
                this.condition.suffix = ''
                this.condition.salesman = ''
                this.condition.goodsName = ''
                this.condition.goodsCode = ''
                this.getData()
            }
        },
        // 导出
        exportExcel() {
            const th = [
              '账号简称',
              '销售员',
              '商品编码',
              '商品名称',
              '上上周销量',
              '上上周销售额',
              '上周销量',
              '上周销售额',
              '销量变化',
              '销售额变化',
              '创建时间'
            ]
            const filterVal = [
              "suffix",
              "username",
              "goodsCode",
              "goodsName",
              "num",
              "amt",
              "lastNum",
              "lastAmt",
              "numDiff",
              "amtDiff",
              "createDate"
            ]
            const FileName = '产品销售变化表'
            const data = this.tableDataAll.map(v => filterVal.map(k => v[k]))
            const [fileName, fileType, sheetName] = [FileName, 'xls']
            this.$toExcel({ th, data, fileName, fileType, sheetName })
        },
        empty(row, column) {
            return row.createDate.substring(0, 10)
        },
        // 数字排序
        sortNumber(column, prop, order) {
            if (column.order === 'descending') {
                this.condition.sort = '-' + column.prop
                this.getData()
            } else {
                this.condition.sort = column.prop
                this.getData()
            }
        },
        handleCurrentChange(val) {
            this.condition.page = val
            this.getData()
        },
        handleSizeChange(val) {
            this.condition.pageSize = val
            this.getData()
        },
        formatTen(num) {
            return num > 9 ? (num + "") : ("0" + num)
        },
        formatDate(date) { 
            var year = date.getFullYear()
            var month = date.getMonth()
            const day = date.getDate() 
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds() 
            if (month === 0) {
                year -= 1
                month = 12    
            }
            return year + this.formatTen(month) + this.formatTen(day) 
        },
        getTm() {
            const s = this.tableData[0].createDate
            const t = Date.UTC(s.slice(0, 4), s.slice(5, 7), s.slice(8, 10))
            const t1 = new Date(t - 6 * 1000 * 3600 * 24)
            const t2 = new Date(t - 13 * 1000 * 3600 * 24)
            const t3 = new Date(t - 7 * 1000 * 3600 * 24)
            this.time = this.formatDate(t1) + '-' + s.slice(0, 10).replace(/-/g, '')
            this.time1 = this.formatDate(t2) + '-' + this.formatDate(t3)
            this.time2 = this.time + ' VS ' + this.time1
        },
        getData() {
            getSalesChange(this.condition).then(res => {
                this.tableData = res.data.data.items
                this.condition.page = res.data.data._meta.currentPage
                this.condition.pageSize = res.data.data._meta.perPage
                this.total = res.data.data._meta.totalCount
                this.getTm()
            })
        },
        getDataAll() {
            const form = Object.assign({}, this.condition)
            form.page = 1
            form.pageSize = 0
            getSalesChange(form).then(res => {
                this.tableDataAll = res.data.data.items
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

