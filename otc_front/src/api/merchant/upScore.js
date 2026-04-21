import request from "@p/request";
const url = "/merchant";

//转账记录分页
export const shangfen_list = params =>
  request({
    method: "get",
    url: url + "/shangfen/list",
    params
  });