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
		<el-table :data="requirements" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="createdDate" label="创建时间" :formatter="formatter" width="140"></el-table-column>
			<el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
			<el-table-column prop="detail" label="详情" min-width="180" sortable></el-table-column>
		</el-table>

    <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px"  ref="addForm">
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
           <el-rate v-model="addForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;"/>
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
  </section>
</template>

<script>
import { getRequirements, createRequirements } from '../../api/api'
export default {
  data() {
    return {
      dialogVisible: false,
      requirements: [],
      filters: { name: '' },
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      // 新增界面数据
      addForm: {
        name: '',
        detail: '',
        type: 0,
        priority: 0
      }
    }
  },
  methods: {
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : ''
    },
    searchRequirements() {
      getRequirements().then(response => {
        this.requirements = response.data.data
      })
    },
    addSubmit() {
      createRequirements(this.addForm).then(response => console.log(response))
    },
    handleAdd() {
      this.addFormVisible = true
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