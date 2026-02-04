import request from "@p/request";
const url = "/sysModel";

//栏目名称分页
export const SysModelPage = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });
// 获取详情
export const SysModelInfo = id =>
  request({
    method: "get",
    url: url + "/get/" + id
  });

// 模型分类查询所有
export const SysModelList = params =>
  request({
    method: "get",
    url: url + "/all",
    params
  });

// 模型分类新增
export const SysModelSave = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });

// 模型分类更新
export const SysModelUpdate = data =>
  request({
    method: "post",
    url: url + "/put/" + data.id,
    data
  });

// 模型分类删除
export const SysModelDelete = data =>
  request({
    method: "post",
    url: url + "/deletes",
    data
  });

export const SysModelTree = params =>
  request({
    method: "get",
    url: url+"/tree",
    params
  });
