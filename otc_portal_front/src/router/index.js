// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入你的页面组件
import index from '@/views/index.vue'
import about from '@/views/about.vue'
import privacy from '@/views/privacy.vue'

import Logout from '@/views/privacy/logOut.vue'
// 安装路由插件
Vue.use(VueRouter)

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: privacy
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

// 创建路由实例
const router = new VueRouter({
  mode: 'hash', // 使用 history 模式（需要后端支持，默认hash模式也可以）
  base: '',
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/logout') {
//     window.open(to.fullPath, '_blank'); // 在新窗口中打开路径为 '/some-path' 的页面
//     next(false); // 阻止路由的默认跳转行为
//   } else {
//     next(); // 正常路由跳转
//   }
// });
export default router