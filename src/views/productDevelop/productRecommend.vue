<template>
  <section class="toolbar">
  <el-col :span="24" style="padding:10px;">
    <el-button type="primary" plain @click='dialogVisible=true'>新增产品</el-button>
    <el-button type="primary">批量导入</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-button type="success">下载模板</el-button>
    <el-button type="warning">批量审批</el-button>
  </el-col>
  <!-- 新增对话框 -->
  <el-dialog title='新增' :visible.sync="dialogVisible">
    <el-form :model="addForm" :rules="rules" label-width="100px" class="demo-ruleForm" ref="addForm">
      <el-form-item label="图片" prop='img'>
        <el-input v-model="addForm.img" placeholder="必填"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop='cate'>
        <el-select v-model="addForm.cate" style="width:100%;">
          <el-option value="1" label="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop='cateChildren'>
        <el-select v-model="addForm.cateChildren" style="width:100%;">
          <el-option value="1" label="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop='cateDevelop'>
        <el-select v-model="addForm.cateDevelop" style="width:100%;">
          <el-option value="1" label="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商链接1" prop='url1'>
        <el-input v-model="addForm.url1"></el-input>
      </el-form-item>
      <el-form-item label="供应商链接2" prop='url2'>
        <el-input v-model="addForm.url2"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由" prop='detail'>
        <el-input v-model="addForm.detail" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click='dialogVisible=false'>取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
  <el-table :data="tableData3" style="width: 100%;">
    <el-table-column type="selection" header-align="center">
    </el-table-column>
    <el-table-column type="index" header-align="center">
    </el-table-column>
    <el-table-column prop="" label="操作" header-align="center" width="90">
      <template slot-scope="scope">
        <el-tooltip content="查看">
          <el-button type="text">
            <i class="el-icon-view"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="更新">
          <i class="el-icon-edit"></i>
        </el-tooltip>
        <el-tooltip content="删除">
          <i class="el-icon-delete"></i>
        </el-tooltip>
        <el-tooltip content="认领">
          <i class="el-icon-star-on"></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="图片" header-align="center">
    </el-table-column>
    <el-table-column prop="" label="是否备货" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="主类目" header-align="center">
      <el-table-column :render-header="renderHeader" width='210'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="子类目" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="供应商链接1" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="平台参考链接1" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="开发编号" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="开发员" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="推荐人" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="推荐理由" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="产品状态" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="审批备注" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="创建时间" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="更新时间" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="售价($)" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="预估重量(克)" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="预估利润率(%)" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="预估月销量" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="预估月毛利($)" header-align="center">
      <el-table-column :render-header="renderHeader" width='150'>
      </el-table-column>
    </el-table-column>
  </el-table>
  <div class="toolbar">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</section>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      addForm:{
        img:'',
        cate:'',
        cateChildren:'',
        cateDevelop:'',
        url1:'',
        url2:'',
        detail:''
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
      tableData3: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    submitForm(){
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          alert('submit')
          this.dialogVisible=false
        }else{
          console.log('error submit!!')
          return false
        }
      })
    },
    //过滤，搜索
    renderHeader(h,{column, $index}){
      let filters = [ {text:'全部1','value':"1"} , {text:'全部2','value':"2"} , {text:'全部3','value':"3"} ]
      if($index === 0) {
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
      } else if($index === 1){
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

</style>
