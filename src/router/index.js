import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/'
import index from '@/components/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '首页',
        requireAuth: true
      }
    }
  ]
})
export default router
