import request from "./request";
export const page_withoutAuth = data =>
  request({
    method: "post",
    url: "/sysVersion/page/withoutAuth",
    data
  });