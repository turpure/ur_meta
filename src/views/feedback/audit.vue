<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="condition">
        <el-form-item>
          <el-input v-model="condition.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="searchRequirements">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--审核列表-->
    <el-table :data="requirements" highlight-current-row :loading="listLoading" style="width: 100%;">
      <el-table-column prop="id" label="id" v-if="false"></el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" :formatter="formatter" width="140"></el-table-column>
      <el-table-column prop="creator" label="创建人" sortable></el-table-column>
      <el-table-column prop="name" label="名称" sortable>
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
          <el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类别" min-width="100" sortable>
        <template slot-scope="scope">
          <span>{{types[scope.row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="详情" min-width="180" sortable></el-table-column>
      <el-table-column prop="processingPerson" label="处理人" min-width="80" sortable></el-table-column>
      <el-table-column prop="status" label="进度" min-width="100" sortable>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>说明: {{status[scope.row.status]['hints']}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{status[scope.row.status]['name']}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleExamine(scope.$index, scope.row)">审核</el-button>
          <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="id" prop="id" v-if="false">
          <el-input v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-radio-group v-model="editForm.type">
            <el-radio class="radio" :label="0">BUG</el-radio>
            <el-radio class="radio" :label="1">新需求</el-radio>
            <el-radio class="radio" :label="2">任务</el-radio>
            <el-radio class="radio" :label="3">改进建议</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status">
            <el-radio class="radio" :label="1">Open</el-radio>
            <el-radio class="radio" :label="2">In Progress</el-radio>
            <el-radio class="radio" :label="3">Resovled</el-radio>
            <el-radio class="radio" :label="4">Reopened</el-radio>
            <el-radio class="radio" :label="5">Closed</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优先级">
          <el-rate show-text :texts='text' v-model="editForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="处理人">
          <el-checkbox-group v-model="editForm.processingPerson">
            <el-checkbox label="周朋许" name="processingPerson"></el-checkbox>
            <el-checkbox label="叶先钱" name="processingPerson"></el-checkbox>
            <el-checkbox label="朱洪涛" name="processingPerson"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="详情">
          <quill-editor v-model="mycontent"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--详情界面-->
    <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
      <el-form :model="detailForm" label-width="80px" ref="detailForm">
        <el-form-item label="名称" prop="name">
          <span>{{detailForm.name}}</span>
          <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <span>{{types[detailForm.type]}}</span>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-steps :space="100" :active=this.number finish-status="success">
            <el-step title="待审核"></el-step>
            <el-step :title='this.number<=2?"已驳回":"处理中"'></el-step>
            <el-step title="处理中"></el-step>
            <el-step title="处理中"></el-step>
            <el-step title="处理完成"></el-step>
          </el-steps>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-rate show-text disabled :texts='text' v-model="this.count" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <span>{{detailForm.creator}}</span>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <!-- 从数据库读取展示 -->
          <div v-html="str" class="ql-editor">
            {{str}}
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="detailFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="pagination-container">
        <el-pagination
         v-show="this.total>0" 
         :current-page="condition.page" 
         :page-sizes="[10,20,30,50,this.total]" 
         :page-size="condition.pageSize" 
         :total="this.total" 
         background 
         layout="total, sizes, slot, prev, pager, next, jumper" 
         @current-change="handleCurrentChange"
         @size-change="handleSizeChange">
         <el-button type="text" @click="showAll">显示全部</el-button>
        </el-pagination>
      </div>
    </el-col>
  </section>
</template>

<script>
import {
  getRequirementsExamine,
  editRequirements,
  deleteRequirements
} from '../../api/api'
export default {
  data() {
    return {
      detail: '',
      str: '',
      count: null,
      number: null,
      img: '',
      total: null,
      content: '',
      mycontent: '',
      editorOption: {},
      text: ['仅建议', '不重要不紧急', '重要不紧急', '紧急不重要', '重要且紧急'],
      condition: {
        flag: '',
        creator: '',
        detail: '',
        name: '',
        type: '',
        priority: '',
        page: 1,
        pageSize: 10
      },
      tags: {
        1: { name: '仅建议', type: '' },
        2: { name: '不重要不紧急', type: 'success' },
        3: { name: '重要不紧急', type: 'info' },
        4: { name: '紧急不重要', type: 'warning' },
        5: { name: '重要且紧急', type: 'danger' }
      },
      types: {
        0: 'BUG',
        1: '新需求',
        2: '任务',
        3: '改进建议'
      },
      status: {
        1: { name: '待审核', hints: '问题被提交,等待审核' },
        2: { name: '已驳回', hints: '问题被驳回，不予处理' },
        3: { name: '处理中', hints: '问题在处理当中，尚未完成' },
        4: { name: '处理中', hints: '问题在处理当中，尚未完成' },
        5: { name: '处理完成', hints: '问题处理结果得到确认，处于关闭状态' }
      },
      dialogVisible: false,
      requirements: [],
      detailForm: {},
      editFormVisible: false, // 编辑界面是否显示
      detailFormVisible: false,
      listLoading: false,
      editLoading: false,
      // 编辑界面数据
      editForm: {}
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor
    }
  },
  methods: {
    onEditorBlur(quill) { // 失去焦点事件
    },
    onEditorFocus(quill) { // 获得焦点事件
    },
    onEditorReady(quill) { // 准备编辑器
    },
    onEditorChange({ quill, html, text }) { // 内容改变事件
      this.content = html
      this.mycontent = html
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getRequire()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getRequire()
    },
    showAll() {
      this.handleSizeChange(this.total)
    },
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : ''
    },
    detailFormatter(row, column) {
      return row.detail.replace(/<\/?[^>]*>/g, '') ? row.detail.replace(/<\/?[^>]*>/g, '').substring(0, 100) : ''
    },
    searchRequirements() {
      this.getRequire()
    },
    editSubmit() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        this.editForm.processingPerson = this.editForm.processingPerson.join(',')
        debugger
        this.editForm.img = this.mycontent.match(/data:([^"]*)/g) || this.mycontent.match(/http:([^"]*)/g)
        this.editForm.detail = this.mycontent.replace(/data:([^"]*)/g, '')
        editRequirements(this.editForm).then(response => {
          this.editFormVisible = false
          const req = response.data.data
          this.editLoading = false
          this.requirements = this.requirements.map(ele => {
            if (parseInt(ele.id) === req.id) {
              return req
            }
            return ele
          })
        })
      })
    },
    handleExamine(index, row) {
      // this.examine.ids=[row.id]
      // Examine(this.examine).then(response => {
      //   if(response.data.code === 200) {
      //     this.exam='已审核'
      //   }else{
      //     this.exam='审核'
      //   }
      // })
    },
    handleDetail(index, row) {
      this.detailFormVisible = true
      this.detailForm = Object.assign({}, row)
      this.number = Number(this.detailForm.status)
      this.count = Number(this.detailForm.priority)
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailForm.detail = this.requirements[i].detail.replace(/""/g, this.requirements[i].img)
        }
      }
      this.str = this.escapeStringHTML(this.detailForm.detail)
    },
    handleEdit(index, row) {
      this.editFormVisible = true
      row.priority = parseInt(row.priority)
      this.editForm = Object.assign({}, row)
      this.editForm.processingPerson = this.editForm.processingPerson.split(',')
      // this.detail=this.editForm.detail.replace(/http:([^"]*)/g,'').toString()
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editForm.detail = this.requirements[i].detail.replace(/""/g, this.requirements[i].img)
        }
      }
      this.mycontent = this.editForm.detail
    },
    handleDel(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(
        () => {
          this.listLoading = true
          deleteRequirements(row.id).then(res => {
            this.listLoading = false
            this.requirements.splice(index, 1)
          })
        }
      )
    },
    getRequire() {
      getRequirementsExamine(this.condition).then(response => {
        const res = response.data.data
        this.requirements = res.items
        this.total = res._meta.totalCount
        this.condition.page = res._meta.currentPage
        this.condition.pageSize = res._meta.perPage
      })
    }
  },
  mounted() {
    this.getRequire()
  }
}
</script>

<style scoped>

</style>


