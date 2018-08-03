<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="image" />{{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="imagecropperShow=true">设置头像</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <image-cropper :width="300" :height="300" url="https://httpbin.org/post" @close='close' @crop-upload-success="cropSuccess" @change="handleFile" langType="en" :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}
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
import { removeToken } from "../utils/auth";
import { getMenu } from "../api/login";
import { uploadImage } from "../api/api";
// import VueCropper from "vue-cropperjs";
import ImageCropper from "@/components/ImageCropper";

export default {
  name: "avatarUpload-demo",
  components: { ImageCropper },
  // components: {
  //   VueCropper
  // },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image:
        "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
      sysName: "UR-META",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      userInfo: {
        avatar:
          "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png"
      },
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
    }),
      getMenu().then(response => {
        this.lside = response.data.data;
      });
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = resData.files.avatar;
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
  },
  mounted() {
    this.$store.dispatch("GetUserInfo").then(() => {
      this.sysUserName = this.$store.getters.name;
      this.imgSrc = this.$store.getters.avatar;
    }),
      getMenu().then(response => {
        this.lside = response.data.data;
      });
  }
};
</script>

<style lang="scss" scoped >
@import "~scss_vars";
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
    background: $color-primary;
    color: #fff;
    .myCropper-btn {
      float: right;
      margin-top: 250px;
      margin-right: 20px;
    }
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
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
      width: 160px;
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
      flex: 0 0 160px;
      width: 160px;
      .el-menu {
        height: 100%;
      }
      .el-menu-item {
        min-width: 160px;
      }
      .data-scroll-width {
        width: 160px;
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
      flex: 0 0 160px;
      width: 160px;
    }
    .content-container1 {
      flex: 1;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 160px;
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