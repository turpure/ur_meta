<template>
  <section>
    <div>
      <el-tabs
        v-model="activeName"
        type="card"
        style="background-color:#fff"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="(item, index) in this.allMenu" :label="item" :name="item" :key="index"></el-tab-pane>
      </el-tabs>
      <div v-show="show.wish">1</div>
      <div v-show="show.ebay">
        <div class="ebayCase">
          <span class="ebayText" @click="tabEbayXp">
            <span class="ebayactive" :class="ebayStlye==0?'ebayActive':''"></span>新品规则
          </span>
          <span class="ebayText" @click="tabEbayRx">
            <span class="ebayactive" :class="ebayStlye==1?'ebayActive':''"></span>热销规则
          </span>
          <el-button type="success" size="small" @click="addEbayxpLogin()" style="margin-right:0.5%;float:right"><i class="el-icon-plus"></i>添加ebay新品规则</el-button>
        </div>
        <div v-show="ebay.xp">
          <el-table
            :data="ebaydata"
            class="elTableee"
            border
            :header-cell-style="getRowClass"
            style="width:98%;margin-left:0.7%;margin-top:15px;"
          >
            <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" align="center" width="80">
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
            <el-table-column property="soldStart" label="销量大于" align="center" fixed></el-table-column>
            <el-table-column property="soldEnd" label="销量小于" align="center" fixed></el-table-column>
            <el-table-column property="visitStart" label="浏览数大于" align="center"></el-table-column>
            <el-table-column property="visitEnd" label="浏览数小于" align="center"></el-table-column>
            <el-table-column property="priceEnd" label="价格小于" align="center"></el-table-column>
            <el-table-column property="priceStart" label="价格大于" align="center"></el-table-column>
            <el-table-column property="country" label="站点" align="center"></el-table-column>
            <el-table-column property="storeLocation" label="店铺地址" align="center"></el-table-column>
            <el-table-column property="salesThreeDayFlag" label="连续三天销量" align="center"></el-table-column>
            <el-table-column property="listedTime" label="上架时间" align="center"></el-table-column>
            <el-table-column property="itemLocation" label="发货地址" align="center"></el-table-column>
            <el-table-column property="creator" label="创建人" align="center"></el-table-column>
            <el-table-column property="createdDate" label="创建时间" align="center">
              <template scope="scope">{{scope.row.createdDate | cutOutMonye}}</template>
            </el-table-column>
            <el-table-column property="updatedDate" label="更新时间" align="center">
              <template scope="scope">{{scope.row.updatedDate | cutOutMonye}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="ebay.rx">ebay热销</div>
      </div>
      <div v-show="show.joom">2</div>
      <el-dialog title="ebay新品编辑" :visible.sync="ebaydisLoginxp" width="65%">
        <el-row style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">销量大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.soldStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">销量小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.soldEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">浏览数大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.visitStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">浏览数小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.visitEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">价格大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.priceStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">价格小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.priceEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">站点</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.country"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">店铺地址</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.storeLocation"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">连续三天销量</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.salesThreeDayFlag"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.listedTime"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">发货地址</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="ebayXp.itemLocation"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ebaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="saveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加ebay新品规则" :visible.sync="addEbaydisLoginxp" width="65%">
        <el-row style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">销量大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.soldStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">销量小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.soldEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">浏览数大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.visitStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">浏览数小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.visitEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">价格大于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.priceStart"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">价格小于</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.priceEnd"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">站点</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.country"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">店铺地址</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.storeLocation"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">连续三天销量</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.salesThreeDayFlag"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.listedTime"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12" style="margin-bottom: 20px">
              <el-col :span="5">
                <p class="basp">发货地址</p>
              </el-col>
              <el-col :span="19">
                <el-input v-model="addEbayXp.itemLocation"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEbaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="addSaveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APRengineRule, ebaySaveRule,ebaySaveRuleDelete } from "../../api/product";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 160,
      ebayStlye: 0,
      ebaydisLoginxp: false,
      addEbaydisLoginxp:false,
      ebayXp: {
        id: null,
        soldStart: null,
        soldEnd: null,
        visitStart: null,
        visitEnd: null,
        priceEnd: null,
        priceStart: null,
        country: null,
        storeLocation: null,
        salesThreeDayFlag: null,
        listedTime: null,
        itemLocation: null
      },
      addEbayXp: {
        soldStart: null,
        soldEnd: null,
        visitStart: null,
        visitEnd: null,
        priceEnd: null,
        priceStart: null,
        country: null,
        storeLocation: null,
        salesThreeDayFlag: null,
        listedTime: null,
        itemLocation: null
      },
      show: {
        wish: true,
        ebay: false,
        joom: false
      },
      ebay: {
        xp: true,
        rx: false
      },
      allMenu: ["Wish", "Ebay", "Joom", "Amazon", "Aliexpress"],
      listLoading: false,
      activeName: "Wish",
      ebaydata: []
    };
  },
  filters: {
    cutOutMonye: function(value) {
      if (!value) return "";
      value = value.substring(0, 11);
      return value;
    }
  },
  methods: {
    addEbayxpLogin(){
      this.addEbaydisLoginxp = true;
    },
    tabEbayXp() {
      this.ebayStlye = 0;
      this.ebay.xp = true;
      this.ebay.rx = false;
    },
    tabEbayRx() {
      this.ebayStlye = 1;
      this.ebay.xp = false;
      this.ebay.rx = true;
    },
    editArt(index, row) {
      this.ebaydisLoginxp = true;
      this.ebayXp.id = row.id;
      this.ebayXp.soldStart = row.soldStart;
      this.ebayXp.soldEnd = row.soldEnd;
      this.ebayXp.visitStart = row.visitStart;
      this.ebayXp.visitEnd = row.visitEnd;
      this.ebayXp.priceEnd = row.priceEnd;
      this.ebayXp.priceStart = row.priceStart;
      this.ebayXp.country = row.country;
      this.ebayXp.storeLocation = row.storeLocation;
      this.ebayXp.salesThreeDayFlag = row.salesThreeDayFlag;
      this.ebayXp.listedTime = row.listedTime;
      this.ebayXp.itemLocation = row.itemLocation;
    },
    saveEbayXp() {
      ebaySaveRule(this.ebayXp).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.ebaydisLoginxp = false;
          this.getDataEbay();
        }
      });
    },
    addSaveEbayXp(){
      ebaySaveRule(this.addEbayXp).then(res => {
        if (res.data.data) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.addEbaydisLoginxp = false;
          this.getDataEbay();
        }
      });
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
          ebaySaveRuleDelete(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDataEbay();
            }
          });
        })
        .catch(() => {});
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.corner = "Wish";
        this.show.wish = true;
      } else {
        this.show.wish = false;
      }
      if (tab.name === "Ebay") {
        this.corner = "Ebay";
        this.show.ebay = true;
        if (this.ebaydata.length == 0) {
          this.getDataEbay();
        }
      } else {
        this.show.ebay = false;
      }
      if (tab.name === "Joom") {
        this.corner = "Joom";
        this.show.joom = true;
      } else {
        this.show.joom = false;
      }
      if (tab.name === "Amazon") {
        this.corner = "Amazon";
      }
      if (tab.name === "Aliexpress") {
        this.corner = "Aliexpress";
      }
    },
    formatter(row, column) {
      return row.changeTime ? row.changeTime.substring(0, 16) : "";
    },
    getDataEbay() {
      this.listLoading = true;
      APRengineRule().then(res => {
        this.ebaydata = res.data.data;
        this.listLoading = false;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.clasRed {
  color: #c55 !important;
}
.clasGreen {
  color: #0e9a00;
}
.classa {
  color: #337ab7;
  text-decoration: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
.saleP {
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: right;
  padding-right: 10px;
}
.floet {
  overflow: hidden;
  width: 100%;
}
.floet01 {
  float: left;
  margin-right: 18px;
}
.winput {
  width: 140px;
}
.proBox {
  width: 100%;
  overflow: hidden;
}
.proCase01 {
  width: 12.26%;
  float: left;
  margin: 0 0.7%;
  margin-top: 15px;
  overflow: hidden;
  border: 5px solid #f0f0f0;
  background: rgb(243, 243, 243);
  position: relative;
}
.priImg {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.priImg img {
  display: block;
  width: 100%;
  height: 180px;
  cursor: pointer;
  transition: transform 0.3s;
}
.proText {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-top: #eee solid 1px;
}
.pro01 {
  width: 100%;
  overflow: hidden;
}
.proText p {
  margin: 0;
  padding: 0;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}
.proText p:first-child {
  float: left;
  margin-left: 5%;
}
.proText p:last-child {
  float: right;
  margin-right: 5%;
}
.pred {
  color: #ff7f00;
}
.pblue {
  color: #337ab7;
}
.pbottom {
  width: 100%;
  overflow: hidden;
}
.goDev {
  width: 95%;
  background: #3c8dbc;
  display: block;
  text-align: center;
  color: #fff;
  float: left;
  margin: auto;
  line-height: 28px;
  font-size: 13px;
  margin-left: 2.5%;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}
.goStore {
  width: 45%;
  background: #e6a23c;
  display: block;
  text-align: center;
  color: #fff;
  float: right;
  margin-right: 2%;
  line-height: 28px;
  font-size: 13px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}
.proCase01:hover {
  border: 5px solid #2298a2;
}
.proCase01:hover .priImg img {
  transform: scale(1.1);
}
@media (max-width: 1400px) {
  .floet01 {
    float: left;
    margin-right: 10px;
  }
  .justa {
    display: block;
    font-size: 10px;
    background: #fff;
    padding: 10px 5px;
    max-height: 50px;
    overflow: hidden;
  }
  .floet01 span {
    width: 70px;
    text-align: center;
    display: inline-block;
  }
  .winput {
    width: 100px;
  }
  .proCase01 {
    width: 17.7%;
    overflow: hidden;
    cursor: pointer;
  }
  .proText p:first-child {
    float: left;
    font-size: 14px;
  }
  .proText p:last-child {
    float: right;
    font-size: 14px;
  }
  .goDev {
    font-size: 14px;
  }
  .goStore {
    font-size: 14px;
  }
}
.justa {
  display: block;
  font-size: 12px;
  text-align: justify;
  line-height: 20px;
  background: #fff;
  padding: 10px 5px;
  height: 50px;
  overflow: hidden;
}
.corner {
  display: block;
  background: #3c8dbc;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 15px;
  right: -50px;
  width: 75%;
  line-height: 25px;
  transform: rotate(40deg);
}
.ebayCase {
  width: 98%;
  margin-left: 0.7%;
  border: 1px solid #e2e2e2;
  margin-top: 15px;
  background: #f8f8f8;
  padding: 6px 0;
  overflow: hidden;
  border-radius: 6px;
}
.ebayText {
  font-size: 14px;
  padding: 0 20px;
  display: block;
  float: left;
  cursor: pointer;
  margin-top: 5px;
}
.ebayactive {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  background: #fff;
  float: left;
  border: 1px solid #ccc;
  margin-top: 3px;
  margin-right: 10px;
}
.ebayActive {
  background: #fff;
  width: 4px;
  height: 4px;
  border: #409eff solid 5px;
}
.basp {
  text-align: center;
}
</style>
