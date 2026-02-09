import request from "@p/request";

const url = "/res";

// 获取所有菜单
export const GetAllMenu = params =>
  request({
    method: "get",
    url: url + "/allMenu",
    params
  });
// 获取所有权限
export const ResourceAllTree = params =>
  request({
    method: "get",
    url: url + "/tree/all",
    params
  });
  

// 批量删除
export const ResourceDelete = params =>
  request({
    method: "post",
    url: url+`/deletes`,
    data: params
  });  

  
// 通过表格更新排序
export const ResourceTableUpdate = (data, id) =>
request({
  method: "post",
  url: `${url}/table/${id}` ,
  data
});  


// 获取所有菜单
export const ResourceInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id,
  });
// 获取所有菜单
export const GetAllTree = params =>
  request({
    method: "get",
    url: url ,
    params
  });
// 资源新增
export const ResourceAdd = params =>
  request({
    method: "post",
    url: url+`/add`,
    data :params
  });
  

// 资源新增
export const ResourceUpdate = (params , id) =>
  request({
    method: "post",
    url: url+"/put/"+id,
    data :params
  });
