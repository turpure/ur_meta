<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="show.edition">
      <edition></edition>
    </div>
    <div v-show="show.paypal">
      <paypal></paypal>
    </div>
    <div v-show="show.risk">
      <risk></risk>
    </div>
    <div v-show="show.risk1">
      <risk1></risk1>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  APIWishSuffix,
  APICreateWish,
  APIDeleteWish,
  APIWishInfo,
  APIUpdateWish
} from "../../api/product";
import { getMenu } from "../../api/login";
import edition from "./edition.vue";
import paypal from "./paypal.vue";
import risk from "./risk.vue";
import risk1 from "./risk1.vue";
export default {
  components: {
    edition,
    paypal,
    risk,
    risk1
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        edition: true,
        paypal: false,
        risk: false,
        risk1:false
      }
    };
  },
  methods: {
    addWish() {
      this.dialogPictureWish = true;
    },
    handleClick(tab, event) {
      if (tab.name === "/v1/tiny-tool/exception-edition") {
        this.show["edition"] = true;
      } else {
        this.show["edition"] = false;
      }
      if (tab.name === "/v1/tiny-tool/exception-pay-pal") {
        this.show["paypal"] = true;
      } else {
        this.show["paypal"] = false;
      }
      if (tab.name === "/v1/tiny-tool/risky-order") {
        this.show["risk"] = true;
      } else {
        this.show["risk"] = false;
      }
      if (tab.name === "/v1/tiny-tool/blacklist") {
        this.show["risk1"] = true;
      } else {
        this.show["risk1"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/tiny-tool/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/tiny-tool/exception") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>

<style lang="scss">
.contentt {
  margin-left: 20px;
  margin-top: 15px;
}
.content1 {
  margin-left: 20px;
  margin-top: 20px;
}
.basp {
  padding: 0;
  margin: 0;
  line-height: 40px;
}
.cTop {
  margin-top: 0px;
}
.baspj {
  text-align: center;
}
.top20 {
  margin-top: 25px;
}
.font14 {
  font-size: 14px;
}
.elTable td {
  padding: 16px 0 !important;
}
// .el-input__inner{
//   padding: 0 10px;
// }
</style>
