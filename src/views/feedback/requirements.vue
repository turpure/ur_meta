<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户需求" name="first">
        <!--需求工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="condition">
            <el-form-item>
              <el-input v-model="condition.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click="searchRequirements">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click="handleAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--需求列表-->
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
          <el-table-column prop="detail" label="详情" min-width="180" :formatter="detailFormatter" sortable>
          </el-table-column>
          <el-table-column prop="schedule" label="进度" min-width="100" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>说明: {{ schedule[scope.row.schedule]['hints']}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ schedule[scope.row.schedule]['name']}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope"> 
              <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> 
        <!--需求新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" ref="addForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-radio-group v-model="addForm.type">
                <el-radio class="radio" :label="0">BUG</el-radio>
                <el-radio class="radio" :label="1">新需求</el-radio>
                <el-radio class="radio" :label="2">任务</el-radio>
                <el-radio class="radio" :label="3">改进建议</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="状态">
              <el-radio-group v-model="addForm.status">
                <el-radio class="radio" :label="1">Open</el-radio>
                <el-radio class="radio" :label="2">In Progress</el-radio>
                <el-radio class="radio" :label="3">Resovled</el-radio>
                <el-radio class="radio" :label="4">Reopened</el-radio>
                <el-radio class="radio" :label="5">Closed</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="优先级">
              <el-rate show-text :texts='text' v-model="addForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
            </el-form-item>
            <!-- <el-form-item label="处理人">
              <el-checkbox-group v-model="addForm.processingPerson">
                <el-checkbox label="周朋许" name="processingPerson"></el-checkbox>
                <el-checkbox label="叶先钱" name="processingPerson"></el-checkbox>
                <el-checkbox label="朱洪涛" name="processingPerson"></el-checkbox>
              </el-checkbox-group>
            </el-form-item> -->
            <el-form-item label="详情">
              <quill-editor v-model="content"
                ref="QuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
        <!--需求编辑界面-->
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
            <el-form-item label="优先级">
              <el-rate show-text :texts='text' v-model="editForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
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
        <!--需求详情界面-->
        <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
          <el-form :model="detailForm" label-width="80px" ref="detailForm">
            <el-form-item label="名称" prop="name">
              <span>{{detailForm.name}}</span>
          <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <span>{{types[detailForm.type]}}</span>
            </el-form-item>
            <el-form-item label="状态" prop="schedule">
              <el-steps :space="100" :active=this.detailForm.schedule finish-status="success">
                <el-step title="待审核"></el-step>
                <el-step :title='this.detailForm.schedule<=2?"已驳回":"处理中"'></el-step>
                <el-step title="处理中"></el-step>
                <el-step title="处理中"></el-step>
                <el-step title="处理完成"></el-step>
              </el-steps>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-rate show-text disabled :texts='text' v-model="this.detailForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
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
        <!--需求分页工具条-->
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
      </el-tab-pane>
      <el-tab-pane label="审核列表" name="second">
        <!--审核工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="examine">
            <el-form-item>
              <el-input v-model="examine.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click="searchRequirements">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="auditSuccessAll">批量通过</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="auditFailedAll">批量驳回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--审核列表-->
        <el-table :data="requirementsAudit" highlight-current-row :loading="auditLoading" @selection-change="selsChange" style="width: 100%;">
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
          <el-table-column prop="detail" label="详情" min-width="180" :formatter="detailFormatter" sortable></el-table-column>
          <el-table-column prop="processingPerson" label="处理人" min-width="80" sortable></el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope"> 
              <el-button size="small" @click="handleEditAudit(scope.$index, scope.row)">修改</el-button>
              <el-button type="success" size="small" @click="handleSuccess(scope.$index, scope.row)">通过</el-button>
              <el-button type="danger" size="small" @click="handleReject(scope.$index, scope.row)">驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--审核编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisibleAudit" :close-on-click-modal="false">
          <el-form :model="editAuditForm" label-width="80px" ref="editFormAudit">
            <el-form-item label="id" prop="id" v-if="false">
              <el-input v-model="editAuditForm.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="editAuditForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-radio-group v-model="editAuditForm.type">
                <el-radio class="radio" :label="0">BUG</el-radio>
                <el-radio class="radio" :label="1">新需求</el-radio>
                <el-radio class="radio" :label="2">任务</el-radio>
                <el-radio class="radio" :label="3">改进建议</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级">
              <el-rate show-text :texts='text' v-model="editAuditForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
            </el-form-item>
            <el-form-item label="处理人">
              <el-checkbox-group v-model="editAuditForm.processingPerson">
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
            <el-button @click.native="editFormVisibleAudit = false">取消</el-button>
            <el-button type="primary" @click.native="editAuditSubmit" :loading="editAuditLoading">提交</el-button>
          </div>
        </el-dialog>
        <!--审核分页工具条-->
        <el-col :span="24" class="toolbar">
          <div class="pagination-container">
            <el-pagination
              v-show="this.auditTotal>0" 
              :current-page="examine.page" 
              :page-sizes="[10,20,30,50,this.auditTotal]" 
              :page-size="examine.pageSize" 
              :total="this.auditTotal" 
              background 
              layout="total, sizes, slot, prev, pager, next, jumper" 
              @current-change="handleCurrentChangeAudit"
              @size-change="handleSizeChangeAudit">
              <el-button type="text" @click="showAllAudit">显示全部</el-button>
            </el-pagination>
          </div>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="处理列表" name="third">
        <!--处理工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="deal">
            <el-form-item>
              <el-input v-model="deal.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click="searchRequirements">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--处理列表-->
        <el-table :data="requirementsDeal" highlight-current-row :loading="dealLoading" style="width: 100%;">
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
          <el-table-column prop="detail" label="详情" min-width="180" :formatter="detailFormatter" sortable></el-table-column>
          <el-table-column prop="processingPerson" label="处理人" min-width="80" sortable></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>说明: {{ status[scope.row.status]['hints']}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ status[scope.row.status]['name']}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope"> 
              <el-button type="primary" size="small" @click="handleDetailDeal(scope.$index, scope.row)">详情</el-button>
              <el-button size="small" @click="handleEditDeal(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelDeal(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> 
        <!--处理编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisibleDeal" :close-on-click-modal="false">
          <el-form :model="editDealForm" label-width="80px" ref="editDealForm">
            <el-form-item label="id" prop="id" v-if="false">
              <el-input v-model="editDealForm.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="editDealForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-radio-group v-model="editDealForm.type">
                <el-radio class="radio" :label="0">BUG</el-radio>
                <el-radio class="radio" :label="1">新需求</el-radio>
                <el-radio class="radio" :label="2">任务</el-radio>
                <el-radio class="radio" :label="3">改进建议</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="editDealForm.status">
                <el-radio class="radio" :label="1">Open</el-radio>
                <el-radio class="radio" :label="2">In Progress</el-radio>
                <el-radio class="radio" :label="3">Resovled</el-radio>
                <el-radio class="radio" :label="4">Reopened</el-radio>
                <el-radio class="radio" :label="5">Closed</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级">
              <el-rate show-text :texts='text' v-model="editDealForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
            </el-form-item>
            <el-form-item label="处理人">
              <el-checkbox-group v-model="editDealForm.processingPerson">
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
            <el-button @click.native="editFormVisibleDeal = false">取消</el-button>
            <el-button type="primary" @click.native="editDealSubmit" :loading="editDealLoading">提交</el-button>
          </div>
        </el-dialog>
        <!--处理详情界面-->
        <el-dialog title="详情" :visible.sync="detailFormVisibleDeal" :close-on-click-modal="false">
          <el-form :model="detailDealForm" label-width="80px" ref="detailDealForm">
            <el-form-item label="名称" prop="name">
              <span>{{detailDealForm.name}}</span>
          <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <span>{{types[detailDealForm.type]}}</span>
            </el-form-item>
            <el-form-item label="状态" prop="schedule">
              <el-steps :space="100" :active=this.detailDealForm.schedule finish-status="success">
                <el-step title="待审核"></el-step>
                <el-step :title='this.detailDealForm.schedule<=2?"已驳回":"处理中"'></el-step>
                <el-step title="处理中"></el-step>
                <el-step title="处理中"></el-step>
                <el-step title="处理完成"></el-step>
              </el-steps>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-rate show-text disabled :texts='text' v-model="this.detailDealForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
              <span>{{detailDealForm.creator}}</span>
            </el-form-item>
            <el-form-item label="详情" prop="detail">
              <!-- 从数据库读取展示 -->
              <div v-html="str" class="ql-editor">
                {{str}}
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="detailFormVisibleDeal = false">关闭</el-button>
          </div>
        </el-dialog>
        <!--处理分页工具条-->
        <el-col :span="24" class="toolbar">
          <div class="pagination-container">
            <el-pagination
              v-show="this.dealTotal>0" 
              :current-page="deal.page" 
              :page-sizes="[10,20,30,50,this.dealTotal]" 
              :page-size="deal.pageSize" 
              :total="this.dealTotal" 
              background 
              layout="total, sizes, slot, prev, pager, next, jumper" 
              @current-change="handleCurrentChangeDeal"
              @size-change="handleSizeChangeDeal">
              <el-button type="text" @click="showAllDeal">显示全部</el-button>
            </el-pagination>
          </div>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import {
  getRequirementsIndex,
  getRequirementsExamine,
  getRequirementsDeal,
  createRequirements,
  editRequirements,
  deleteRequirements,
  getExamine
} from '../../api/api'

export default {
  data() {
    return {
      sels: [],
      activeName: 'first',
      detail: '',
      str: '',
      img: '',
      total: null,
      auditTotal: null,
      dealTotal: null,
      content: '',
      mycontent: '',
      editorOption: {},
      text: [
        '仅建议',
        '不重要不紧急',
        '重要不紧急',
        '紧急不重要',
        '重要且紧急'
      ],
      condition: {
        flag: '',
        detail: '',
        name: '',
        type: '',
        priority: '',
        schedule: '',
        page: 1,
        pageSize: 10
      },
      examine: {
        flag: '',
        detail: '',
        creator: '',
        name: '',
        type: '',
        priority: '',
        page: 1,
        pageSize: 10
      },
      deal: {
        flag: '',
        detail: '',
        name: '',
        type: '',
        priority: '',
        status: '',
        creator: '',
        processingPerson: '',
        page: 1,
        pageSize: 10
      },
      auditSuccess: {
        type: 'pass',
        ids: []
      },
      auditFailed: {
        type: 'failed',
        ids: []
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
      schedule: {
        1: { name: '待审核', hints: '问题被提交,等待审核' },
        2: { name: '已驳回', hints: '问题被驳回，不予处理' },
        3: { name: '处理中', hints: '问题在处理当中，尚未完成' },
        4: { name: '处理中', hints: '问题在处理当中，尚未完成' },
        5: { name: '处理完成', hints: '问题处理结果得到确认，处于关闭状态' }
      },
      status: {
        1: { name: 'Open ', hints: '问题被提交,等待处理' },
        2: { name: 'In Progress', hints: '问题被处理，尚未完成' },
        3: { name: 'Resovled', hints: '问题曾解决，但结论尚未被认可需重新分配解决' },
        4: { name: 'Reopened ', hints: '问题解决，等待确认结果，确认的结果是Reopend或Closed' },
        5: { name: 'Closed ', hints: '问题处理结果得到确认，处于关闭状态' }
      },
      dialogVisible: false,
      requirements: [],
      requirementsAudit: [],
      requirementsDeal: [],
      detailForm: {},
      detailDealForm: {},
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editFormVisibleDeal: false,
      editFormVisibleAudit: false,
      detailFormVisible: false,
      detailFormVisibleDeal: false,
      listLoading: false,
      auditLoading: false,
      dealLoading: false,
      addLoading: false,
      editLoading: false,
      editDealLoading: false,
      editAuditLoading: false,
      // 新增界面数据
      addForm: {
        id: 0,
        name: '',
        img: [],
        detail: '',
        type: 0,
        status: 0,
        priority: 1,
        processingPerson: []
      },
      // 新增界面数据
      editForm: {},
      editDealForm: {},
      editAuditForm: {
        processingPerson: []
      }
    }
  },
  watch: {
    activeName: function(newVal, oldVal) {
      this.activeName = newVal
      this.getRequire(this.activeName)
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor
    }
  },
  methods: {
    // 批量审核
    selsChange(sels) {
      this.sels = sels
    },
    auditSuccessAll() {
      this.auditSuccess.ids = this.sels.map(item => item.id)
      const condition = {}
      condition['condition'] = this.auditSuccess
      if (this.auditSuccess.ids.length === 0) {
        this.$alert('请选择通过内容', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        getExamine(condition).then(response => {
          this.$message({
            message: '审核通过',
            type: 'success'
          })
          this.getRequire(this.activeName)
        })
      }
    },
    auditFailedAll() {
      this.auditFailed.ids = this.sels.map(item => item.id)
      const condition = {}
      condition['condition'] = this.auditFailed
      if (this.auditFailed.ids.length === 0) {
        this.$alert('请选择驳回内容', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        getExamine(condition).then(response => {
          this.$message.error('审核不通过')
          this.getRequire(this.activeName)
        })
      }
    },
    handleClick(tab, event) {},
    // 富文本
    onEditorBlur(quill) {
      // 失去焦点事件
    },
    onEditorFocus(quill) {
      // 获得焦点事件
    },
    onEditorReady(quill) {
      // 准备编辑器
    },
    onEditorChange({ quill, html, text }) {
      // 内容改变事件
      this.content = html
      this.mycontent = html
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    // 分页器
    handleCurrentChange(val) {
      this.condition.page = val
      this.getRequire(this.activeName)
    },
    handleCurrentChangeAudit(val) {
      this.examine.page = val
      this.getRequire(this.activeName)
    },
    handleCurrentChangeDeal(val) {
      this.deal.page = val
      this.getRequire(this.activeName)
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getRequire(this.activeName)
    },
    handleSizeChangeAudit(val) {
      this.examine.pageSize = val
      this.getRequire(this.activeName)
    },
    handleSizeChangeDeal(val) {
      this.deal.pageSize = val
      this.getRequire(this.activeName)
    },
    showAll() {
      this.handleSizeChange(this.total)
    },
    showAllAudit() {
      this.handleSizeChangeAudit(this.auditTotal)
    },
    showAllDeal() {
      this.handleSizeChangeDeal(this.dealTotal)
    },
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : ''
    },
    detailFormatter(row, column) {
      return row.detail.replace(/<\/?[^>]*>/g, '')
        ? row.detail.replace(/<\/?[^>]*>/g, '').substring(0, 100)
        : ''
    },
    searchRequirements() {
      this.getRequire(this.activeName)
    },
    addSubmit() {
      this.addFormVisible = false
      this.addForm.img = this.content.match(/data:([^"]*)/g)
      // this.addForm.detail = this.content.replace(/<\/?[^>]*>/g,'').toString()
      const addContent = Object.assign({}, this.addForm)
      addContent.creator = this.$store.getters.name
      addContent.processingPerson = this.addForm.processingPerson.join(',')
      addContent.detail = this.content.replace(/data:([^"]*)/g, '')
      this.addForm.processingPerson = []
      createRequirements(addContent).then(response => {
        this.requirements.unshift(response.data.data)
        this.getRequire(this.activeName)
      })
    },
    // 编辑界面提交
    editSubmit() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        this.editForm.processingPerson = this.editForm.processingPerson.join(
          ','
        )
        this.editForm.img =
          this.mycontent.match(/data:([^"]*)/g) ||
          this.mycontent.match(/http:([^"]*)/g)
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
    editDealSubmit() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editDealLoading = true
        this.editDealForm.processingPerson = this.editDealForm.processingPerson.join(
          ','
        )
        this.editDealForm.img =
          this.mycontent.match(/data:([^"]*)/g) ||
          this.mycontent.match(/http:([^"]*)/g)
        this.editDealForm.detail = this.mycontent.replace(/data:([^"]*)/g, '')
        editRequirements(this.editDealForm).then(response => {
          this.editFormVisibleDeal = false
          const req = response.data.data
          this.editDealLoading = false
          this.requirements = this.requirements.map(ele => {
            if (parseInt(ele.id) === req.id) {
              return req
            }
            return ele
          })
          this.getRequire(this.activeName)
        })
      })
    },
    editAuditSubmit() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editAuditLoading = true
        this.editAuditForm.processingPerson = this.editAuditForm.processingPerson.filter(ele => ele.length > 0).join(
          ','
        )
        this.editAuditForm.img =
          this.mycontent.match(/data:([^"]*)/g) ||
          this.mycontent.match(/http:([^"]*)/g)
        this.editAuditForm.detail = this.mycontent.replace(/data:([^"]*)/g, '')
        editRequirements(this.editAuditForm).then(response => {
          this.editFormVisibleAudit = false
          const req = response.data.data
          this.editAuditLoading = false
          this.requirements = this.requirements.map(ele => {
            if (parseInt(ele.id) === req.id) {
              return req
            }
            return ele
          })
          this.getRequire(this.activeName)
        })
      })
    },
    // 新增
    handleAdd() {
      const form = {
        id: 0,
        name: '',
        img: [],
        detail: '',
        type: 0,
        status: 0,
        priority: 1,
        processingPerson: []
      }
      this.addForm = Object.assign({}, form)
      this.addFormVisible = true
    },
    // 详情
    handleDetail(index, row) {
      this.detailFormVisible = true
      row.schedule = parseInt(row.schedule)
      row.priority = parseInt(row.priority)
      this.detailForm = Object.assign({}, row)
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          )
        }
      }
      this.str = this.escapeStringHTML(this.detailForm.detail)
    },
    handleDetailDeal(index, row) {
      this.detailFormVisibleDeal = true
      row.schedule = parseInt(row.schedule)
      row.priority = parseInt(row.priority)
      this.detailDealForm = Object.assign({}, row)
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailDealForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          )
        }
      }
      this.str = this.escapeStringHTML(this.detailDealForm.detail)
    },
    // 编辑界面弹出
    handleEdit(index, row) {
      this.editFormVisible = true
      row.priority = parseInt(row.priority)
      this.editForm = Object.assign({}, row)
      this.editForm.processingPerson = this.editForm.processingPerson.split(
        ','
      )
      // this.detail=this.editForm.detail.replace(/http:([^"]*)/g,'').toString()
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          )
        }
      }
      this.mycontent = this.editForm.detail
    },
    handleEditAudit(index, row) {
      this.editFormVisibleAudit = true
      row.priority = parseInt(row.priority)
      this.editAuditForm = Object.assign({}, row)
      this.editAuditForm.processingPerson = this.editAuditForm.processingPerson.split(
        ','
      )
      // this.detail=this.editForm.detail.replace(/http:([^"]*)/g,'').toString()
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editAuditForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          )
        }
      }
      this.mycontent = this.editAuditForm.detail
    },
    handleEditDeal(index, row) {
      this.editFormVisibleDeal = true
      row.priority = parseInt(row.priority)
      this.editDealForm = Object.assign({}, row)
      this.editDealForm.processingPerson = this.editDealForm.processingPerson.split(
        ','
      )
      // this.detail=this.editForm.detail.replace(/http:([^"]*)/g,'').toString()
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editDealForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          )
        }
      }
      this.mycontent = this.editDealForm.detail
    },
    // 删除
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
    handleDelDeal(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(
        () => {
          this.dealLoading = true
          deleteRequirements(row.id).then(res => {
            this.dealLoading = false
            this.requirements.splice(index, 1)
            this.getRequire(this.activeName)
          })
        }
      )
    },
    // 审核
    handleSuccess(index, row) {
      this.auditLoading = true
      this.auditSuccess.ids = [row.id]
      const condition = {}
      condition['condition'] = this.auditSuccess
      getExamine(condition).then(response => {
        this.auditLoading = false
        this.$message({
          message: '审核通过',
          type: 'success'
        })
        this.getRequire(this.activeName)
      })
    },
    handleReject(index, row) {
      this.dealLoading = true
      this.auditFailed.ids = [row.id]
      const condition = {}
      condition['condition'] = this.auditFailed
      getExamine(condition).then(response => {
        this.dealLoading = false
        this.$message.error('审核不通过')
        this.getRequire(this.activeName)
      })
    },
    getRequire(name) {
      if (name === 'first') {
        getRequirementsIndex(this.condition).then(response => {
          const res = response.data.data
          this.requirements = res.items
          this.total = res._meta.totalCount
          this.condition.page = res._meta.currentPage
          this.condition.pageSize = res._meta.perPage
        })
      } else if (name === 'second') {
        getRequirementsExamine(this.examine).then(response => {
          const res = response.data.data
          this.requirementsAudit = res.items
          this.auditTotal = res._meta.totalCount
          this.examine.page = res._meta.currentPage
          this.examine.pageSize = res._meta.perPage
        })
      } else if (name === 'third') {
        getRequirementsDeal(this.deal).then(response => {
          const res = response.data.data
          this.requirementsDeal = res.items
          this.dealTotal = res._meta.totalCount
          this.deal.page = res._meta.currentPage
          this.deal.pageSize = res._meta.perPage
        })
      }
    }
  },
  mounted() {
    this.getRequire(this.activeName)
  }
}
</script>

<style lang="scss" scoped>
</style>