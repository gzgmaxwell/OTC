import request from "@p/request";
const url = "/blackList";

//白名单分页
export const blackList_page = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });
export const blackList_add = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });

  export const blackList_deleteByIds = data =>
  request({
    method: "post",
    url: url + "/deleteByIds",
    data
  });