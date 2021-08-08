import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/user'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 说明需要登录才能访问
    if (store.state.user) {
      next()
    } else {
      Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录后才能使用,请问是否需要登录'
      }).then(() => {
        // on confirm
        next({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }).catch(() => {
        // on cancel
        next(false)
      })
    }
  } else {
    next()
  }
})

export default router
