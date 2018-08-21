import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import router from './routes/router'
import VModal from 'vue-js-modal'
import Myecharts from './component/Myecharts'

Vue.use(Myecharts)
Vue.use(VModal)
Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
