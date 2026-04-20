import request from "@p/request";
const url = "/user";

export const merchant_list = params =>
  request({
    method: "get",
    url: "/merchant/list",
    params
  });

export const merchant_get = id =>
  request({
    method: "get",
    url: "/merchant/get/" + id
  });

export const paymentMethod_get = id =>
  request({
    method: "get",
    url: "/paymentMethod/get/" + id
  });

export const merchant_secretKey = id =>
  request({
    method: "get",
    url: "/merchant/secretKey/" + id
  });

export const merchant_whitelist = data =>
  request({
    method: "post",
    url: "/merchant/whitelist",
    data
  });