import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes/routes'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('user')
  }
  // let user = JSON.parse(sessionStorage.getItem('user'));
  const user = localStorage.getItem('user')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
export default router

