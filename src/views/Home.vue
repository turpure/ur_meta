<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col class="logo" :class="!collapsed?'logo-collapse-width':'logo-width'">
        {{!collapsed?'':sysName}}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="10">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#fff" router>
          <template v-for="item in lsidem" v-if="!item.hidden">
            <el-submenu index="1" @click.native="rm" style="margin-left:20px;">
              <template slot="title">
                <span :style="{color:rgb1}">{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden" @click.native="rm">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-for="item in lsides" v-if="!item.hidden">
            <el-submenu index="2" @click.native="rsale" style="margin-left:20px;">
              <template slot="title">
                <span :style="{color:rgb2}">{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden" @click.native="rsale">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-for="item in lsidedata" v-if="!item.hidden">
            <el-submenu index="3" @click.native="rdata" style="margin-left:20px;">
              <template slot="title">
                <span :style="{color:rgb3}">{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden" @click.native="rdata">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-for="item in lsideur" v-if="!item.hidden">
            <el-submenu index="4" @click.native="ru" style="margin-left:20px;">
              <template slot="title">
                <span :style="{color:rgb4}">{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden" @click.native="ru">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-for="item in lsiderequirements" v-if="!item.hidden">
            <el-submenu index="5" @click.native="requirements" style="margin-left:20px;">
              <template slot="title">
                <span :style="{color:rgb5}">{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden" @click.native="requirements">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
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
        <el-menu :default-active="$route.path" :default-openeds="openeds" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="collapsed" v-if="this.show1">
          <template v-for="item in lside" v-if="!item.hidden">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.route" :key="child.route" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section class="content-container" :class="!collapsed?'content-container2':'content-container1'">
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
      openeds: ["1"],
      rgb1: "",
      rgb2: "",
      rgb3: "",
      rgb4: "",
      rgb5: "",
      show1: false,
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
      lsiderequirements: [],
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
      const l = response.data.data;
      this.lsidem = l.filter(e => e.name == "毛利润报表");
      this.lsides = l.filter(e => e.name == "销售工具");
      this.lsidedata = l.filter(e => e.name == "数据中心");
      this.lsideur = l.filter(e => e.name == "UR小工具");
      this.lsiderequirements = l.filter(e => e.name == "反馈中心");
    });
  },
  methods: {
    rm() {
      this.rgb1 = "#ffd04b";
      this.rgb2 = "";
      this.rgb3 = "";
      this.rgb4 = "";
      this.rgb5 = "";
      this.show1 = true;
      this.collapsed = true;
      this.lside = this.lsidem;
    },
    rsale() {
      this.rgb2 = "#ffd04b";
      this.rgb1 = "";
      this.rgb3 = "";
      this.rgb4 = "";
      this.rgb5 = "";
      this.show1 = true;
      this.collapsed = true;
      this.lside = this.lsides;
    },
    rdata() {
      this.rgb3 = "#ffd04b";
      this.rgb1 = "";
      this.rgb2 = "";
      this.rgb4 = "";
      this.rgb5 = "";
      this.show1 = true;
      this.collapsed = true;
      this.lside = this.lsidedata;
    },
    ru() {
      this.rgb4 = "#ffd04b";
      this.rgb1 = "";
      this.rgb2 = "";
      this.rgb3 = "";
      this.rgb5 = "";
      this.show1 = true;
      this.collapsed = true;
      this.lside = this.lsideur;
    },
    requirements() {
      this.rgb5 = "#ffd04b";
      this.rgb1 = "";
      this.rgb2 = "";
      this.rgb3 = "";
      this.rgb4 = "";
      this.show1 = true;
      this.collapsed = true;
      this.lside = this.lsiderequirements;
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
        // type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          removeToken();
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~scss_vars";
.el-submenu__title * {
  font-size: 18px;
}
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
      height: 60px;
      font-size: 22px;
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
      width: 0px;
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
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          z-index: 99999;
          height: auto;
        }
      }
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
      left: 0px;
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