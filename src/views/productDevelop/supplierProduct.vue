<template>
  <section>
    <el-button type="primary"
               @click="addVisible = true"
               style="margin:10px;">创建产品</el-button>
    <el-dialog title="创建产品"
               :visible.sync="addVisible"
               width="60%">
      <el-form :model="addForm"
               label-width="100px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="供应商名称">
              <el-select v-model="addForm.supplier"
                         placeholder="--供应商--"
                         style="width:100%;">
                <el-option label="程娟"
                           value="程娟"></el-option>
                <el-option label="深圳市光明新区公明宇威运动器材厂"
                           value="深圳市光明新区公明宇威运动器材厂"></el-option>
                <el-option label="新沂市企业制衣厂"
                           value="新沂市企业制衣厂"></el-option>
                <el-option label="新沂市雪尚皮草店"
                           value="新沂市雪尚皮草店"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线下采购员">
              <el-input v-model="addForm.purchaser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品编码">
              <el-input v-model="addForm.goodsCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品名称">
              <el-input v-model="addForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商商品编码">
              <el-input v-model="addForm.supplierGoodsCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="add">创 建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="产品详情"
               :visible.sync="viewVisible"
               width="60%">
      <el-table :data="viewTableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i @click="del(scope.$index, scope.row)"
                 class="el-icon-delete"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="SKU"
                         prop=""></el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="save">创 建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑产品"
               :visible.sync="editVisible"
               width="60%">
      <el-form :model="editForm"
               label-width="100px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="供应商名称">
              <el-select v-model="editForm.supplier"
                         placeholder="--供应商--"
                         style="width:100%;">
                <el-option label="程娟"
                           value="程娟"></el-option>
                <el-option label="深圳市光明新区公明宇威运动器材厂"
                           value="深圳市光明新区公明宇威运动器材厂"></el-option>
                <el-option label="新沂市企业制衣厂"
                           value="新沂市企业制衣厂"></el-option>
                <el-option label="新沂市雪尚皮草店"
                           value="新沂市雪尚皮草店"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线下采购员">
              <el-input v-model="editForm.purchaser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品编码">
              <el-input v-model="editForm.goodsCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品名称">
              <el-input v-model="editForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商商品编码">
              <el-input v-model="editForm.supplierGoodsCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="edit">更 新</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData">
      <el-table-column type="index"
                       width="50"></el-table-column>
      <el-table-column label="操作"
                       header-align="center"
                       width="71">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <i class="el-icon-view"
               @click="view(scope.$index, scope.row)"></i>
          </el-tooltip>
          <el-tooltip content="更新">
            <i @click="Edit(scope.$index, scope.row)"
               class="el-icon-edit"></i>
          </el-tooltip>
          <el-tooltip content="删除">
            <i @click="del(scope.$index, scope.row)"
               class="el-icon-delete"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称"
                       header-align="center">
        <el-table-column prop="supplier"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="线下采购员"
                       header-align="center">
        <el-table-column prop="purchaser"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="商品编码"
                       header-align="center">
        <el-table-column prop="goodsCode"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="商品名称"
                       header-align="center">
        <el-table-column prop="goodsName"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商商品编码"
                       header-align="center">
        <el-table-column prop="supplierGoodsCode"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间"
                       header-align="center">
        <el-table-column prop="createdTime"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间"
                       header-align="center">
        <el-table-column prop="updatedTime"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination class="toolbar"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="condition.page"
                   :page-sizes="[20, 30, 40, 50]"
                   :page-size="condition.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="this.total">
    </el-pagination>
  </section>
</template>
<script>
import {
  APISupplierGoodsList,
  APICreateGoods,
  APIUpdateGoods,
  APIGoodsAttribute,
  APIGoodsDelelte
} from '../../api/product'
export default {
  data() {
    return {
      total: null,
      addVisible: false,
      viewVisible: false,
      editVisible: false,
      addForm: {},
      editForm: {},
      tableData: [],
      viewTableData: [],
      condition: {
        purchaser: null,
        supplier: null,
        goodsName: null,
        goodsCode: null,
        supplierGoodsCode: null,
        page: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    //分页
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    //创建
    add() {
      APICreateGoods(this.addForm).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.addVisible = false
          this.getData()
        } else {
          this.$message.error('创建失败')
        }
      })
    },
    //查看
    view(index, row) {
      this.viewVisible = true
    },
    save() {},
    //更新
    Edit(index, row) {
      this.editVisible = true
      this.editForm = Object.assign({}, row)
    },
    edit() {
      APIUpdateGoods(this.editForm).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.editVisible = false
          this.getData()
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    //删除
    del(index, row) {
      let data = {}
      data.id = row.id
      APIGoodsDelelte(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getData() {
      APISupplierGoodsList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
    },
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.supplier,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.supplier = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 1) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.purchaser,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.purchaser = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 2) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.goodsCode,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsCode = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 3) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.goodsName,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsName = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 4) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.supplierGoodsCode,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.supplierGoodsCode = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 5) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.createdTime,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.createdTime = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 6) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.updatedTime,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.updatedTime = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
i {
  color: #409eff;
  cursor: pointer;
}
</style>