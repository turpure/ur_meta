<template>
  <section>
      <el-button @click="keep()">保存当前数据</el-button>
      <el-button>保存并完善</el-button>
      <el-select v-model="select"
                 placeholder="--所有仓储--">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-select v-model="select"
                 placeholder="--所有账号--">
        <el-button plain
                   type="info">全选</el-button>
        <el-button plain
                   type="info">取消</el-button>
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-button>导出所选账号</el-button>
    <el-col :span="24" style="padding: 0">
      <h3 class="toolbar essential">基本信息</h3>
    </el-col>
    <el-form :model="wishForm"
             :inline="true"
             label-width="80px"
             ref="wishForm">
      <el-row>
        <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-col :span="24" style="margin-bottom: 20px;margin-top: 10px">
              <el-col :span="2" class="textZt">
              主图
              </el-col>
              <el-col :span="22">
              <el-input v-model="wishForm.mainPage">

              </el-input>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="2" class="textZt">
                SKU
              </el-col>
              <el-col :span="22">
                <el-input v-model="wishForm.sku">

                </el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px;margin-top: 20px">
              <el-col :span="2" class="textZt">
                是否备货
              </el-col>
              <el-col :span="22">
                <el-input v-model="wishForm.stockUp" :disabled="true">

                </el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 0px;margin-top: 0">
              <el-col :span="2" class="textZt">
                附加图
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="10">
            <img :src="wishForm.mainPage"
                 style="display: block;margin-left: 20px" />
          </el-col>
        </el-col>
          </el-row>
        <el-row>
          <el-col :span="24" v-for="item in wishForm.extraPage">
            <el-col :span="8" style="margin-left: 15px;margin-top: 10px">
              <el-input :value="item">

              </el-input>
            </el-col>
            <el-col :span="1" class="sx">
             增加
            </el-col>
            <el-col :span="1" class="sx">
              删除
            </el-col>
            <el-col :span="1" class="sx">
              上移动
            </el-col>
            <el-col :span="1" class="sx">
              下移动
            </el-col>
            <el-col :span="1">
              <img :src="item"
                   style="display: block;margin-left: 20px;width: 60px;height: 60px" />
            </el-col>
          </el-col>
        </el-row>
        <!--<el-row v-for="item in wishForm.extraPage">-->
          <!--<el-col :span="3">-->
            <!--<div style="margin-left:80px;">附加图</div>-->
            <!--<img :src="item"-->
                 <!--style="width:100px;height:90px;margin-left:80px;" />-->
          <!--</el-col>-->
          <!--<el-col :span="21">-->
            <!--<el-form-item label="">-->
              <!--<el-input size="small"-->
                        <!--style="width:1390px;" :value="item"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-button size="small">-->
            <!--<font size="3">增加</font>-->
          <!--</el-button>-->
          <!--<el-button size="small">-->
            <!--<font size="3">删除</font>-->
          <!--</el-button>-->
          <!--<el-button size="small">-->
            <!--<font size="3">上移动</font>-->
          <!--</el-button>-->
          <!--<el-button size="small">-->
            <!--<font size="3">下移动</font>-->
          <!--</el-button>-->
        <!--</el-row>-->
          <el-col :span="6" style="margin-top: 15px">
            <h3 class="spsz" style="margin-left: 16px">
              商品所在地
            </h3>
              <el-input size="small"
                        style="width:245px; margin-top: 4px" v-model="wishForm.location"></el-input>
          </el-col>
        <el-col :span="6" style="margin-top: 15px">
          <h3 class="spsz">
            国家
          </h3>
          <el-input size="small"
                    style="width:245px; margin-top: 4px" v-model="wishForm.country"></el-input>
        </el-col>
        <el-col :span="6" style="margin-top: 15px">
          <h3 class="spsz">
            邮编
          </h3>
          <el-input size="small"
                    style="width:245px; margin-top: 4px" v-model="wishForm.postCode"></el-input>
        </el-col>
        <el-col :span="6" style="margin-top: 15px">
          <h3 class="spsz">
            备货天数
          </h3>
          <el-input size="small"
                    style="width:245px; margin-top: 4px" v-model="wishForm.prepareDay"></el-input>
        </el-col>
      </el-row>
      <el-col :span="24" style="padding: 0">
        <h3 class="toolbar essential">站点组</h3>
      </el-col>
      <el-form-item label="站点">
        <!--<el-select size="small"-->
                   <!--v-model="select"-->
                   <!--style="width:245px;">-->
          <!--<el-option label="美国站"-->
                     <!--value="美国站"></el-option>-->
          <!--<el-option label="中国站"-->
                     <!--value="中国站"></el-option>-->
        <!--</el-select>-->
        <el-input size="small"
                  style="width:245px;" v-model="wishForm.site" :disabled="true"></el-input>
      </el-form-item>
      <el-col :span="24" style="padding: 0">
        <h3 class="toolbar essential">多属性</h3>
      </el-col>
      <el-col :span="24" style="padding: 0">
      <el-button type="primary" style="margin: 10px 0" @click="outerVisible = true">设置多属性</el-button>
      </el-col>
      <el-col :span="24" style="padding: 0">
        <h3 class="toolbar essential">主信息</h3>
      </el-col>
      <el-col :span="6">
        <el-form-item label="刊登分类">
          <el-input size="small"
                    style="width:245px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="刊登分类2">
          <el-input size="small"
                    style="width:245px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标题">
          <el-input size="small"
                    style="width:245px;" v-model="wishForm.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="子标题">
          <el-input size="small"
                    style="width:245px;" v-model="wishForm.subTitle"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最前关键词">
          <span>
            <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4
            Colors/5Pcs Set…
          </span>
          <br />
          <el-input size="small"
                    style="width:1500px"
                    placeholder="--一个关键词--" v-model="wishForm.headKeywords"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="必选关键词">
          <span>
            <font style="color: red">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
          </span>
          <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
          <div>
            必填
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="随机关键词">
          <span>
            <font style="color: red">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
          </span>
          <el-button type="text" @click="dialogTable = true">批量设置</el-button>
          <div>
            必填
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最后关键词">
          <span>
            <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
          </span>
          <br />
          <el-input size="small"
                    style="width: 1500px"
                    placeholder="--最多一个关键词--" v-model="wishForm.tailKeywords"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="描述">
          <el-input size="small"
                    v-model="wishForm.description"
                    type="textarea"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
      <el-form-item label="数量">
        <el-input size="small"
                  style="width:430px;" v-model="wishForm.quantity"></el-input>
      </el-form-item>
      <el-form-item label="UPC">
        <el-input size="small"
                  style="width:430px;" v-model="wishForm.UPC"></el-input>
      </el-form-item>
      <el-form-item label="EAN">
        <el-input size="small"
                  style="width:430px;" v-model="wishForm.EAN"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="24" style="padding: 0">
        <h3 class="toolbar essential">物品属性</h3>
      </el-col>
      <el-table :data="tableData"
                style="width:100%;">
        <el-table-column label="属性名称"
                         prop="a">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.a"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="属性内容"
                         prop="b">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.b"></el-input>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="small"
                       @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 20px;margin-left: 10px;margin-bottom: 10px" type="primary" @click="increase">增加属性</el-button>
      <el-col :span="24" style="padding: 0">
        <h3 class="toolbar essential">物流设置</h3>
      </el-col>
      <el-col :span="12">
        <h4>境内运输方式</h4>
        <el-form-item label="运输方式1">
          <el-select size="small"
                     v-model="select"
                     placeholder="--境内物流选择--">
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="续件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="运输方式2">
          <el-select size="small"
                     v-model="select"
                     placeholder="--境内物流选择--">
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="续件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <h4>境外运输方式</h4>
        <el-form-item label="运输方式1">
          <el-select size="small"
                     v-model="select"
                     placeholder="--境外物流选择--">
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="续件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="运输方式2">
          <el-select size="small"
                     v-model="select"
                     placeholder="--境外物流选择--">
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
        <el-form-item label="续件运费">
          <el-input size="small"
                    placeholder="--USD--"
                    style="width:216px;"></el-input>
        </el-form-item>
      </el-col>
      <el-dialog title="批量增加关键词" :visible.sync="dialogTableVisible">
        <el-input size="small"
                  type="textarea" :rows="20" placeholder="-多个必选关键词-"></el-input>
      </el-dialog>
      <el-dialog title="批量增加关键词" :visible.sync="dialogTable">
        <el-input size="small"
                  type="textarea" :rows="20" placeholder="-多个随机关键词-"></el-input>
      </el-dialog>
      <el-dialog title="" :visible.sync="outerVisible" style="padding: 0" width="90%">
        <el-row>
          <el-col :span="24">
            <el-col :span="18">
              多属性设置
            </el-col>
            <el-col :span="6" style="text-align: right">
              第1-12条共12条数据
            </el-col>
          </el-col>
        </el-row>
        <!--<el-button  @click="innerVisible = true">添加属性</el-button>-->
        <el-table :data="tabDate">
          <el-table-column type="selection"
                           align="center"
                           header-align="center"></el-table-column>
          <el-table-column type="index"
                           align="center"
                           header-align="center">
          </el-table-column>
          <el-table-column label="操作"
                           header-align="center"
                           align="center">
            <template slot-scope="scope">
              <el-tooltip content="删除">
                <i class="el-icon-delete"
                   @click="del(scope.$index, scope.row)"
                   style="color:#409EFF;cursor:pointer;"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="SKU"
                           prop="sku"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.sku"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量"
                           prop="color"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.quantity"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格"
                           prop="size"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.retailPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="图片地址"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.imageUrl"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="图片"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl"
                   style="width:50px;height:50px;">
            </template>
          </el-table-column>
          <el-table-column label="Color"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.property.Color"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Size"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.property.Size"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="款式3"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.property.Color"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="CPU"
                           prop="imageUrl"
                           header-align="center">
            <template slot-scope="scope">
              <el-input size="small"
                        v-model="scope.row.property.Color"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
                width="30%"
                title="添加属性"
                :visible.sync="innerVisible"
                append-to-body>
        </el-dialog>
      </el-dialog>
    </el-form>
  </section>
</template>
<script type="text/ecmascript-6">
  import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
  import { APISaveEbayInfo } from '../../api/platebay'
  export default {
    data() {
      return {
        select: '',
        select1: '',
        wishForm: {},
        mainForm: {},
        dialogTableVisible:false,
        dialogTable:false,
        outerVisible:false,
        innerVisible:false,
        tabDate:[],
        tableData: [
          {
            a:"Brand",
            b:"Unbranded"
          }
        ],
        condition: {
          id: 5,
          plat: 'ebay'
        }
      }
    },
    methods: {
      increase(){
        let obj={}
        this.tableData.push(obj)
      },
      getData() {
        APIPlatInfo(this.condition).then(res => {
          this.wishForm = res.data.data.basicInfo
          this.tabDate = res.data.data.skuInfo
//          this.tableData= res.data.data.skuInfo
          this.wishForm.site==0?this.wishForm.site="美国":""
          this.wishForm.extraPage= this.wishForm.extraPage.split("\\n")
          this.wishForm.extraPage.pop()
          console.log(this.wishForm.extraPage)
      })
      },
      keep(){
        let data = {
          basicInfo: {
            "id":3,
            "SKU": this.wishForm.sku,
            "title": this.wishForm.title,
            "description": this.wishForm.description,
            inventory: 10000,
            price: '0.00',
            msrp: '0.00',
            shipping: '0.00',
            shippingTime: '7-21',
            "tags": "",
            "mainImage": this.wishForm.mainPage,
            "goodsId": null,
            "infoId": 5,
            "extraImages": "enim",
            "headKeywords": null,
            "requiredKeywords": null,
            "randomKeywords": null,
            "tailKeywords": null,
            "wishTags": null,
            "stockUp": "否"
          },
          skuInfo: []
        }
        // data.basicInfo = this.wishForm
        data.skuInfo = this.tableData
        APISaveEbayInfo(data).then(res => {
          if (res.data.data[0] === 'success') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
      }
    },
    mounted() {
      this.getData()
      console.log(this.$route.params.id)
    }
  }
</script>
<style lang="scss" scoped>
  section {
    padding-bottom: 40px;
    margin-top: 15px;
    margin-left: 10px;
  }
  .essential{
    font-size: 16px;
    line-height: 45px;
    font-weight: normal;
    padding-left: 18px;
    border-left: 3px solid #2395f1;
  }
  .spsz{
    font-size: 15px;
    font-weight: normal;
    line-height: 40px;
    padding: 0;
    margin: 0;
    float: left;
    margin-right: 10px;
  }
  .textZt{
    line-height: 38px;
    text-align: center;
  }
  .sx{
    background: #eee;
    text-align: center;
    line-height: 38px;
    margin-left: 10px;
    margin-top: 12px;
    border-radius: 3px;
    cursor: pointer;
  }
</style>