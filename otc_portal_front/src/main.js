import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '../i18n' 
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) 
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    if (err.name === 'NavigationDuplicated') {
      return err
    }
    return Promise.reject(err)
  })
}
Vue.use(ElementUI)
new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
