import request from "@p/request";
// 通过code登录
export const CodeLogin = data =>
  request({
    method: "get",
    url: "/auth/code",
    params: data
  });
// 登录
export const Login = data =>
  request({
    method: "post",
    url: "/auth/login",
    data
  });
// 登出
export const Logout = () =>
  request({
    method: "get",
    url: "/auth/logout"
  });
// 获取数据字典
export const GetDics = () =>
  request({
    method: "get",
    url: "/system/sysDictionary/getDics"
  });
// 获取动态路由
export const GetRouterList = () =>
  request({
    method: "get",
    url: "/res/menu"
  });
// 修改密码
export const ChangePwd = data =>
  request({
    method: "post",
    url: "/user/pwd",
    data
  });

// 通用
export function Post(url, data) {
  return request({
    url,
    method: "post",
    data
  });
}
export function Delete(url, data) {
  return request({
    url,
    method: "post",
    data
  });
}
export function Put(url, data) {
  return request({
    url,
    method: "post",
    data
  });
}
export function Get(url, params) {
  return request({
    url,
    method: "get",
    params
  });
}
