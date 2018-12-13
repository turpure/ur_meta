<template>
  <section>
  <el-col :span="24" style="padding:10px 20px;">
    <el-button type="primary" plain @click='dialogVisible=true'>新增产品</el-button>
    <!-- <el-button type="primary">批量导入</el-button> -->
    <el-button type="danger" @click="delAll">批量删除</el-button>
    <el-button type="success">下载模板</el-button>
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
        <el-select size="small" v-model="addForm.subCate" :disabled="disabled" style="width:100%;">
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
    <el-form :model="viewForm" label-width="100px" ref="viewForm">
      <el-form-item label="图片" prop="img">
        <span>{{viewForm.img}}</span>
      </el-form-item>
      <el-form-item label="主类目" prop="cate">
        <span>{{viewForm.cate}}</span>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate">
        <span>{{viewForm.subCate}}</span>
      </el-form-item>
      <el-form-item label="供应商链接" prop="vendor1">
        <span>{{viewForm.vendor1}}</span>
      </el-form-item>
      <el-form-item label="平台参考链接" prop="origin1">
        <span>{{viewForm.origin1}}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 更新对话框 -->
  <el-dialog title='更新' :visible.sync="dialogVisibleEdit">
    <el-form :model="editForm" label-width="100px" ref="editForm">
      <el-form-item label="图片" prop="img">
        <el-input v-model="editForm.img"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop="cate">
        <el-select size="small" v-model="editForm.cate" @change="productcategory" style="width:100%;">
          <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate">
        <el-select size="small" v-model="editForm.subCate" :disabled="disabled" style="width:100%;">
          <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop="introducer">
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
  <el-dialog title='认领' :visible.sync="dialogVisibleClaim">
    <el-select v-model="claimForm.devStatus" placeholder="认领到" size="small" style="width:100%;">
      <el-option value="正向认领"></el-option>
      <el-option value="逆向认领"></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitClaim">确定</el-button>
    </span>
  </el-dialog>
  <el-table :data="tableData" @selection-change="selsChange" style="width: 100%;">
    <el-table-column type="selection" header-align="center">
    </el-table-column>
    <el-table-column type="index" header-align="center">
    </el-table-column>
    <el-table-column label="操作" header-align="center" width="100">
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
    <el-table-column prop="img" label="图片" header-align="center">
    </el-table-column>
    <el-table-column label="主类目" header-align="center">
      <el-table-column prop="cate" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="子类目" header-align="center">
      <el-table-column prop="subCate" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="供应商链接" header-align="center">
      <el-table-column prop="vendor1" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="平台参考链接" header-align="center">
      <el-table-column prop="origin1" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="开发员" header-align="center">
      <el-table-column prop="developer" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐人" header-align="center">
      <el-table-column prop="introducer" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐理由" header-align="center">
      <el-table-column prop="introReason" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="产品状态" header-align="center">
      <el-table-column prop="checkStatus" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="审批备注" header-align="center">
      <el-table-column prop="approvalNote" :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="创建时间" header-align="center">
      <el-table-column prop="createDate" :render-header="renderHeader" width='200'>
      </el-table-column>
    </el-table-column>
    <el-table-column label="更新时间" header-align="center">
      <el-table-column prop="updateDate" :render-header="renderHeader" width='200'>
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
      editForm: {},
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
            { required: true, message: '主类目不能为空', trigger: 'change' }
          ],
          cateChildren: [
            { required: true, message: '子类目不能为空', trigger: 'change' }
          ],
          cateDevelop: [
            { required: true, message: '开发员不能为空', trigger: 'change' }
          ],
        },
      dialogVisible:false,
      input: '',
      value: '',
      time:[],
      options: ['1','2'],
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
    },
    submitEdit() {
      goodsUpdate(this.editForm).then(res => {
        this.dialogVisibleEdit = false
        this.getData()
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
      console.log(row.nid)
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
    getData() {
      goodsList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
    },
    // 新增
    submitForm(){
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
        }else{
          console.log('error submit!!')
          return false
        }
      })
    },
    //过滤，搜索
    renderHeader(h,{column, $index}){
      let filters = [ {text:'全部1','value':"1"} , {text:'全部2','value':"2"} , {text:'全部3','value':"3"} ]
      if($index === 0 || $index === 7) {
      return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.value,
            size:'mini',
          },
          on:{
            input:value=>{
              this.value=value
              this.$emit('input', value)
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.text
              }
            });
          })
        ])
      } else if($index === 9 || $index === 10){
        return h('el-date-picker',{
          props:{
            placeholder:'请选择',
            value:this.time,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'185px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time=value
              this.$emit('input', value)
              console.log(this.time)
            }
          }
        })
      }
      else {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              placeholder:'',
              value:'',
              size:'mini',
            },
            on:{
              input:value=>{
                this.$emit('input', value);
              }
            }
          })
        ])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  margin-left: 0px;
}
</style>
