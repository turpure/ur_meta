import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-chalk/index.css'
import store from './store'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import router from './routes/router'
import VModal from 'vue-js-modal'
import Myecharts from './component/Myecharts'
import toExcel from '@/excel/json2excel'

Vue.use(Myecharts)
Vue.use(VModal)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$toExcel = toExcel


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
