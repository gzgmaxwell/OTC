import evnInfo from "./config";
import store from '@/store'
// 设置token
const tokenField = `Token`;
export function getToken() {
  return localStorage.getItem(tokenField);
}
export function setToken(value) {
  localStorage.setItem(tokenField, value);
}
export function removeToken() {
  localStorage.removeItem(tokenField);
}

// 设置用户信息
const userInfoField = `UserInfo`;
export function getUserInfo() {
  const data = localStorage.getItem(userInfoField);
  return data ? JSON.parse(data) : data;
}
export function setUserInfo(value) {
  localStorage.setItem(userInfoField, JSON.stringify(value));
}
export function removeUserInfo() {
  localStorage.removeItem(userInfoField);
}

// 字典信息
const dicsField = `Type`;
export function getDics() {
  const data = localStorage.getItem(dicsField);
  return data ? JSON.parse(data) : data;
}
export function setDics(value) {
  localStorage.setItem(dicsField, JSON.stringify(value));
}
export function removeDics() {
  localStorage.removeItem(dicsField);
}

// 设置路由
const routerField = `Router`;
export function getRouter() {
  const data1 = store.getters && store.getters.routerField;
  let data = [];
  if(data1=="") {
    data = localStorage.getItem(routerField);
  } else {
    data = data1;
  }
  return data ? JSON.parse(data) : data;; 
}
export function setRouter(value) {
  localStorage.setItem(routerField, JSON.stringify(value));
  store.commit('SET_ROUTER', JSON.stringify(value));
}
export function removeRouter() {
  localStorage.removeItem(routerField);
  store.commit('SET_ROUTER', "");
}
