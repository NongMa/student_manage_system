// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/scss/iconfont.scss'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/common/scss/index.scss' // global css
import '@/mock/' // simulation data
import '@/permission' // 导入控制权限

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
