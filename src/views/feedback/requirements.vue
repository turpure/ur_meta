<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="default" v-on:click="searchRequirements">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="default" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="requirements" highlight-current-row :loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="id" v-if="false"></el-table-column>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="createdDate" label="创建时间" :formatter="formatter" width="140"></el-table-column>
			<el-table-column prop="name" label="名称" sortable>
				<template slot-scope="scope">
					<span class="link-type">{{ scope.row.name }}</span>
					<el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="detail" label="详情" min-width="180" sortable></el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--新增界面-->
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
				<el-form-item label="优先级">
					<el-rate v-model="addForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
				</el-form-item>
				<el-form-item label="详情">
					<el-input type="textarea" v-model="addForm.detail"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

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
				<el-form-item label="优先级">
					<el-rate v-model="editForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
				</el-form-item>
				<el-form-item label="详情">
					<el-input type="textarea" v-model="editForm.detail"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<div class="pagination-container">
				<el-pagination v-show="total>0" :current-page="page" :page-sizes=[10,20,30,50] :page-size="size" :total="10" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" />
			</div>
		</el-col>
	</section>

</template>

<script>
import {
  getRequirements,
  createRequirements,
  editRequirements,
  deleteRequirements
} from '../../api/api';
export default {
  data() {
    return {
      page: 1,
      size: 2,
      total: 10,
      tags: {
        1: { name: '无关紧要', type: '' },
        2: { name: '次要', type: 'success' },
        3: { name: '一般', type: 'info' },
        4: { name: '严重', type: 'warning' },
        5: { name: '紧急', type: 'danger' }
      },

      dialogVisible: false,
      requirements: [],
      filters: { name: '' },
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      listLoading: false,
      addLoading: false,
      editLoading: false,
      // 新增界面数据
      addForm: {
        name: '',
        detail: '',
        type: 0,
        priority: 0
      },
      // 新增界面数据
      editForm: {
        id: 0,
        name: '',
        detail: '',
        type: 0,
        priority: 0
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
    },
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : '';
    },
    searchRequirements() {
      getRequirements().then(response => {
        this.requirements = response.data.data
      })
    },
    addSubmit() {
      this.addFormVisible = false
      createRequirements(this.addForm).then(response => {
        this.requirements.push(response.data.data)
      })
    },
    editSubmit() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        editRequirements(this.editForm).then(response => {
          this.editFormVisible = false
          const req = response.data.data
          this.editLoading = false
          this.requirements = this.requirements.map(ele => {
            if (ele.id === req.id) {
              return req
            }
            return ele
          })
        })
      })
    },
    handleAdd() {
      this.addFormVisible = true
    },
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    handleDel(index, row) {
      console.log(index)
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(
        () => {
          this.listLoading = true
          deleteRequirements(row.id).then(res => {
            this.listLoading = false
            this.requirements.splice(index, 1)
          })
        }
      )
    }
  },
  mounted() {
    getRequirements().then(response => {
      this.requirements = response.data.data
    })
  }
}
</script>

<style scoped>
</style>