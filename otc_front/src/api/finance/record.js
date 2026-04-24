import request from "@p/request";
const url = "/account";

//转账记录分页
export const operation_fund_page = params =>
  request({
    method: "get",
    url: url + "/operation/fund/page",
    params
  });
export const operation_create = (data) =>
  request({
    method: "post",
    url: url + "/operation/create",
    data
  });