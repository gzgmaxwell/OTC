import router, { constantRouter } from "@r";
const _import = file => {
  return process.env.NODE_ENV !== "development"
    ? require("@/views/" + file + ".vue").default
    : () => import("@/views/" + file + ".vue");
};
import Layout from "@/views/layout";
import Router from "vue-router";
import { getRouter } from "@p/storage";

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

let layoutlist = [];
export function refreshRouter() {
  router.matcher = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
  }).matcher;
  var routerObj = getRouter();
  if (routerObj) {
    layoutlist = [];
    var rou = filterAsyncRouter(routerObj, true).concat([
      {
        path: "",
        component: Layout,
        children: layoutlist
      },
      {
        path: "*",
        component: _import("error/index")
      }
    ]); //过滤路由
    router.addRoutes(rou); //动态添加路由
  }
}

export function getRouters() {
  var routerObj = getRouter();
  if (routerObj) {
    var rou = filterAsyncRouter(routerObj); //过滤路由
    return rou;
  }
  return null;
}

/**
 * @params asyncRouterMap 原始路由
 * @params isDealRouter 是否是处理路由(false 处理菜单)
 * @params parentHasPage 父级菜单是否有页面
 */
function filterAsyncRouter(
  asyncRouterMap,
  isDealRouter = false,
  parentHasPage = false
) {
  const accessedRouters = asyncRouterMap.filter(route => {
    route.hasPage = false;
    if (route.component) {
      if (route.component === "Layout") {
        //Layout组件特殊处理
        route.component = Layout;
      } else {
        route.hasPage = true;
        try {
          route.component = _import(route.component);
        } catch (err) {
          route.component = _import("error/index");
          console.log(err);
        }
      }
    }else{
      //Layout组件特殊处理
      route.component = Layout;
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(
        route.children,
        isDealRouter,
        route.hasPage
      );
    }
    if (parentHasPage && isDealRouter) {
      layoutlist.push(route);
      return false;
    }
    return true;
  });
  return accessedRouters;
}
