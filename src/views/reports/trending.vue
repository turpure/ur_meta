<template>
    <!-- <div>销售额走势</div>     -->
<el-form  :model="conditionForm" :inline="true" ref="conditionForm" label-width="100px" class="demo-form-inline">
  <el-form-item label="时间类型"  class="input" >
    <el-select v-model="formInline.region" placeholder="按天">
      <el-option label="按天" value="shanghai"></el-option>
      <el-option label="按月" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label="部门" class="input">
    <el-select v-model="value5" multiple placeholder="部门">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="平台" class="input">
    <el-select v-model="value5" multiple placeholder="平台">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="销售员" class="input">
    <el-select v-model="value5" multiple placeholder="销售员">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="发货时间" class="input">
    <el-select v-model="formInline.region" placeholder="发货时间">
      <el-option label="发货时间" value="shanghai"></el-option>
      <el-option label="交易时间" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="日期" class="input">
       <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="开始日期至结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
    </el-form-item>    
    <el-form-item label="账号" class="input" >
          <el-select v-model="accounty.region" placeholder="账号">
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
import { getSection,getPlatform,getMember,getAccount } from '../../api/profit'

  export default {
    data() {
      return {
        section:[],
        platform:[],
        member:[],
        account:[],
        formInline: {
          user: '',
          region: ''
        },
        accounty:{
          user: '',
          region: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
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
        date: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      var access_token = getMyToken();
      getSection(access_token).then(response=>{
          this.section = response.data
      })
      getPlatform(access_token).then(response=>{
          this.platform = response.data
      })
      getMember(access_token).then(response=>{
          this.member = response.data
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
