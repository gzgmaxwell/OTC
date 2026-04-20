import request from "@p/request";
const url = "/transferRecord";

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

export const shop_page_export = params =>
  request({
    method: "get",
    url: url + "/shop/page/export",
    responseType: "blob", //这里最重要,不要去掉
    params
  });