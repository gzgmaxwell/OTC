import request from "@p/request";
const url = "/sysOrg";

//获得省至县市一级级联数据
export const orgCascade = params =>
  request({
    method: "get",
    url: url+"/cascade",
    params
  });

  
// 获取地区
export const AreaList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });
// 地区树
export const AreaTree = params =>
  request({
    method: "get",
    url: url+"/getTree",
    params
  });
// 地区详情
export const AreaInfo = id =>
  request({
    method: "get",
    url: url+`/get/${id}`
  })



  // 新增
export const AreaSave = data =>
request({
  method: "post",
  url: url + "/add",
  data
});

// 编辑
export const AreaUpdate = (data) =>
request({
  method: "post",
  url: `${url}/put/${data.orgId}`,
  data
});



// 删除
export const AreaDelete = data =>
  request({
    method: "post",
    url: url + "/deletes",
    data
  });
// 获得苏州市区县 街道
export const SzOrgs = params =>
  request({
    method: "get",
    url: url+"/getSz",
    params
  });