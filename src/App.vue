<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  //padding: 10px;
  //border:1px solid #dfe6ec;
  //margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
// 滚动条
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb{  
  background-color:#DCDFE6;  
  height:50px;  
  outline-offset:-2px;  
  outline:2px solid #fff;  
  -webkit-border-radius:40px;  
  border: 2px solid #fff;  
}  
::-webkit-scrollbar-thumb:hover{  
  background-color:#c0c4cc;  
  height:50px;  
  -webkit-border-radius:40px;  
}
</style>