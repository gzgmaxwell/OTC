import request from "@p/request";
const url = "/sysOperationLog";

//app版本管理分页
export const sysOperationLog_page = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });
export const SysVersionList1 = params =>
  request({
    method: "get",
    url: url + "/all",
    params
  });

// 获取详情
export const SysVersionInfo1 = id =>
  request({
    method: "get",
    url: url + "/get/" + id
  });

export const configAdd = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });

export const configUpdate = (data, id) =>
  request({
    method: "post",
    url: url + "/update/" + id,
    data
  });

export const configDeleteBatch = data =>
  request({
    method: "post",
    url: url + "/deleteBatch",
    data
  });
