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
      <el-col :span="14">
        <el-menu 
        :default-active="activeIndex"
        @select="handleSelect" 
        class="el-menu-demo" 
        mode="horizontal" 
        background-color="#545c64" 
        text-color= "#fff" 
        active-text-color="#ffd04b"
        router
        >
          <el-submenu v-for="(item,position) in allMenu" :index="generateIndex(-1,position)" :key="generateIndex(-1,position)">
            <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="(child,index) in item.children" :index="child.route" :key="generateIndex(position,index)">{{child.name}}</el-menu-item>
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
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'" v-show="collapsed">
        <!--导航菜单-->
        <el-menu :default-active="activeIndex"  class="el-menu-vertical-demo" router>
          <el-submenu v-for="item in asideMenu.menu" :index="generateIndex(-1, asideMenu.position)" :key="generateIndex(-1, asideMenu.position)">
            <template slot="title">{{item.name}}  </template>
              <el-menu-item v-for="(child,index) in item.children" :index="child.route" :key="generateIndex(asideMenu.position,index)">{{child.name}}</el-menu-item>
          </el-submenu>
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
import { removeToken, getToken } from '../utils/auth'
import { getMenu } from '../api/login'
import { getAvatarUrl } from '../api/api'
import ImageCropper from '@/components/ImageCropper'
import Screenfull from '@/components/Screenfull'
import avatar from '@/components/ImageCropper'
export default {
  name: 'avatarUpload-demo',
  components: { ImageCropper, Screenfull },
  data() {
    return {
      activeIndex: '',
      allMenu: [],
      asideMenu: { position: 0, menu: [{ name: '', children: [] }] },
      openeds: ['1'],
      url: getAvatarUrl(),
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      sysName: 'UR管理中心',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    this.$store.dispatch('GetUserInfo').then(() => {
      this.sysUserName = this.$store.getters.name
      this.image = this.$store.getters.avatar
    })
    getMenu().then(response => {
      this.allMenu = response.data.data
    })
  },
  methods: {
    generateIndex(head, tail) {
      if (head < 0) {
        return String(tail + 1)
      }
      return String(head + 1) + '-' + String(tail + 1)
    },
    handleSelect(index, indexPath) {
      this.activeIndex = index
      this.collapsed = true
      var asideIndex = parseInt(indexPath[0]) - 1
      const allMenu = this.allMenu
      this.asideMenu = { position: asideIndex, menu: [allMenu[asideIndex]] }
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      const image = resData.data[0]
      this.image = image
    },
    close() {
      this.imagecropperShow = false
    },
    logout: function() {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('user')
          removeToken()
          _this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed
    }
  }
}
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