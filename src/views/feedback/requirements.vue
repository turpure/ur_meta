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
                <el-radio 