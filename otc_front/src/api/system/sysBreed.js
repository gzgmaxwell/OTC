import request from "@p/request";
const url = "/sysBreed";

//品种管理分页
export const SysBreedPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysBreedList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });
export const SysBreedTree = params =>
request({
  method: "get",
  url: url+"/tree/all",
  params
});
export const BreedCascaderAll = params =>
request({
  method: "get",
  url: url+"/cascader/all",
  params
});
export const BreedCascader = params =>
request({
  method: "get",
  url: url+"/cascader/2",
  params
});

export const BreedFl = params =>
request({
  method: "get",
  url: url+"/child",
  params
});
// 获取详情
export const SysBreedInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });
// 获取获得下一级菜单分页
export const SysBreedChildPage = params =>
  request({
    method: "get",
    url: url+"/childPage",
    params
  });

  export const SysBreedSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysBreedUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const SysBreedDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  