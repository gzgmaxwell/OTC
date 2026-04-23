import request from "@p/request";
const url = "/withdrawOrder";

//用户实名认证分页
export const withdrawOrder_list = params =>
  request({
    method: "get",
    url: url + "/list",
    params
  });

export const withdrawOrder_createWithdraw = data =>
  request({
    method: "post",
    url: url + "/createWithdraw",
    data
  });

export const config_queryCode = data =>
  request({
    method: "post",
    url: "/config/queryCode",
    data,
  });

export const queryUserBalance = data =>
  request({
    method: "post",
    url: "/userAccount/queryUserBalance",
    data,
  });