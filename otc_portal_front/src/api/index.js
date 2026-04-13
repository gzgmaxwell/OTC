import request from "./request";
export const page_withoutAuth = params =>
  request({
    method: "get",
    url: "/sysVersion/page/withoutAuth",
    params
  });