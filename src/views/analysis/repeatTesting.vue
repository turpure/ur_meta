<template>
  <section class="tabheught" :style="obj">
    <div class="w95">
      <div class="floet">
        <div class="floet01" style="margin-left:5px;">
          <el-input
            v-model="condition.imageUrl"
            size="small"
            placeholder="请输入图片URL地址"
            style="width:550px;"
          ></el-input>
        </div>
        <div class="floet01">
          <el-button size="small" type="primary" @click="seach">搜索</el-button>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <div class="imgDiv">
        <img :src="condition.imageUrl" class="imageSty" />
      </div>
    </div>
    <div class="w90" :style="obj1" v-loading="imgLoading">
        <div v-for="(item,index) in imageArr" :key="index" class="imgDiv">
          <img :src="item.PicName" class="imageSty" />
        </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { formImageSearch } from "../../api/product";
export default {
  data() {
    return {
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      obj1: {
        height: window.innerHeight - 145 + "px"
      },
      imgLoading: false,
      imageArr: [],
      condition: {
        imageUrl: null
      }
    };
  },
  methods: {
    seach() {
      this.imgLoading = true;
      formImageSearch(this.condition).then(res => {
        this.imageArr = res.data.data.Auctions;
        this.imgLoading = false;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tabheught {
  background: #eee;
  overflow: hidden;
}
.w95 {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding: 15px 6px;
  border-radius: 5px;
}
.w90 {
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 15px;
}
.floet {
  overflow: hidden;
}
.imageSty {
  width: 95%;
  margin: auto;
  height: 240px;
  border: #ccc solid 1px;
  margin-bottom: 10px;
}
.floet01 {
  float: left;
  margin-right: 15px;
}
.imgDiv{
    width: 20%;
    float: left;
}
@media screen and (max-width: 1500px) {
  .imageSty {
    width: 92%;
    margin: auto;
    height: 180px;
    border: #ccc solid 1px;
    margin-bottom: 10px;
  }
}
</style>