import router from './router'
import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // NProgress.start()
  if (getToken()) {
    if (to.path === '/') {
      if (store.getters.type === 'student') {
        next({ path: '/student' }) 
      } else if (store.getters.type === 'teacher') {
        next({ path: '/teacher' }) 
      }
    }
    if (to.path === '/login') {
      if (store.getters.type === 'student') {
        next({ path: '/student' })
      } else if (store.getters.type === 'teacher') {
        next({ path: '/teacher' })
      }
    // NProgress.done() // if current page is dashboard will not trigger  afterEach hook, so manually handle it
    } else {
      if (store.getters.type === 'student') {
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})
