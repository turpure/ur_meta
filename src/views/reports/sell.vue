<template>
    <!-- <div>销售毛利润报表</div>     -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item   label="部门"  class="input" >
        <el-select v-model="departmentValue.region" placeholder="部门">
          <el-option v-for="(item,index) in department" :index="index" :key="item.id" :label="item.department" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台"  class="input" >
        <el-select v-model="platValue.region" placeholder="平台">
          <el-option  v-for="(item,index) in plat" :index="index" :key="item.id" :label="item.plat" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员" class="input" >
        <el-select v-model="memberValue.region" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="index" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出货仓库" class="input">
        <el-select v-model="storeValue.region" multiple collapse-tags placeholder="请选择">
            <el-option v-for="(item,index) in store" :index="index" :key="item.id" :label="item.store" :value="item.id">
            </el-option>
        </el-select>  
      </el-form-item>
    
      <el-form-item label="" class="input">
        <el-select v-model="dateTypeValue.region" placeholder="发货时间" style="margin-left:40px">
          <el-option v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item  class="input">
           <el-date-picker
              v-model="dateRangeValue.region"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="开始日期至结束日期"
              :picker-options="pickerOptions2" style="margin-left:40px">
            </el-date-picker>
        </el-form-item>    
        <el-form-item label="账号" class="input" >
          <el-select v-model="accountValue.region" multiple collapse-tags placeholder="账号" style="margin-left:12px">
            <el-option v-for="(item,index) in account"  :index="item[index]" :key="item.id" :label="item.store" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item> 
    </el-form>

</template>

<script>
import { getSection,getPlatform,getMember,getStore,getAccount } from '../../api/profit'

  export default {
    data() {
      return {
        department:[],
        plat:[],
        member:[],
        store: [{'id':1,'store':'中国仓'},{'id':2,'store':'海外仓'}],
        dateType: [{'id':1,'type':'发货时间'},{'id':2,'type':'交易时间'}],
        dateRange: [],
        account:[],
        departmentValue: {
          id:'',
          region: ''
        },
        platValue: {
          id:'',
          region: ''
        },
        memberValue: {
          id:'',
          region: ''
        },
        accountValue:{
          id:'',
          region: ''
        },
        storeValue:{
          id:'',
          region: ''
        },
        dateRangeValue:{
          id:'',
          region: ''
        },
        dateTypeValue:{
          id:'',
          region: ''
        },
        options: [{
          value: '',
          label: ''
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value5: [],
        // value11: [],
        value7: ''
      }
    },
    methods: {
      onSubmit() {
        alert('submit!');
      },
      //折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
    },
    mounted(){
      getSection().then(response=>{
          this.department = response.data.data
      })
      getPlatform().then(response=>{
          this.plat = response.data.data
      })
      getMember().then(response=>{
          this.member = response.data.data
      })
      getStore().then(response=>{
          this.options = response.dataget 
      })
      getAccount().then(response=>{
          this.account = response.data.data
      })
    }
  }
</script>

<style lang="scss" scoped>
 .input{
     margin-left: 100px;
     .input_w{
         width:350px
     }
 }

</style>
