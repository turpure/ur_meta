<template>
  <section>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label='Wish'
                   name='first'>
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
            <el-col :span="24">
              <el-form-item label="SKU">
                <el-input size="small"
                          v-model="wishForm.SKU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否备货">
                <el-input v-model="wishForm.stockUp"
                          size="small"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主图">
                <el-input v-model="wishForm.mainImage"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <img :src='wishForm.mainImage'
                   style="width:80px;height:80px;">
            </el-col>
            <el-row>
              <el-col :span="10">
                <el-form-item label="附加图">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
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
                <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
              </span>
              <br>
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
              <br>
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
      </el-tab-pane>
      <el-tab-pane label="eBay"
                   name='second'>
        <el-col :span="24">
          <el-button>保存当前数据</el-button>
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
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
          </el-select>
          <el-button>导出所选账号</el-button>
        </el-col>
        <h3 class="toolbar"
            style="padding:5px;margin:10px;">基本信息</h3>
        <el-form :model="wishForm"
                 :inline="true"
                 label-width="90px"
                 ref="wishForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="SKU">
                <el-input size="small"
                          v-model="wishForm.SKU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否备货">
                <el-input v-model="wishForm.stockUp"
                          size="small"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主图">
                <el-input v-model="wishForm.mainImage"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <img :src='wishForm.mainImage'
                   style="width:80px;height:80px;">
            </el-col>
            <el-row>
              <el-col :span="10">
                <el-form-item label="附加图">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" ">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-button>增加</el-button>
                <el-button>删除</el-button>
                <el-button>上移动</el-button>
                <el-button>下移动</el-button>
              </el-col>
              <el-col :span="14">
                <img src=''
                     style="width:50px;height:50px;">
              </el-col>
            </el-row>
            <el-col :span="6">
              <el-form-item label="商品所在地">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="国家">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮编">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="备货天数">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="toolbar"
              style="padding:5px;margin:10px;">站点组</h3>
          <el-form-item label="站点">
            <el-select size="small"
                       v-model="select">
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
              <el-input size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="刊登分类2">
              <el-input size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="子标题">
              <el-input size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最前关键词">
              <span>
                <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
              </span>
              <br>
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
              <br>
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
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="UPC">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="EAN">
            <el-input size="small"></el-input>
          </el-form-item>
          <h3 class="toolbar"
              style="padding:5px;margin:10px;">物品属性</h3>
          <el-form-item label="属性名称">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="属性内容">
            <el-input size="small"></el-input>
          </el-form-item>
          <h3 class="toolbar"
              style="padding:5px;margin:10px;">物流设置</h3>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import { APIPlatInfo } from '../../api/product'
export default {
  data() {
    return {
      select: '',
      select1: '',
      activeName: 'first',
      wishForm: {},
      mainForm: {},
      condition: {
        id: 5,
        plat: 'wish'
      }
    }
  },
  methods: {
    handleClick() {},
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
section {
  padding-bottom: 40px;
}
</style>

