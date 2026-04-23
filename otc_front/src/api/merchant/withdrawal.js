import request from "@p/request";
const url = "/withdrawOrder";

export const withdrawOrder_list = params =>
  request({
    method: "get",
    url: url + "/list",
    params
  });

export const merchant_auditReject = (data) =>
  request({
    method: "post",
    url: url + "/auditReject",
    data
  });

export const merchant_finishPay = (data) =>
  request({
    method: "post",
    url: url + "/finishPay",
    data
  });

export const merchant_auditPass = (data) =>
  request({
    method: "post",
    url: url + "/auditPass",
    data
  });
