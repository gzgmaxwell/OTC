import request from "@p/request";
const url = "/userRealAuth";

//用户实名认证分页
export const UserRealAuthPage2323 = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });
