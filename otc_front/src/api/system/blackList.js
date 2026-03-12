import request from "@p/request";
const url = "/whiteList";

//白名单分页
export const WhiteListPage2222 = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });