<template>
  <section>
    <div>
      <el-button
        type="primary"
        @click="add()"
        size="small"
        style="margin-left:0.7%;margin-top:10px;"
      >
        <i class="el-icon-plus"></i>添加
      </el-button>
      <el-table
        :data="ebayData"
        border
        :height="tableHeightstock"
        style="width:98%;margin-left:0.7%;margin-top:15px;"
      >
        <el-table-column type="index" fixed align="center" width="60" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip content="更新">
              <i
                @click="editArt(scope.$index, scope.row)"
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                style="color: #409EFF;cursor:pointer;"
                @click="delArt(scope.$index, scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="developer" label="开发" align="center"></el-table-column>
        <el-table-column property="firstCategory" label="一级类目" align="center"></el-table-column>
        <el-table-column property="category" label="二级类目" align="center"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑" :visible.sync="ebaydisLogin" width="70%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="ebay.developer" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">一级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="ebay.firstCategory" placeholder="请选择" style="width:100%;" @change="getTowLow1($event)">
                <el-option
                  v-for="(item,key) in ebayCatRuleId"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">二级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="ebay.category" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in ebayCatRuleTwo"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="saveEbay()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="70%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="addebay.developer" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">一级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="addebay.firstCategory"
                placeholder="请选择"
                style="width:100%;"
                @change="getTowLow($event)"
              >
                <el-option
                  v-for="(item,key) in ebayCatRuleId"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">二级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="addebay.category" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in ebayCatRule"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsaveEbay()">保 存</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  ebayDevCatRule,
  ebayCatRule,
  ebaySaveDevCat,
  ebayDeleteDevCat
} from "../../api/product";
import { getMember } from "../../api/profit";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 130,
      ebaydisLogin: false,
      addebaydisLogin: false,
      condition: {
        category: null,
        developer: null
      },
      ebay: {
        id: null,
        developer: null,
        category: null,
        categoryId: null,
        firstCategory: null
      },
      addebay: {
        developer: null,
        category: null,
        categoryId: null,
        firstCategory: null
      },
      ebayCat: {
        parentId: null,
        category: null
      },
      ebayCatRule: [],
      ebayCatRuleId: [],
      member: [],
      ebayCatRuleTwo: [],
      ebayData: []
    };
  },
  methods: {
    getTowLow(e) {
      for (let i = 0; i < this.ebayCatRuleId.length; i++) {
        if (e == this.ebayCatRuleId[i].category) {
          this.ebayCat.parentId = this.ebayCatRuleId[i].id;
        }
      }
      ebayCatRule(this.ebayCat).then(res => {
        this.ebayCatRule = res.data.data;
      });
    },
    getTowLow1(e) {
      for (let i = 0; i < this.ebayCatRuleId.length; i++) {
        if (e == this.ebayCatRuleId[i].category) {
          this.ebayCat.parentId = this.ebayCatRuleId[i].id;
        }
      }
      ebayCatRule(this.ebayCat).then(res => {
        this.ebayCatRuleTwo = res.data.data;
      });
    },
    add() {
      this.addebay.developer = null;
      this.addebay.category = null;
      this.addebay.firstCategory = null;
      this.addebaydisLogin = true;
    },
    saveEbay() {
      if (this.ebay.category) {
        for (let i = 0; i < this.ebayCatRule.length; i++) {
          if (this.ebay.category == this.ebayCatRule[i].category) {
            this.ebay.categoryId = this.ebayCatRule[i].id;
          }
        }
      } else {
        for (let i = 0; i < this.ebayCatRuleId.length; i++) {
          if (this.ebay.firstCategory == this.ebayCatRuleId[i].category) {
            this.ebay.categoryId = this.ebayCatRuleId[i].id;
          }
        }
      }
      ebaySaveDevCat(this.ebay).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.ebaydisLogin = false;
          this.getData();
        } else {
          this.ebaydisLogin = false;
          this.getData();
        }
      });
    },
    addsaveEbay() {
      if (this.addebay.category) {
        for (let i = 0; i < this.ebayCatRule.length; i++) {
          if (this.addebay.category == this.ebayCatRule[i].category) {
            this.addebay.categoryId = this.ebayCatRule[i].id;
          }
        }
      } else {
        for (let i = 0; i < this.ebayCatRuleId.length; i++) {
          if (this.addebay.firstCategory == this.ebayCatRuleId[i].category) {
            this.addebay.categoryId = this.ebayCatRuleId[i].id;
          }
        }
      }
      ebaySaveDevCat(this.addebay).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.addebaydisLogin = false;
          this.getData();
        } else {
          this.addebaydisLogin = false;
          this.getData();
        }
      });
    },
    editArt(index, row) {
      this.ebay.developer = row.developer;
      this.ebay.category = row.category;
      this.ebay.firstCategory = row.firstCategory;
      this.ebay.id = row.id;
      if (this.ebay.firstCategory) {
        for (let i = 0; i < this.ebayCatRuleId.length; i++) {
          if (this.ebay.firstCategory == this.ebayCatRuleId[i].category) {
            this.ebayCat.parentId = this.ebayCatRuleId[i].id;
            this.ebayCat.category = this.ebay.firstCategory;
          }
        }
        ebayCatRule(this.ebayCat).then(res => {
          this.ebayCatRuleTwo = res.data.data;
        });
      }else{
        this.ebayCatRuleTwo=this.ebayCatRule
      }
      this.ebaydisLogin = true;
    },
    delArt(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row.id
          };
          ebayDeleteDevCat(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    getData() {
      ebayDevCatRule(this.condition).then(res => {
        this.ebayData = res.data.data;
      });
    },
    getDataCategory() {
      ebayCatRule(this.ebayCat).then(res => {
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId != null) {
            this.ebayCatRule.push(data[i]);
          } else {
            this.ebayCatRuleId.push(data[i]);
          }
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.getDataCategory();
    getMember().then(response => {
      const res = response.data.data;
      this.member = res.filter(ele => ele.position === "开发");
    });
  }
};
</script>

<style scoped>
.basp {
  text-align: center;
}
</style>