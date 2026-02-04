import request from "@p/request";
const url = "/sysColumnContent";

//栏目内容管理分页
export const SysColumnContentPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysColumnContentList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const SysColumnContentInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SysColumnContentSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysColumnContentUpdate = data =>
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
 export const SysColumnContentDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  