import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/module/studentViews/index.vue'),
      redirect: '/answer',
      children: [
        { path: '/answer', component: () => import('@/module/studentViews/answer.vue'), name: '在线答题', type: 'answer' },
        { path: '/upload', component: () => import('@/module/studentViews/upload.vue'), name: '上传文件', type: 'upload' },
        { path: '/download', component: () => import('@/module/studentViews/download.vue'), name: '下载文件', type: 'download' },
        { path: '/message', component: () => import('@/module/studentViews/message.vue'), name: '消息查询', type: 'message' }  
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/module/teacherViews/index.vue'),
      redirect: '/table',
      children: [
        { path: '/table', component: () => import('@/module/teacherViews/Table.vue'), name: '题目中心', meta: { index: 1} },
      ]
    },
  ]
})
export default router
