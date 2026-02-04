import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@v/layout";

Vue.use(VueRouter);

export const constantRouter = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@v/login")
  },
  
  {
    path: "/auth",
    name: "auth",
    component: () => import("@v/login/googleAuth")
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("@v/upload")
  },
  {
    path: "/dt1",
    name: "dt1",
    component: () => import("@v/dt")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@v/register")
  },
  {
    path: "/load",
    name: "Load",
    component: () => import("@v/load")
  },
  {
    path: "",
    component: Layout,
    children: []
  }
];
const router = new VueRouter({
  routes: constantRouter,
  mode:"history",
  base: "/of"

});

var exclude = ["/login", "/pending", "/audited", "/load", "/load", '/register'];
router.beforeEach((to, from, next) => {
  let token = window.getToken();
  if (token) {
    next();
  } else {
    if (exclude.indexOf(to.path) != -1) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
