<template>
  <div class="dashboard-editor-container" style="height: 1000px;">
    <section>
      <div class="left-box"> 
        <div class="tabs-container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in permission" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
          </el-tabs>
        </div>
        <div class='table-container'>
          <el-table
          :data="shanghaiTable"
          size="small"
          height="865"
          ref="table1"
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
            <el-table-column prop="primaryRate" width="150" label="初级目标完成度" sortable="custom" >
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'primaryRate')" :percentage="Math.round(scope.row.primaryRate*10000)/100"></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="highRate" width="150" label="高级目标完成度" sortable="custom">
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
          height="865"
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
          height="865"
          v-show="show.depart"
          @sort-change="sortNumber">
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
          <el-table :data="developerTable" height="865" size="small" v-show="show.developer">
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
      </div>
        <el-card class="box-card">
          <ul>
            <li v-for="(item, index) in newsTopList" :key="index">
              <div class="post-left-box">
                <div class="subtitle">
                  <h2 @click="dialogTopShow(item.id)">{{item.title}}
                    <!-- <a :href=item.detail target="_blank">{{item.detail}}
                    </a> -->
                  </h2>
                  <p style="color:#b2b2b2;">{{item.creator}} &nbsp;&nbsp;| &nbsp;&nbsp;{{item.createDate.substring(0, 16)}}</p>
                </div>
              </div>
              <div class="post-right-box">
                <el-button type="text" slot="reference" style="padding:0px;">
                  <el-badge value="顶"></el-badge>
                </el-button>
              </div>
            </li>
            <li v-for="item in news.slice(0, 9)" :key="item.id">
              <div class="post-left-box">
                <div class="subtitle">
                  <h2 @click="dialogShow(item.id)">
                    {{item.title}}
                  </h2>
                  <p style="color:#b2b2b2;">{{item.creator}} &nbsp;&nbsp;| &nbsp;&nbsp;{{item.createDate.substring(0, 16)}}</p>
                </div>
              </div>
              <div class="post-right-box">
                <el-button type="text" @click="handleTop(item.id)" slot="reference" style="padding:0px;">
                  <i>⇧</i>
                </el-button>
              </div>
            </li>
          </ul>
        </el-card>
        <el-dialog title="详情" :visible.sync="dialogVisible">
          <span v-for="(item, index) in newsDetailList" :key="index">
            <a :href="item.detail" target="_blank">{{item.detail}}</a>
            {{item.detail}}
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </section>
  </div>
</template>

<script>
import { IndexPermission, ShangHaiTarget, ZhengZhouTarget, DepartTarget, DeveloperTarget, news, newsTop } from '../api/api'
import { compareUp, compareDown } from '../api/tools'

export default {
  data() {
    return {
      dialogVisible: false,
      data: {
        id: '',
        isTop: '1'
      },
      newsData: {
        page: 1,
        pageSize: 10
      },
      newsTopList: [],
      newsDetailList: {},
      news: [],
      newsList: [],
      tableHeight: null,
      screenHeight: window.innerHeight,
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
    dialogTopShow(id) {
      this.dialogVisible = true
      this.newsDetailList = this.newsTopList.filter(e => e.id === id)
    },
    dialogShow(id) {
      this.dialogVisible = true
      this.newsDetailList = this.news.filter(e => e.id === id)
    },
    handleTop(id) {
      this.data.id = id
      newsTop(this.data).then(res => {
        news(this.newsData).then(res => {
          this.newsList = res.data.data.items
        })
      })
    },
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
    news(this.newsData).then(res => {
      const ret = res.data.data.items
      this.newsList = ret
      this.newsTopList = ret.filter(e => e.isTop === 1)
      this.news = ret.filter(e => e.isTop === 0)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.left-box{
  width: 69%;
  float: left;
  margin-top:3%;
  height: 900px;
}
.box-card{
  width: 30%;
  height: 900px;
  overflow-y: scroll;
  float: right;
  margin-top:3%;
  .post-left-box{
    position: relative;
    float: left;
    //width: 400px;
  }
  .post-right-box{
    position: relative;
    float: right;
    margin-top: 20px;
    margin-right: 10px;
    i{
      margin-right: 5px;
      font-style: normal;
      font-size: 24px;
    }
    i:hover{
      color: red;
    }
  }
  li{
    list-style: none;
    border-bottom: 1px solid #eee;
    transition: all .3s;
    height: 100px;
  }
}
a {
  color: #428bac;
  text-decoration: none;
}
a:hover {
  color: #2a6496;
  text-decoration: underline;
}
h2:hover {
  color: #1ebbf0;
}
.dashboard-editor-container {
  padding: 0 30px;
  background-color: #f0f2f5;
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
</style>