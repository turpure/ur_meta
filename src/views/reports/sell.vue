<template>
    <!-- <div>销售毛利润报表</div>     -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item   label="部门"  class="input" >
        <el-select v-model="formInline.region" placeholder="部门">
          <el-option v-for="(item,index) in section" :index="item[index]" :key="item.id" :label="item.department" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台"  class="input" >
        <el-select v-model="platform.region" placeholder="平台">
          <el-option  v-for="(item,index) in plat" :index="item[index]" :key="item.id" :label="item.plat" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员" class="input" >
        <el-select v-model="membery.region" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="item[index]" :key="item.id" :label="item.username" :value="item.id"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="出货仓库" class="input">
        <el-select v-model="value5" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
    
      <el-form-item label="" class="input">
        <el-select v-model="formInline.region" placeholder="发货时间" style="margin-left:40px">
          <el-option label="发货时间" ></el-option>
          <el-option label="交易时间" ></el-option>
        </el-select>
      </el-form-item>
        <el-form-item  class="input">
           <el-date-picker
              v-model="value7"
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
          <el-select v-model="accounty.region" placeholder="账号" style="margin-left:12px">
            <el-option v-for="(item,index) in account"  :index="item[index]" :key="item.id" :label="item.store" :value="item.id"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

</template>

<script>
import { getMyToken } from '../../api/api'
import { getSection,getPlatform,getMember,getStore,getAccount } from '../../api/profit'


  export default {
    data() {
      return {
        section:[],
        plat:[],
        member:[],
        value5: [],
        account:[],
        formInline: {
          id:'',
          region: ''
        },
        platform: {
          id:'',
          region: ''
        },
        membery: {
          id:'',
          region: ''
        },
        accounty:{
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
      }
    },
    mounted(){
      var access_token = getMyToken();
      getSection(access_token).then(response=>{
          this.section = response.data.data
      })
      getPlatform(access_token).then(response=>{
          this.plat = response.data.data
      })
      getMember(access_token).then(response=>{
          this.member = response.data.data
      })
      getStore(access_token).then(response=>{
          this.options = response.dataget 
      })
      getAccount(access_token).then(response=>{
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
