import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'ol/ol.css';

import axios from 'axios'
Vue.prototype.$axios = axios


import { login} from "@p/token";
login();


import store from "./store";
Vue.config.productionTip = false;
import * as echarts from "echarts";//引入echarts
Vue.prototype.$echarts = echarts//挂载到vue实例，方便全局使用

import "@/styles/index.scss"; // 全局样式
import "@/assets/icon/iconfont.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 注册全局组件
import "./components";

// 全局变量挂载
import "@p";

// 注册全局过滤器
import * as filters from "@f";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 刷新路由
import { refreshRouter } from "@r/dealRouter";
refreshRouter();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
