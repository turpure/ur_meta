<template>
  <section>
    <div style="position:fixed;bottom:10px;left:30%;z-index:1000">
      <el-button type="primary">更新</el-button>
      <el-button type="primary">Wish保存并完善</el-button>
      <el-button type="success">导出ibay模板</el-button>
      <el-button type="primary">Joom保存并完善</el-button>
      <el-select v-model="select1"
                 placeholder="--请选择账号--">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-button type="info">导出Joom模板</el-button>
    </div>
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
                 style="width:250px;height:150px;" />
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
            <div style="margin-left:80px;">附加图1</div>
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
            <div style="margin-left:80px;">附加图2</div>
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
            <div style="margin-left:80px;">附加图3</div>
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
            <div style="margin-left:80px;">附加图4</div>
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
            <div style="margin-left:80px;">附加图5</div>
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
            <div style="margin-left:80px;">附加图6</div>
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
            <div style="margin-left:80px;">附加图7</div>
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
            <div style="margin-left:80px;">附加图8</div>
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
            <div style="margin-left:80px;">附加图9</div>
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
            <div style="margin-left:80px;">附加图10</div>
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
            <div style="margin-left:80px;">附加图11</div>
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
            <div style="margin-left:80px;">附加图12</div>
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
            <div style="margin-left:80px;">附加图13</div>
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
            <div style="margin-left:80px;">附加图14</div>
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
            <div style="margin-left:80px;">附加图15</div>
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
            <div style="margin-left:80px;">附加图17</div>
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
            <div style="margin-left:80px;">附加图18</div>
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
      </el-row>
    </el-form>
    <h3 class="toolbar"
        style="padding:5px;margin:10px;">主信息</h3>
    <el-form :model="wishForm"
             :inline="true"
             label-width="100px">
      <el-col :span="24">
        <el-form-item label="关键词Tags:">
          <el-input size="small"
                    style="width:1500px;"></el-input>
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
      <el-col :span="24">
        <el-form-item label="数量">
          <el-input size="small"
                    v-model="wishForm.quantity"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="运输时间">
          <el-input size="small"
                    v-model="wishForm.prepareDay"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </section>
</template>
<script>
import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
export default {
  props: {
    // wishForm: {
    //   type: Object,
    //   default: {}
    // },
    id: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      select: '',
      select1: '',
      wishForm: {},
      mainForm: {},
      condition: {
        id: 5,
        plat: 'wish'
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
