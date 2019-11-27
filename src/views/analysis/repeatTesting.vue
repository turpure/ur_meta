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
    <div class="w90" :style="obj1" v-loading="imgLoading">
      <el-row>
        <el-col :span="4" v-for="(item,index) in imageArr" :key="index">
          <img :src="item.PicName" class="imageSty" />
        </el-col>
      </el-row>
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
  padding: 15px 12px;
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
  height: 220px;
  border: #ccc solid 1px;
  margin: 0 2.5%;
  margin-bottom: 10px;
}
.floet01 {
  float: left;
  margin-right: 15px;
}
@media screen and (max-width: 1500px) {
  .imageSty {
    width: 95%;
    margin: auto;
    height: 150px;
    border: #ccc solid 1px;
    margin: 0 2.5%;
    margin-bottom: 10px;
  }
}
</style>