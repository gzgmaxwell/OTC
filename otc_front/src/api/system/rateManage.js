import request from "@p/request";
const url = "/fee";

//app版本管理分页
export const fee_page = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });

export const fee_deleteBatch = data =>
  request({
    method: "post",
    url: url + "/deleteBatch",
    data
  });

export const fee_update = data =>
  request({
    method: "post",
    url: url + "/update/" + data.id,
    data
  });
