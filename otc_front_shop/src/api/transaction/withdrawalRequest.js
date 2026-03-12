import request from "@p/request";
const url = "/userRealAuth";

//用户实名认证分页
export const UserRealAuthPage222444 = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });

export const UserRealAuthUpdate566 = data =>
  request({
    method: "post",
    url: url + "/put/" + data.id,
    data
  });