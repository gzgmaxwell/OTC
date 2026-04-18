import request from "@p/request";
const url = "/merchant";

//转账记录分页
export const shop_page = params =>
  request({
    method: "get",
    url: url + "/shop/page",
    params
  });
export const TransferRecordDelete = data =>
  request({
    method: "delete",
    url: url + "/deletes",
    data
  });