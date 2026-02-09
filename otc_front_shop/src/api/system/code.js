import request from "@p/request";
const url = "/code";
// 地区详情
export const registerCode = params =>
  request({
    method: "get",
    url: url+`/register`,
    params: params
  })

