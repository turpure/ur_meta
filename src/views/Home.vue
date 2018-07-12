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
            <img :src="imgSrc" @click.stop="uploadHeadImg" />{{sysUserName}}
            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <modal name="hello-world">
        <div style="width: 400px; height:300px; border: 1px solid gray; display: inline-block;">
          <vueCropper ref="cropper" :img="option.img" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"></vueCropper>
        </div>
        <el-button class="myCropper-btn" type="primary" @click="cropImage" v-if="imgSrc != ''">确定</el-button>
        <el-button class="myCropper-btn" type="primary" @click="rotate" v-if="imgSrc != ''">旋转</el-button>
      </modal>

    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo data-scroll-width" unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">
              <!--{{$route.name}}-->
            </strong>
            <el-breadcrumb separator="" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                <!-- {{ item.name }} -->
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
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
import VueCropper from "vue-cropperjs";

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      option: {
        img: "",
        canSccale: true,
        autoCrop: true,
        outputSize: 1,
        autoCropWidth: 100,
        autoCropHeight: 100,
        outputType: "png",
        canMove: true,
        fixedBox: true
      },
      imgSrc: "",
      cropImg: "",
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
  methods: {
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
    },
    uploadHeadImg: function() {
      this.$modal.show("hello-world");
      this.$el.querySelector(".hiddenInput").click();
    },
    //头像显示
    handleFile: function(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      let _this = this,
        imgToken = null,
        imgBase64Data = null;
      // 判断是否选择图片
      if (_this.hasSelectImg == false) {
        _this.$Modal.error({
          title: "裁剪失败",
          content: "请选择图片，然后进行裁剪操作！"
        });
        return false;
      }
      // 确认按钮不可用
      _this.cropperLoading = true;
      let $imgData = _this.imgObj.cropper("getCroppedCanvas");
      imgBase64Data = $imgData.toDataURL("image/png");
      // 构造上传图片的数据
      let formData = new FormData();
      // 截取字符串
      let photoType = imgBase64Data.substring(imgBase64Data.indexOf(",") + 1);
      //进制转换
      const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, {
          type: contentType
        });
        return blob;
      };
      const contentType = "image/jepg";
      const b64Data2 = photoType;
      const blob = b64toBlob(b64Data2, contentType);
      formData.append("file", blob, "client-camera-photo.png");
      formData.append("type", _this.imgType);
      // ajax上传
      $.ajax({
        url: _this.$nfs.uploadUrl,
        method: "POST",
        data: formData,
        // 默认为true，设为false后直到ajax请求结束(调完回掉函数)后才会执行$.ajax(...)后面的代码
        async: false,
        // 下面三个，因为直接使用FormData作为数据，contentType会自动设置，也不需要jquery做进一步的数据处理(序列化)。
        cache: false,
        contentType: false,
        processData: false,
        type: _this.imgType,
        success: function(res) {
          let imgToken = res.data.token;
          _this.cropperLoading = false;
          // 传参
          Bus.$emit("getTarget", imgToken);
        },
        error: function(error) {
          _this.cropperLoading = false;
          _this.$Modal.error({
            title: "系统错误",
            content: "请重新裁剪图片进行上传！"
          });
        }
      });
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    mounted() {
      this.$store.dispatch("GetUserInfo").then(() => {
        this.sysUserName = this.$store.getters.name;
      }),
        getMenu().then(response => {
          this.lside = response.data.data;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

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
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
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
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      //position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      //left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>