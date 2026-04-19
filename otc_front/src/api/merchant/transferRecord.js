import request from "@p/request";
import requestDown from "@p/requestDown";
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
  requestDown({
    method: "get",
    url: url + "/shop/page/export",
    params
  });