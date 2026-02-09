import request from "@p/request";
const url = "/sbglBjjl";

//获取物联离线设备数量
export const DataWlCount = params =>
  request({
    method: "get",
    url: url+"/v2/wlsblxtj",
    params
  });

// 获取摄像头离线设备数量
export const DataSxtCount = params =>
  request({
    method: "get",
    url: url+"/v2/spsblxtj",
    params
  });


