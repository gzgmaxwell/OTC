import { setToken, setUserInfo, setDics, setRouter } from "@p/storage";
import Vue from "vue";
import { refreshRouter } from "@r/dealRouter";
import router from   "@r";

import { getUrlKey ,delParam} from "@p/utils";

import {  GetDics, GetRouterList,CodeLogin } from "@a";

export async function login(){
  
  var code = getUrlKey("code");
  // return;
  if(code){
    localStorage.clear();
    localStorage.setItem('isOuter', true);
    // let loadingInstance = Loading.service({ fullscreen: true ,text:"加载中"});
    // removeToken();
    // removeToken();
     var user =  await CodeLogin({"code":code});;

     var stateObject = {};
      var title = "苏州市智慧农业专家服务系统";    //浏览器上显示的标题
      history.pushState(stateObject,title,delParam("code"));  //进行修改
      await loginAfter(user);
  }else{
    localStorage.setItem('isOuter', false);
  }
}


export async function loginAfter(userinfo) {
  
  
  // 储存token和用户信息
  setToken(userinfo.token);
  setUserInfo(userinfo);
  Vue.prototype.userInfo = userinfo;

  // 获取并储存字典信息
  const dictionaryData = await GetDics();
  setDics(dictionaryData);
  Vue.prototype.dics = dictionaryData;

  // 获取并储存动态路由
  const routerList = await GetRouterList();
  setRouter(routerList);
  refreshRouter();

  // 跳转首页
  const homes = userinfo.homeUrl.split(",");
  router.push({ name: homes[0] });


}


