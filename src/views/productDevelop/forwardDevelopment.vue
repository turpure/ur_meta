<template>
  <section class="toolbar">
    <el-col :span="24" style="padding:10px 20px;">
      <el-button plain @click='dialogVisible1 = true'>新增产品</el-button>
      <el-button type="primary">批量导入</el-button>
      <el-button plain @click="delAll1">批量删除</el-button>
      <el-button plain>下载模板</el-button>
      <el-button type="warning">批量审批</el-button>
    </el-col>
    <!-- 新增对话框 -->
    <el-dialog title='新增' :visible.sync="dialogVisible1">
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
        <el-form-item label="供应商链接" prop='vendor1'>
          <el-input size="small" v-model="addForm.vendor1"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接" prop='vendor2'>
          <el-input size="small" v-model="addForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接" prop='vendor3'>
          <el-input size="small" v-model="addForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接" prop='origin1'>
          <el-input size="small" v-model="addForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接" prop='origin2'>
          <el-input size="small" v-model="addForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接" prop='origin3'>
          <el-input size="small" v-model="addForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="售价($)" prop='salePrice'>
          <el-input size="small" v-model="addForm.salePrice" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量" prop='hopeSale'>
          <el-input size="small" v-model="addForm.hopeSale" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop='hopeRate'>
          <el-input size="small" v-model="addForm.hopeRate" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop='hopeWeight'>
          <el-input size="small" v-model="addForm.hopeWeight" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥)" prop='hopeCost'>
          <el-input size="small" v-model="addForm.hopeCost" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop='hopeMonthProfit'>
          <el-input size="small" v-model="addForm.hopeMonthProfit" placeholder="自动计算"></el-input>
        </el-form-item>
        <el-form-item label="售价($)">
          <el-checkbox-group v-model="addForm.stockUp">
            <el-checkbox label="是否备货" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click='dialogVisible1=false'>取消</el-button>
        <el-button type="primary" @click="submitForm1">确定</el-button>
      </span>
    </el-dialog>
    <!-- 查看对话框 -->
    <el-dialog title='查看' :visible.sync="dialogVisibleView1">
      <el-form :model="viewForm" label-position="left" label-width="100px" ref="viewForm">
        <el-form-item label="图片" prop="img" class="item1">
          <img :src='viewForm.img' style="width: 150px;height: 100px;">
        </el-form-item>
        <el-form-item label="图片地址" prop="img" class="item">
          <span>{{viewForm.img}}</span>
        </el-form-item>
        <el-form-item label="是否备货" prop="stockUp" class="item">
          <span>{{viewForm.stockUp}}</span>
        </el-form-item>
        <el-form-item label="主类目" prop="cate" class="item">
          <span>{{viewForm.cate}}</span>
        </el-form-item>
        <el-form-item label="子类目" prop="subCate" class="item">
          <span>{{viewForm.subCate}}</span>
        </el-form-item>
        <el-form-item label="供应商链接1" prop="vendor1" class="item">
          <span>{{viewForm.vendor1}}</span>
        </el-form-item>
        <el-form-item label="供应商链接2" prop="vendor2" class="item">
          <span>{{viewForm.vendor2}}</span>
        </el-form-item>
        <el-form-item label="供应商链接3" prop="vendor3" class="item">
          <span>{{viewForm.vendor3}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接1" prop="origin1" class="item">
          <span>{{viewForm.origin1}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接2" prop="origin2" class="item">
          <span>{{viewForm.origin2}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接3" prop="origin3" class="item">
          <span>{{viewForm.origin3}}</span>
        </el-form-item>
        <el-form-item label="开发编号" prop="devNum" class="item">
          <span>{{viewForm.devNum}}</span>
        </el-form-item>
        <el-form-item label="开发员" prop="developer" class="item">
          <span>{{viewForm.developer}}</span>
        </el-form-item>
        <el-form-item label="推荐人" prop="introducer" class="item">
          <span>{{viewForm.introducer}}</span>
        </el-form-item>
        <el-form-item label="推荐理由" prop="introReason" class="item">
          <span>{{viewForm.introReason}}</span>
        </el-form-item>
        <el-form-item label="认领" prop="devStatus" class="item">
          <span>{{viewForm.devStatus}}</span>
        </el-form-item>
        <el-form-item label="产品状态" prop="checkStatus" class="item">
          <span>{{viewForm.checkStatus}}</span>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate" class="item">
          <span>{{viewForm.createDate}}</span>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate" class="item">
          <span>{{viewForm.updateDate}}</span>
        </el-form-item>
        <el-form-item label="售价($)" prop="salePrice" class="item">
          <span>{{viewForm.salePrice}}</span>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop="hopeWeight" class="item">
          <span>{{viewForm.hopeWeight}}</span>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop="hopeRate" class="item">
          <span>{{viewForm.hopeRate}}</span>
        </el-form-item>
        <el-form-item label="预估月销量" prop="hopeSale" class="item">
          <span>{{viewForm.hopeSale}}</span>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop="hopeMonthProfit" class="item">
          <span>{{viewForm.hopeMonthProfit}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更新对话框 -->
    <el-dialog title='更新' :visible.sync="dialogVisibleEdit1">
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
        <el-form-item label="供应商链接1">
          <el-input size="small" v-model="editForm.vendor1"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接2">
          <el-input size="small" v-model="editForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接3">
          <el-input size="small" v-model="editForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接1">
          <el-input size="small" v-model="editForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接2">
          <el-input size="small" v-model="editForm.origin2"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接3">
          <el-input size="small" v-model="editForm.origin3"></el-input>
        </el-form-item>
        <el-form-item label="售价($)">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量:">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%):">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克):">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥):">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($):">
          <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($):">
          <el-checkbox-group v-model="editForm.stockUp">
            <el-checkbox label="是否备货" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit1">确定</el-button>
      </span>
    </el-dialog>
    <!-- 认领对话框 -->
    <el-dialog :visible.sync="dialogVisibleClaim1">
      <el-form :model="claimForm" label-position="left" label-width="50px" ref="claimForm">
        <el-form-item label="认领">
          <el-select v-model="claimForm.devStatus" placeholder="认领到" size="small" style="width:90%;">
            <el-option value="正向认领"></el-option>
            <el-option value="逆向认领"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitClaim1">确定</el-button>
      </span>
    </el-dialog>
    <!-- 列表 -->
    <el-table :data="tableData1" @selection-change="selsChange1" style="width: 97%;margin-left:20px">
      <el-table-column type="selection" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column type="index" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column label="操作" fixed header-align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <el-button type="text" @click="view1(scope.$index, scope.row)">
              <i class="el-icon-view"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="更新">
            <el-button type="text" @click="edit1(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button type="text" @click="del1(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="认领">
            <el-button type="text" @click="claim1(scope.$index, scope.row)">
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
      <el-table-column label="是否备货" header-align="center">
        <el-table-column prop="cate" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="主类目" header-align="center">
        <el-table-column prop="cate" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="子类目" header-align="center">
        <el-table-column prop="subCate" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商链接1" header-align="center">
        <el-table-column prop="vendor1" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="平台参考链接1" header-align="center">
        <el-table-column prop="origin1" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发编号" header-align="center">
        <el-table-column prop="developer" :render-header="renderHeader" width='150' align="center">
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
        <el-table-column prop="createDate" :render-header="renderHeader" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="售价($)" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估重量(克)" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估利润率(%)" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月销量" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月毛利($)" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="toolbar">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="this.condition1.page1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.condition1.pageSize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total1">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { getGoodscats } from '../../api/profit'
export default {
    data() {
        return {
            total1: null,
            dialogVisible1: false,
            dialogVisibleView1: false,
            dialogVisibleEdit1: false,
            dialogVisibleClaim1: false,
            disabled: true,
            category: [],
            cate: [],
            tableData1: [],
            addForm: {},
            viewForm: {},
            editForm: {},
            condition1: {
              page1: 1,
              pageSize1: 10
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
            }   
        }
    },
    mounted() {
        getGoodscats().then(response => {
          this.category = this.cate = response.data.data
        })
    },
    methods: {
        handleCurrentChange1(val) {},
        handleSizeChange1(val) {},
        view11() {},
        edit1() {},
        del1() {},
        claim1() {},
        selsChange1() {},
        submitForm1() {},
        submitEdit1() {},
        submitClaim1() {},
        // 批量删除
        delAll1() {}
    }
}
</script>

<style lang="scss" scoped>

</style>
