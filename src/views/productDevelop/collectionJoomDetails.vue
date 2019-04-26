<template>
  <div>
    <el-col
      :span="24"
      style="position: fixed; bottom:0; z-index:999;background: #f2f2f2;padding: 15px 0; padding-top:12px; border-top: #eee solid 1px;"
    >
      <el-col :span="10" :offset="6">
        <el-button @click="keep()" type="primary">保存当前数据</el-button>
        <el-button type="success" @click="keepWs()">保存并完善</el-button>
        <el-button @click="keep()" type="warning">导出Joom模板</el-button>
      </el-col>
    </el-col>
    <el-col :span="24" style="padding: 0;">
      <h3 class="toolbar essential">基本信息</h3>
    </el-col>
    <div class="w98">
      <el-col :span="24">
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">标题</el-col>
          <el-col :span="18">
            <el-input></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">标签</el-col>
          <el-col :span="18">
            <el-input></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">商品编码</el-col>
          <el-col :span="18">
            <el-input></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">主类目</el-col>
          <el-col :span="18">
            <el-select v-model="editForm.cat" clearable @change="productcategory" style="width:100%;">
              <el-option v-for="item in cate" :value="item" :key="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">子类目</el-col>
          <el-col :span="18">
            <el-select v-model="editForm.subCat" clearable style="width:100%;">
              <el-option v-for="item in subCate" :value="item" :key="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">特殊属性</el-col>
          <el-col :span="18">
            <el-select v-model="editForm.spAttribute" style="width: 100%">
              <el-option
                v-for="(item, key) in specificity"
                :key="item.key"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import { APIMineInfo } from "../../api/product";
import {
  getAttributeInfoSpecialAttribute,
  getAttributeInfoCat,
  getAttributeInfoSubCat
} from "../../api/profit";
export default {
  data() {
    return {
      specificity: [],
      mainCategory: [],
      editForm: [],
      category: [],
      disabled: true,
      cate: [],
      subCate: [],
      condition:{
        id:null
      }
    };
  },
  methods: {
    getData(){
      APIMineInfo(this.condition).then(res => {
        if(res.data.code==200){
          this.editForm=res.data.data.basicInfo
        }else{
          this.$message.error(res.data.message);
        }
      })
    },
    productcategory() {
      if (this.editForm.cat !== "") {
        this.subCate = [];
        const val = this.editForm.cat;
        for (var key in this.subCae) {
          if (this.subCae[key] == val) {
            this.subCate.push(key);
          }
        }
        if (this.subCate.length != 0) {
          this.editForm.subCat = this.subCate[0];
        } else {
          this.editForm.subCat = "";
        }
      }
    }
  },
  mounted() {
    this.condition.id = this.$route.params.id;
    this.getData();
    getAttributeInfoSpecialAttribute().then(response => {
      this.specificity = response.data.data;
    });
    getAttributeInfoCat().then(response => {
      this.category = this.cate = response.data.data;
    });
    getAttributeInfoSubCat().then(response => {
      this.subCae = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.top15 {
  margin-top: 15px;
}
.titCenter {
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.w98 {
  width: 98%;
  margin: auto;
}
.image {
  width: 100px;
  height: 90px;
  margin-left: 10px;
}
.essential {
  width: 97%;
  margin: auto;
  font-size: 16px;
  line-height: 45px;
  font-weight: normal;
  padding-left: 18px;
  margin-top: 15px;
  border-left: 2px solid #2395f1;
}
.spsz {
  font-size: 15px;
  font-weight: normal;
  line-height: 40px;
  padding: 0;
  margin: 0;
  float: left;
  margin-right: 10px;
}
.textZt {
  line-height: 38px;
  text-align: center;
}
.sx {
  background: #eee;
  text-align: center;
  line-height: 34px;
  margin-left: 15px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  float: right;
  font-size: 13px;
  border: #eee solid 1px;
}
.sx:nth-child(4) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(3) {
  background: #fef0f0;
  color: #f56c6c;
  border: #fbc4c4 solid 1px;
}
.sx:nth-child(1) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(2) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:hover {
  background: #409eff;
  color: #fff;
}
.sx:nth-child(3):hover {
  background: #f56c6c;
  color: #fff;
}
.ss {
  text-align: center;
  line-height: 38px;
  margin-left: 10px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 20px;
  float: left;
  color: red;
}
.adres {
  font-weight: normal;
  margin-top: 15px;
  margin-left: 5px;
}
.xzz {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 3px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.xzz1 {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 8px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
@media screen and (max-width: 1300px) {
  .titCenter {
    font-size: 13px;
  }
}
</style>