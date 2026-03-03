import request from "@p/request";
const url = "/user";

export const checkSecretKey = data =>
  request({
    method: "post",
    url: url + "/checkSecretKey",
    data
  });

export const BuyCoinsInfo = id =>
  request({
    method: "get",
    url: url + "/get/" + id
  });

export const BuyCoinsSave = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });
