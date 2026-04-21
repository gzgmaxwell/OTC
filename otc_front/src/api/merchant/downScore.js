import request from "@p/request";
const url = "/merchant";

//转账记录分页
export const xiafen_list = params =>
  request({
    method: "get",
    url: url + "/xiafen/list",
    params
  });
