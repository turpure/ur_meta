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
      <div v-show="show.wish">
        <div class="proBox">
          <div class="proCase01" v-for="(item,index) in nostockdata" :key="index">
            <div class="priImg">
              <img
                :src="'https://contestimg.wish.com/api/webimage/'+item.pid+'-medium.jpg'"
                @click="goLinkUrl(item.pid)"
              />
            </div>
            <span class="corner">{{corner}}</span>
            <a class="justa">{{item.pname}}</a>
            <div class="proText">
              <div class="pro01">
                <p>
                  评论数
                  <span class="pred">{{item.num_rating}}</span>
                </p>
                <p>
                  评分
                  <span class="pred">{{item.rating}}</span>
                </p>
              </div>
              <div class="pro01">
                <p>
                  USD
                  <span class="pblue">{{item.price}}</span>
                </p>
                <p>
                  销售量
                  <span class="pblue">{{item.max_num_bought}}</span>
                </p>
              </div>
              <p style="text-align:left;margin-left:8px;margin-top:5px;">
                上架时间
                <span class="pblue">{{item.gen_time | cutOutMonye}}</span>
              </p>
              <div class="pbottom">
                <a class="goDev" @click="submission('https://contestimg.wish.com/api/webimage/'+item.pid+'-medium.jpg','https://www.wish.com/product/'+item.pid,item.price)">立即开发</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="show.ebay">
        <div class="proBox">
          <div class="proCase01" v-for="(item,index) in dataEbay" :key="index">
            <div class="priImg">
              <img :src="item.main_image" @click="goLinkUrlEbay(item.item_url)" />
            </div>
            <span class="corner">{{corner}}</span>
            <a class="justa">{{item.title}}</a>
            <div class="proText">
              <div class="pro01">
                <p>
                  总销量
                  <span class="pred">{{item.sold}}</span>
                </p>
                <p>
                  周销售量
                  <span class="pred">{{item.sales_week1}}</span>
                </p>
              </div>
              <div class="pro01">
                <p>
                  USD
                  <span class="pblue">{{item.price}}</span>
                </p>
                <p>
                  收藏数
                  <span class="pblue">{{item.watchers}}</span>
                </p>
              </div>
              <p style="text-align:left;margin-left:8px;margin-top:5px;">
                上架时间
                <span class="pblue">{{item.gen_time | cutOutMonye}}</span>
              </p>
              <div class="pbottom">
                <a class="goDev" @click="submission(item.main_image,item.item_url,item.price)">立即开发</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="show.joom">
        <div class="proBox">
          <div class="proCase01" v-for="(item,index) in dataJoom" :key="index">
            <div class="priImg">
              <img :src="item.mainImage" @click="goLinkUrlJoom(item.productId)" />
            </div>
            <span class="corner">{{corner}}</span>
            <a class="justa">{{item.productName}}</a>
            <div class="proText">
              <div class="pro01">
                <p>
                  评论数
                  <span class="pred">{{item.reviewsCount}}</span>
                </p>
                <p>
                  评分
                  <span class="pred">{{item.rating}}</span>
                </p>
              </div>
              <div class="pro01">
                <p>
                  USD
                  <span class="pblue">{{item.price}}</span>
                </p>
                <p>
                  推荐指数
                  <span class="pblue">{{item.hot_index}}</span>
                </p>
              </div>
              <p style="text-align:left;margin-left:8px;margin-top:5px;">
                上架时间
                <span class="pblue">{{item.publishedDate | cutOutMonye}}</span>
              </p>
              <div class="pbottom">
                <a class="goDev" @click="submission(item.mainImage,'https://www.joom.com/en/products/'+item.productId,item.price)">立即开发</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APRecommendWish, APRecommendEbay,APRecommendJoom,forwardCreateEngine } from "../../api/product";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 160,
      show: {
        wish: true,
        ebay: false,
        joom:false
      },
      allMenu: ["Wish", "Ebay", "Joom", "Amazon", "Aliexpress"],
      listLoading: false,
      corner: "Wish",
      activeName: "Wish",
      developer: [],
      purchaser: [],
      goodsState: [],
      nostockdata: [],
      dataEbay: [],
      dataJoom:[]
    };
  },
  filters: {
    cutOutMonye: function(value) {
      if (!value) return "";
      value = value.substring(0,11);
      return value;
    }
  },
  methods: {
    goLinkUrl(id){
      window.open('https://www.wish.com/product/'+id)
    },
    goLinkUrlJoom(id){
      window.open('https://www.joom.com/en/products/'+id)
    },
    goLinkUrlEbay(url){
      window.open(url)
    },
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.corner = "Wish";
        if(this.nostockdata.length==0){
          this.getDataWish()
        }
        this.show.wish = true;
      } else {
        this.show.wish = false;
      }
      if (tab.name === "Ebay") {
        this.corner = "Ebay";
        if(this.dataEbay.length==0){
          this.getDataEbay()
        }
        this.show.ebay = true;
      } else {
        this.show.ebay = false;
      }
      if (tab.name === "Joom") {
        this.corner = "Joom";
        if(this.dataJoom.length==0){
          this.getDataJoom()
        }
        this.show.joom = true;
      }else{
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
    submission(a,b,c){
      var condition={
        "img": a, 
        "cate": "女人世界", 
        "subCate": "女包", 
        "vendor1": null, 
        "origin1":b , 
        "developer": null, 
        "introReason": null, 
        "stockUp": "否", 
        "salePrice": c, 
        "type": "create", 
        "flag": "backward", 
        "hopeMonthProfit": null }
      forwardCreateEngine(condition).then(res => {
        if(res.data.code==200){
          this.$message({
              message: "开发成功",
              type: "success"
            });
        }
      });
    },
    getDataEbay() {
      this.listLoading = true;
      APRecommendEbay().then(res => {
        this.dataEbay = res.data.data;
        this.listLoading = false;
      });
    },
    getDataJoom() {
      this.listLoading = true;
      APRecommendJoom().then(res => {
        this.dataJoom = res.data.data;
        this.listLoading = false;
      });
    },
    getDataWish() {
      this.listLoading = true;
      APRecommendWish().then(res => {
        this.nostockdata = res.data.data;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getDataWish();
  }
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
.proCase01:hover{
  border: 5px solid #2298a2;
}
.proCase01:hover .priImg img{
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
</style>
