<template>
    <!-- <div>采购毛利润报表</div>     -->
<el-form :inline="true"  class="demo-form-inline">
  
  <el-form-item label="销售员" class="input" >
        <el-select v-model="formInline.region" placeholder="销售员">
          <el-option v-for="(item,index) in member" :index="item[index]" :key="item.id" :label="item.username" :value="item.id"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>

  <el-form-item label="" class="input">
    <el-select v-model="formInline.region" placeholder="发货时间" style="margin-left:40px">
      <el-option label="发货时间" value="shanghai"></el-option>
      <el-option label="交易时间" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item  class="input">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
    </el-form-item>    
   
  <el-form-item >
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { getMyToken } from '../../api/api'
import { getSection,getMember } from '../../api/profit'

  export default {
    data() {
      return {
        member:[],
        formInline: {
          user: '',
          region: ''
        },
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
        value11: [],
        value7: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      var access_token = getMyToken();
      getMember(access_token).then(response=>{
          this.member = response.data.data
      })
    }
  }
</script>

<style lang="scss" scoped>
 .input{
     margin-left: 20px;
     .input_w{
         width:350px
     }
 }

</style>
