<template>
  <section class="tabheught" :style="obj">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="background: #fff;">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div class="w95">
      2121  
    </div> 
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from '../../api/login'
export default {
  data() {
    return {
      index:1,
      activeName: 'first',
      obj:{
        'height':(window.innerHeight-60)+'px',
      },
      allMenu:[],
      // ]
    }
  },
  methods: {
    handleClick(){

    },
  },
  mounted() {
   getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/products-engine/index");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/products-engine/dashboard") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
}
</script>

<style lang="scss" scoped>
.tabheught{
  background: #eee;
}
.w95{
  width: 98%;
  overflow: hidden;
  margin-left: 0.7%;
}
</style>

