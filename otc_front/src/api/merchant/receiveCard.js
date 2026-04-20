import request from "@p/request";
const url = "/merchant";

//转账记录分页
export const merchant_payMethodList = params =>
  request({
    method: "get",
    url: url + "/payMethodList",
    params
  });


export const merchant_addOrUpdate = (data) =>
  request({
    method: "post",
    url: url + "/addOrUpdate",
    data
  });