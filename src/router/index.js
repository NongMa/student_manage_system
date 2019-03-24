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
        { path: '/table', component: () => import('@/module/teacherViews/Table.vue'), name: '题目中心', type: 'table' },
        { path: '/postMessage', component: () => import('@/module/teacherViews/postMessage.vue'), name: '消息中心', type: 'postMessage' },
        { path: '/TeacherDownload', component: () => import('@/module/teacherViews/download.vue'), name: '下载学生作业', type: 'TeacherDownload' },
        { path: '/homework', component: () => import('@/module/teacherViews/homework.vue'), name: '发布学生作业', type: 'homework' },
      ]
    },
    {
      path: '*',
      name: 'notfount',
      component: () => import('@/components/404.vue')
    }
  ]
})
export default router
