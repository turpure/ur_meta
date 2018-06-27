<template>
    <!-- <div>销售毛利润报表</div>     -->
    <div>
    <el-form :model="conditionForm" :inline="true" ref="conditionForm" class="demo-form-inline">
       <el-form-item   label="部门"  class="input" >
        <el-select v-model="conditionForm.department" placeholder="部门">
          <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台"  class="input" >
        <el-select v-model="conditionForm.plat" placeholder="平台">
          <el-option  v-for="(item,index) in plat" :index="index" :key="item.plat" :label="item.plat" :value="item.plat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员" class="input" >
        <el-select v-model="conditionForm.member" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出货仓库" class="input">
        <el-select v-model="conditionForm.store" multiple collapse-tags placeholder="请选择">
            <el-option v-for="(item,index) in store" :index="index" :key="item.store" :label="item.store" :value="item.store">
            </el-option>
        </el-select>  
      </el-form-item>
    
      <el-form-item label="" class="input">
        <el-select v-model="conditionForm.dateType" placeholder="发货时间" style="margin-left:40px">
          <el-option v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item  class="input">
           <el-date-picker
              v-model="conditionForm.dateRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2" style="margin-left:40px">
            </el-date-picker>
        </el-form-item>    
        <el-form-item label="账号" class="input" >
          <el-select v-model="conditionForm.account" multiple collapse-tags placeholder="账号" style="margin-left:12px">
            <el-option v-for="(item,index) in account"  :index="item[index]" :key="item.store" :label="item.store" :value="item.store"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit(conditionForm)">查询</el-button>
      </el-form-item> 
    </el-form>
    <el-button type="default"  @click="exportExcel">导出Excel</el-button>
 <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary  :summary-method="getSummaries" height="768"  style="width: 100%">
      <el-table-column prop="pingtai" label="平台" sortable ></el-table-column>
      <el-table-column prop="suffix" label="账号" sortable ></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable="custom"></el-table-column>
      <el-table-column prop="salemoney" label="成交价$" sortable="custom"></el-table-column>
      <el-table-column prop="salemoneyzn" label="成交价￥" sortable="custom"></el-table-column>
      <el-table-column prop="ebayFeeebay" label="eBay成交费$" sortable="custom"></el-table-column>
      <el-table-column prop="ebayfeeznebay" label="eBay成交费￥" sortable="custom"></el-table-column>
      <el-table-column prop="ppFee" label="PP成交费$" sortable="custom"></el-table-column>
      <el-table-column prop="ppFeezn" label="PP成交费￥" sortable="custom"></el-table-column>
      <el-table-column prop="costmoney" label="商品成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="expressFare" label="运费成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="inpackagemoney" label="包装成本￥" sortable="custom"></el-table-column>
      <el-table-column prop="storename" label="发货仓库" sortable="custom"></el-table-column>
      <el-table-column prop="refund" label="退款金额￥" sortable="custom"></el-table-column>
      <el-table-column prop="refundrate" label="退款率%" sortable="custom"></el-table-column>
      <el-table-column prop="diefeeZn" label="死库处理￥" sortable="custom"></el-table-column>
      <el-table-column prop="insertionFee" label="店铺杂费￥" sortable="custom"></el-table-column>
      <el-table-column prop="saleOpeFeeZn" label="运营杂费￥" sortable="custom"></el-table-column>
      <el-table-column prop="grossprofit" label="毛利￥" sortable="custom"></el-table-column>
      <el-table-column prop="grossprofitRate" label="毛利率%" sortable="custom"></el-table-column>
    </el-table>
    </div>
</template>

<script>
import {
  getSection,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getSales
} from "../../api/profit"
import {compareUp, compareDown} from "../../api/tools"
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      department: [],
      plat: [],
      member: [],
      store: [{ id: 1, store: "中国仓" }, { id: 2, store: "海外仓" }],
      dateType: [{ id: 0, type: "发货时间" }, { id: 1, type: "交易时间" }],
      dateRange: [],
      account: [],
      conditionForm: {
        department: "",
        plat: "",
        member: "",
        store: "",
        dateType: "",
        dateRange: "",
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.listLoading = true;
      getSales(form).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data;
      });
    },
    //格式化数据
    formatter(row, column) {
        return parseFloat(row.salemoneyzn);
      },

    //数字排序
    sortNumber(column, prop, order) {
      console.log(column);
      let data = this .tableData;
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop));
      }
      else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }

    },
    //导出
     exportExcel () {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#sale-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //  return wbout
     },
    //合计
     getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = Math.round(sums[index]*100)/100;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    getSection().then(response => {
      this.department = response.data.data;
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
    getMember().then(response => {
      this.member = response.data.data;
    });
    getStore().then(response => {
      this.options = response.dataget;
    });
    getAccount().then(response => {
      this.account = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.input {
  margin-left: 100px;
  .input_w {
    width: 350px;
  }
}
</style>

