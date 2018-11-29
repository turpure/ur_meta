<template>
  <div class="dashboard-editor-container" style="min-height:1000px;">
    <section>
      <el-card class="box-card">
        <ol style="font-size:18px;">
          <el-popover placement="bottom" trigger="click">
            <el-table :data="gridData">
              <el-table-column width="300" property="date" label="日期"></el-table-column>
              <el-table-column width="250" property="name" label="发布人"></el-table-column>
            </el-table>
            <el-button type="text" slot="reference" style="padding:0px;">
              <li style="font-size:18px;">2018-11-28 毕郑强 侵权:
                <a href="https://sellerdefense.cn/" target="_blank">https://sellerdefense.cn/
                </a>
                <el-badge value="顶"></el-badge>
              </li>
            </el-button>
          </el-popover>
        </ol>
      </el-card>
      <div class="tabs-container">
        <el-tabs v-model="activeName"  @tab-click="handleClick" style="margin-top:2%">
          <el-tab-pane v-for="(item,index) in permission" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class='table-container'>
        <el-table
          :data="shanghaiTable"
          size="small"
          max-height="535"
          v-if="show.shanghai"
          v-scrollBar:slim
          @sort-change="sortNumber"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="depart"  label="部门" sortable></el-table-column>
          <el-table-column prop="username"  label="姓名" sortable></el-table-column>
          <el-table-column prop="role"  label="角色"></el-table-column>
          <el-table-column prop="primary" label="初级目标(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="high" label="高级目标(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="amt" label="毛利润(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="primaryRate"  label="初级目标完成度" sortable="custom" >
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="highRate"  label="高级目标完成度" sortable="custom">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
            </template> 
          </el-table-column>
          <el-table-column prop="dateRate" label="时间进度" >
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" label="统计截止日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{dateFormatter(scope.row.updatetime)}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="zhengzhouTable"
          @sort-change="sortNumber"
          size="small"
          max-height="535"
          v-show="show.zhengzhou"
        >
          <el-table-column type="index" ></el-table-column>
          <el-table-column prop="depart" label="部门" ></el-table-column>
          <el-table-column prop="username"  label="姓名" sortable></el-table-column>
          <el-table-column prop="role"  label="角色"></el-table-column>
          <el-table-column prop="high"  label="目标" sortable="custom"></el-table-column>
          <el-table-column prop="amt"  label="毛利润(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="highRate"  label="目标完成度" sortable="custom" >
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
            </template> 
          </el-table-column>
          <el-table-column prop="dateRate"  label="时间进度">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" label="统计截止日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ dateFormatter(scope.row.updatetime) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
        :data="departTable"
        size="small"
        max-height="535"
        v-show="show.depart"
        @sort-change="sortNumber"
        style="width:100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="depart" label="部门" sortable></el-table-column>
          <el-table-column prop="primary" label="初级目标(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="high" label="高级目标(￥)" sortable="custom">
          </el-table-column>
          <el-table-column prop="amt" label="毛利润(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="primaryRate" label="初级目标完成度" sortable="custom">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="highRate" label="高级目标完成度" sortable="custom">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
            </template> 
          </el-table-column>
          <el-table-column prop="dateRate" label="时间进度">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" label="统计截止日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ dateFormatter(scope.row.updatetime) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="developerTable" max-height="535" size="small" v-show="show.developer" style="width:100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="depart"  label="部门" sortable></el-table-column>
          <el-table-column prop="username"  label="姓名" sortable></el-table-column>
          <el-table-column prop="role"  label="角色"></el-table-column>
          <el-table-column prop="primary" label="初级目标(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="high" label="高级目标(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="amt" label="毛利润(￥)" sortable="custom"></el-table-column>
          <el-table-column prop="primaryRate" label="初级目标完成度" sortable="custom">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="highRate"  label="高级目标完成度" sortable="custom">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'highRate')" :percentage="Math.round(scope.row.highRate*10000)/100"></el-progress>
            </template> 
          </el-table-column>
          <el-table-column prop="dateRate" label="时间进度" >
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" label="统计截止日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{dateFormatter(scope.row.updatetime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
import { IndexPermission, ShangHaiTarget, ZhengZhouTarget, DepartTarget, DeveloperTarget } from '../api/api'
import { compareUp, compareDown } from '../api/tools'

export default {
  data() {
    return {
      gridData: [{
        date: '2018-11-28',
        name: '毕郑强'
      }],
      permission: [],
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      activeName: '',
      show: {
        shanghai: false,
        zhengzhou: false,
        depart: false,
        developer: false
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      for (const ele in this.show) {
        if (ele === tab.name) {
          this.show[ele] = true
        } else {
          this.show[ele] = false
        }
      }
    },
    dateFormatter(date) {
      const previous = new Date(date)
      previous.setDate(previous.getDate() - 1)
      return previous.toJSON().substring(0, 10)
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const tableName = this.activeName + 'Table'
      const data = this[tableName]
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    },
    checkStatus(row, prop) {
      if (row[prop] < row.dateRate) {
        return 'exception'
      }
      return 'success'
    }
  },
  mounted() {
    ShangHaiTarget().then((res) => {
      this.shanghaiTable = res.data.data
    })
    ZhengZhouTarget().then((res) => {
      this.zhengzhouTable = res.data.data
    })
    DepartTarget().then((res) => {
      this.departTable = res.data.data
    })
    DeveloperTarget().then((res) => {
      this.developerTable = res.data.data
    })
    IndexPermission().then((res) => {
      const ret = res.data.data
      this.permission = ret
      this.activeName = ret[0].name
      this.show[this.activeName] = true
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 30px;
  background-color: rgb(240, 242, 245);
  zoom:0.9;
}
.table-container {
  background-color: #FFFFFF;
}
.tabs-container {
  background-color:#FFFFFF;
}
.text {
  font-size: 18px;
}
.box-card{
  //margin-top: 5px;
  margin-bottom: -30px;
}
a {
  color: #428bac;
  text-decoration: none;
}
a:hover {
  color: #2a6496;
  text-decoration: underline;
}
</style>