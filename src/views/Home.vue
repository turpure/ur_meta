<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1" @click.native="rproduct" style="font-weight:bold;width:130px;">
            <template slot="title">产品中心</template>
          </el-submenu>
          <el-submenu index="2" @click.native="rm" style="font-weight:bold;width:150px;">
            <template slot="title">毛利润报表</template>
            <router-link to="/v1/report/sales-trend" style="text-decoration:none;">
              <el-menu-item index="2-1">销售额走势</el-menu-item>
            </router-link>
            <router-link to="/v1/report/sales" style="text-decoration:none;">
              <el-menu-item index="2-2">销售毛利润报表</el-menu-item>
            </router-link>
            <router-link to="/develop" style="text-decoration:none;">
              <el-menu-item index="2-3">开发毛利润报表</el-menu-item>
            </router-link>
            <router-link to="/purchase" style="text-decoration:none;">
              <el-menu-item index="2-4">采购毛利润报表</el-menu-item>
            </router-link>
            <router-link to="/artist" style="text-decoration:none;">
              <el-menu-item index="2-5">美工毛利润报表</el-menu-item>
            </router-link>
            <router-link to="/v1/report/introduce" style="text-decoration:none;">
              <el-menu-item index="2-6">推荐人毛利报表</el-menu-item>
            </router-link>
            <router-link to="/v1/report/account" style="text-decoration:none;">
              <el-menu-item index="2-7">账号产品利润表</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="3" @click.native="rdata" style="font-weight:bold;width:130px;">
            <template slot="title">数据中心</template>
            <router-link to="/v1/data-center/out-of-stock-info" style="text-decoration:none;">
              <el-menu-item index="3-1">缺货产品分析</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="4" @click.native="rsale" style="font-weight:bold;width:130px;">
            <template slot="title">销售工具</template>
            <router-link to="/v1/tool/ebay-template" style="text-decoration:none;">
              <el-menu-item index="4-1">eBay销售工具</el-menu-item>
            </router-link>
            <router-link to="/v1/tool/ebaysku-template" style="text-decoration:none;">
              <el-menu-item index="4-2">eBay工具</el-menu-item>
            </router-link>
            <router-link to="/v1/tool/wishsku-template" style="text-decoration:none;">
              <el-menu-item index="4-3">Wish工具</el-menu-item>
            </router-link>
            <router-link to="/v1/tool/smtsku-template" style="text-decoration:none;">
              <el-menu-item index="4-4">SMT工具</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="5" @click.native="ru" style="font-weight:bold;width:130px;">
            <template slot="title">UR小工具</template>
            <!-- <el-menu-item index="5-1">产品一览表</el-menu-item>
            <el-menu-item index="5-2">品牌列表</el-menu-item> -->
            <router-link to="/v1/tiny-tool/express" style="text-decoration:none;">
              <el-menu-item index="5-1">物流查询网址</el-menu-item>
            </router-link>
            <!-- <el-menu-item index="5-4">ibay工具</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="6" class="userinfo">
        <el-col :span="14">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-col>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="imagecropperShow=true">设置头像</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="el-dropdown-link userinfo-inner">
          <img :src="image" />
        </span>
      </el-col>
      <image-cropper ref="cropper" :width="300" :height="300" :url="url" @close='close' @crop-upload-success="cropSuccess" langType="en" :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed" v-if="this.show1">
          <template v-for="(item,index) in lside" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed" v-if="this.show2">
          <template v-for="(item,index) in lsidem" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed" v-if="this.show3">
          <template v-for="(item,index) in lsides" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed" v-if="this.show4">
          <template v-for="(item,index) in lsidedata" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed" v-if="this.show5">
          <template v-for="(item,index) in lsideur" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in lside" v-if="!item.hidden" class="el-submenu item">
            <template>
              <div class="el-submenu__title" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i class="el-icon-message"></i>
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.route" class="el-menu-item" :class="$route.path==child.route?'is-active':''" @click="$router.push(child.route)">{{child.name}}
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container" :class="collapsed?'content-container2':'content-container1'">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { removeToken, getToken } from "../utils/auth";
import { getMenu } from "../api/login";
import { getAvatarUrl } from "../api/api";
import ImageCropper from "@/components/ImageCropper";
import Screenfull from "@/components/Screenfull";
import avatar from "@/components/ImageCropper";
export default {
  name: "avatarUpload-demo",
  components: { ImageCropper, Screenfull },
  data() {
    return {
      activeIndex: "",
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      url: getAvatarUrl(),
      imagecropperShow: false,
      imagecropperKey: 0,
      image: "",
      sysName: "UR管理中心",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      lside: [],
      lsidem: [],
      lsides: [],
      lsidedata: [],
      lsideur: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("GetUserInfo").then(() => {
      this.sysUserName = this.$store.getters.name;
      this.image = this.$store.getters.avatar;
    });
    getMenu().then(response => {
      let l = response.data.data;
      this.lside = l;
      this.lsidem = l.filter(e => e.name == "毛利润报表");
      this.lsides = l.filter(e => e.name == "销售工具");
      this.lsidedata = l.filter(e => e.name == "数据中心");
      this.lsideur = l.filter(e => e.name == "UR小工具");
    });
  },
  methods: {
    rm() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
    },
    ru() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = true;
    },
    rproduct() {},
    rdata() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = true;
      this.show5 = false;
    },
    rsale() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.show4 = false;
      this.show5 = false;
    },
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      const image = resData.data[0];
      this.image = image;
    },
    close() {
      this.imagecropperShow = false;
    },
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          removeToken();
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~scss_vars";
.el-dropdown-menu {
  top: 40px !important;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    //background: $color-primary;
    background-color: #545c64;
    color: #fff;
    .el-col-7 {
      .el-dropdown {
        line-height: 0px;
      }
    }
    .el-col-6 {
      .el-dropdown {
        line-height: 0px;
      }
    }
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .screenfull {
        padding-top: 14px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
        .hiddenInput {
          display: none;
        }
      }
    }
    .logo {
      text-align: center;
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .el-menu-item {
        min-width: 230px;
        padding-left: 60px !important;
      }
      .data-scroll-width {
        width: 230px;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container1 {
      flex: 1;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 230px;
      //overflow-y: scroll;
      padding: 10px; //二次修改
      .grid-content .bg-purple-light {
        overflow-x: scroll;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
    .content-container2 {
      flex: 1;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 60px;
      //overflow-y: scroll;
      padding: 10px; //二次修改
      .grid-content .bg-purple-light {
        overflow-x: scroll;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>