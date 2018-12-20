<template>
  <section class="toolbar">
  <el-col :span="24" style="padding:10px 20px;">
    <el-button plain @click='dialogVisible=true'>新增产品</el-button>
    <!-- <el-button type="primary">批量导入</el-button> -->
    <el-button plain @click="delAll">批量删除</el-button>
    <!-- <el-button plain>下载模板</el-button> -->
    <!-- <el-button type="warning">批量审批</el-button> -->
  </el-col>
  <!-- 新增对话框 -->
  <el-dialog title='新增' :visible.sync="dialogVisible">
    <el-form :model="addForm" :rules="rules" label-width="100px" class="demo-ruleForm" ref="addForm">
      <el-form-item label="图片" prop='img'>
        <el-input size="small" v-model="addForm.img" placeholder="必填"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop='cate'>
        <el-select size="small" v-model="addForm.cate" @change="productcategory" style="width:100%;">
          <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop='subCate'>
        <el-select size="small" v-model="addForm.subCate" :disabled="this.disabled" style="width:100%;">
          <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop='developer'>
        <el-select size="small" v-model="addForm.developer" style="width:100%;">
          <el-option v-for="item in developer" :value="item.username" :key="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商链接" prop='vendor1'>
        <el-input size="small" v-model="addForm.vendor1"></el-input>
      </el-form-item>
      <el-form-item label="平台参考链接" prop='origin1'>
        <el-input size="small" v-model="addForm.origin1"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由" prop='introReason'>
        <el-input size="small" v-model="addForm.introReason" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click='dialogVisible=false'>取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
  <!-- 查看对话框 -->
  <el-dialog title='查看' :visible.sync="dialogVisibleView">
    <el-form :model="viewForm" label-position="left" label-width="100px" ref="viewForm">
      <el-form-item label="图片" class="item">
        <img :src='viewForm.img' style="width: 60px;height: 50px">
      </el-form-item>
      <el-form-item label="图片地址" prop="img" class="item">
        <span>{{viewForm.img}}</span>
      </el-form-item>
      <el-form-item label="主类目" prop="cate" class="item">
        <span>{{viewForm.cate}}</span>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate" class="item">
        <span>{{viewForm.subCate}}</span>
      </el-form-item>
      <el-form-item label="供应商链接" prop="vendor1" class="item">
        <span>{{viewForm.vendor1}}</span>
      </el-form-item>
      <el-form-item label="平台参考链接" prop="origin1" class="item">
        <span>{{viewForm.origin1}}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 更新对话框 -->
  <el-dialog title='更新' :visible.sync="dialogVisibleEdit">
    <el-form :model="editForm" :rules="rules" label-width="100px" label-position="left" ref="editForm">
      <el-form-item label="图片">
        <img :src='editForm.img' style="width: 60px;height: 50px">
      </el-form-item>
      <el-form-item label="图片地址" prop="img">
        <el-input v-model="editForm.img"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop="cate">
        <el-select size="small" v-model="editForm.cate" @change="getSubcate" style="width:100%;">
          <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate">
        <el-select size="small" v-model="editForm.subCate" style="width:100%;">
          <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop="developer">
        <el-select size="small" v-model="editForm.developer" style="width:100%;">
          <el-option v-for="item in developer" :value="item.username" :key="item.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商链接">
        <el-input size="small" v-model="editForm.vendor1"></el-input>
      </el-form-item>
      <el-form-item label="平台参考链接">
        <el-input size="small" v-model="editForm.origin1"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由">
        <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitEdit">确定</el-button>
    </span>
  </el-dialog>
  <!-- 认领对话框 -->
  <el-dialog :visible.sync="dialogVisibleClaim">
    <el-form :model="claimForm" label-position="left" label-width="50px" ref="claimForm">
      <el-form-item label="认领">
        <el-select v-model="claimForm.devStatus" placeholder="认领到" size="small" style="width:90%;">
          <el-option value="正向认领"></el-option>
          <el-option value="逆向认领"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitClaim">确定</el-button>
    </span>
  </el-dialog>
  <el-table :data="tableData" @selection-change="selsChange" style="width: 97%;margin-left:20px">
    <el-table-column type="selection" fixed align="center" header-align="center">
    </el-table-column>
    <el-table-column type="index" fixed align="center" header-align="center">
    </el-table-column>
    <el-table-column label="操作" fixed header-align="center" width="100">
      <template slot-scope="scope">
        <el-tooltip content="查看">
          <el-button type="text" @click="view(scope.$index, scope.row)">
            <i class="el-icon-view"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="更新">
          <el-button type="text" @click="edit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="删除">
          <el-button type="text" @click="del(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="认领">
          <el-button type="text" @click="claim(scope.$index, scope.row)">
            <i class="el-icon-star-on"></i>
          </el-button>  
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="img" fixed label="图片" header-align="center">
      <template slot-scope="scope">
        <img :src='scope.row.img' style="width: 60px;height: 50px">
      </template>
    </el-table-column>
    <el-table-column label="主类目" header-align="center">
      <el-table-column prop="cate" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="子类目" header-align="center">
      <el-table-column prop="subCate" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="供应商链接" header-align="center">
      <el-table-column prop="vendor1" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="平台参考链接" header-align="center">
      <el-table-column prop="origin1" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="开发员" header-align="center">
      <el-table-column prop="developer" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐人" header-align="center">
      <el-table-column prop="introducer" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐理由" header-align="center">
      <el-table-column prop="introReason" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="产品状态" header-align="center">
      <el-table-column prop="checkStatus" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="审批备注" header-align="center">
      <el-table-column prop="approvalNote" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="创建时间" header-align="center">
      <el-table-column prop="createDate" :render-header="renderHeader" width='200' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="更新时间" header-align="center">
      <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
      </el-table-column>
    </el-table-column>
  </el-table>
  <div class="toolbar">
    <el-pagination
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
import { goodsList,goodsCreate, goodsDelete, goodsUpdate, goodsInfo, goodsClaim } from '../../api/product.js'
import { getMember, getGoodscats } from '../../api/profit'

export default {
  data() {
    return {
      disabled: true,
      dialogVisibleClaim: false,
      dialogVisibleEdit: false,
      dialogVisibleView: false,
      dialogVisible:false,
      condition: {
        cate: '',
        introducer: '',
        checkStatus: '',
        createDate: [],
        updateDate: [],
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: '',
        approvalNote: '',
        page: 1,
        pageSize: 10
      },
      total: null,
      sels: [],
      developer: [],
      category: [],
      cate: [],
      subCate: [],
      addForm:{
        img: '',
        cate: null,
        subCate: null,
        introducer: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: ''
      },
      viewForm: {
        nid: null,
      },
      editForm: {
        nid: null,
        img: '',
        cate: '',
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: ''
      },
      delForm: {
        nid: []
      },
      claimForm: {
        nid: null,
        devStatus: ''
      },
      rules: {
        img: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '主类目不能为空', trigger: 'blur' }
        ],
        subCate: [
          { required: true, message: '子类目不能为空', trigger: 'blur' }
        ],
        developer: [
          { required: true, message: '开发员不能为空', trigger: 'blur' }
        ],
      },
      time1: '',
      time2: '',
      tableData: []
    }
  },
  mounted() {
    this.getData()
    getMember().then(response => {
      const possessMan = response.data.data
      this.developer = possessMan.filter(e => e.position === '开发')
    })
    getGoodscats().then(response => {
      this.category = this.cate = response.data.data
    })
  },
  methods:{
    // 查看
    view(index, row) {
      this.dialogVisibleView = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    // 更新
    edit(index, row) {
      this.dialogVisibleEdit = true
      this.editForm = Object.assign({}, row)
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    submitEdit() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          goodsUpdate(this.editForm).then(res => {
            this.dialogVisibleEdit = false
            this.getData()
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 认领
    claim(index, row) {
      this.dialogVisibleClaim = true
      this.claimForm.nid = row.nid
    },
    submitClaim() {
      goodsClaim(this.claimForm).then(res => {
        this.dialogVisibleClaim = false
        this.getData()
      })
    },
    // 删除
    selsChange(sels) {
      this.sels = sels
    },
    del(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        goodsDelete(this.delForm).then(res => {
          this.tableData.splice(index, 1)
        })
      })
    },
    delAll() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定删除所选记录？', '提示', { type: 'warning' }).then(() => {
        goodsDelete(this.delForm).then(res => {
          this.getData()
        })
      })
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    // 子类目
    productcategory() {
      if (this.addForm.cate !== '') {
        this.disabled = false
        const val = this.addForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      } else if (this.addForm.cate === '') {
        this.disabled = true
      }
    },
    getSubcate() {
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    getData() {
      goodsList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
    },
    // 新增
    submitForm() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          goodsCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$confirm('成功！', '提示', { type: 'success' }).then(() => {
                this.dialogVisible=false
                this.getData()
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible=false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //过滤，搜索
    formatTen(num) {
      return num > 9 ? (num + "") : ("0" + num)
    },
    formatDate(date) { 
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate() 
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds() 
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) 
    },
    filter() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.condition.createDate = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
      } else {
        this.condition.createDate = []
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.condition.updateDate = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
      } else {
        this.condition.updateDate = []
      }
      this.getData()
      // const condition = {cate: this.value1, checkStatus: this.value2, subCate: this.input1, vendor1: this.input2, origin1: this.input3, developer: this.input4, introducer: this.input5, introReason: this.input6, approvalNote: this.input8, createDate: this.time1, updateDate: this.time2}
      // const data = this.searchTable
      // this.tableData = data.filter(item => {
      //   return Object.keys(condition).every(key=> {
      //     return (String(item[key]).toLowerCase().includes(String(condition[key]).trim().toLowerCase()))
      //   })
      // })
    },
    renderHeader(h,{column, $index}) {
      let filters = this.category
      if($index === 0) {
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition.cate,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.cate=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.CategoryName,
                label:item.CategoryName
              }
            });
          })
        ])
      } else if($index === 7){
        let filters = [ {text:'未认领','value':"未认领"} , {text:'已认领','value':"已认领"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition.checkStatus,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.checkStatus=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 9){
        return h('el-date-picker',{
          props:{
            value:this.time1,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time1=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 10) {
        return h('el-date-picker',{
          props:{
            value:this.time2,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time2=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 1){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.subCate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.subCate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 2){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.vendor1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.vendor1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 3){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.origin1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.origin1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 4){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.developer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.developer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 5){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.introducer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.introducer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 6){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.introReason,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.introReason = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.approvalNote,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.approvalNote = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      }
    }
  }
}
</script>

<style>
  .item .el-form-item__label{
    color: #F56C6C;
    margin-right: 5%;
  }
</style>

<style lang="scss" scoped>
.el-button{
  margin-left: 0px;
}
</style>
