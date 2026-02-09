import request from "@p/request";
const url = "/SysModelContent";

//栏目内容管理分页
export const SysModelContentPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysModelContentList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const SysModelContentInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SysModelContentSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysModelContentUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
  export const SysColumnContenFbzt = data =>
  request({
    method: "post",
    url: url+"/fbzt/"+data.id,
    data
  });  
 export const SysModelContentDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  