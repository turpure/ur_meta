<template>
  <section>
    <el-col :span="24"
            style="position:fixed;bottom:10px;left:30%;z-index:1000">
      <el-button type="primary">保存当前数据</el-button>
      <el-button type="primary">保存并完善</el-button>
      <el-select v-model="select"
                 placeholder="--所有仓储--">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-select v-model="select"
                 placeholder="--所有账号--">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-button type="primary">导出所选账号</el-button>
    </el-col>
    <h3 class="toolbar"
        style="padding:5px;margin:10px;">基本信息</h3>
    <el-form :model="wishForm"
             :inline="true"
             label-width="80px"
             ref="wishForm">
      <el-row>
        <el-col :span="5">
          <el-form-item label=" ">
            <img src="wishForm.mainImage"
                 style="width:220px;height:150px;" />
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="主图">
            <el-input v-model="wishForm.mainImage"
                      size="small"
                      style="width:1170px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="SKU">
            <el-input size="small"
                      v-model="wishForm.SKU"
                      style="width:1170px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="是否备货">
            <el-input v-model="wishForm.stockUp"
                      size="small"
                      disabled
                      style="width:1170px;"></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div style="margin-left:80px;">附加图16</div>
            <img src=""
                 style="width:100px;height:90px;margin-left:80px;" />
          </el-col>
          <el-col :span="21">
            <el-form-item label="">
              <el-input size="small"
                        style="width:1390px;"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small">
            <font size="3">增加</font>
          </el-button>
          <el-button size="small">
            <font size="3">删除</font>
          </el-button>
          <el-button size="small">
            <font size="3">上移动</font>
          </el-button>
          <el-button size="small">
            <font size="3">下移动</font>
          </el-button>
        </el-row>
        <el-col :span="6">
          <el-form-item label="商品所在地">
            <el-input size="small"
                      style="width:245px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="国家">
            <el-input size="small"
                      style="width:245px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮编">
            <el-input size="small"
                      style="width:245px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备货天数">
            <el-input size="small"
                      style="width:245px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="toolbar"
          style="padding:5px;margin:10px;">站点组</h3>
      <el-form-item label="站点">
        <el-select size="small"
                   v-model="select"
                   style="width:245px;">
          <el-option label="美国站"
                     value="美国站"></el-option>
          <el-option label="中国站"
                     value="中国站"></el-option>
        </el-select>
      </el-form-item>
      <h3 class="toolbar"
          style="padding:5px;margin:10px;">多属性</h3>
      <el-button>设置多属性</el-button>
      <h3 class="toolbar"
          style="padding:5px;margin:10px;">主信息</h3>
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
                    style="width:245px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="子标题">
          <el-input size="small"
                    style="width:245px;"></el-input>
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
                    placeholder="--一个关键词--"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="必选关键词">
          <span>
            <font style="color: red">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
          </span>
          <el-button type="text">批量设置</el-button>
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
          <el-button type="text">批量设置</el-button>
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
                    placeholder="--最多一个关键词--"></el-input>
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
      <el-form-item label="数量">
        <el-input size="small"
                  style="width:430px;"></el-input>
      </el-form-item>
      <el-form-item label="UPC">
        <el-input size="small"
                  style="width:430px;"></el-input>
      </el-form-item>
      <el-form-item label="EAN">
        <el-input size="small"
                  style="width:430px;"></el-input>
      </el-form-item>
      <h3 class="toolbar"
          style="padding:5px;margin:10px;">物品属性</h3>
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
      <el-button style="margin-left:1%;">增加属性</el-button>
      <h3 class="toolbar"
          style="padding:5px;margin:10px;">物流设置</h3>
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
    </el-form>
  </section>
</template>
<script>
import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
export default {
  data() {
    return {
      select: '',
      select1: '',
      wishForm: {},
      mainForm: {},
      tableData: [
        {
          a: 'Brand',
          b: 'Unbranded'
        }
      ],
      condition: {
        id: 5,
        plat: 'eBay'
      }
    }
  },
  methods: {
    getData() {
      APIPlatInfo(this.condition).then(res => {
        this.wishForm = res.data.data.basicInfo
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
</style>
