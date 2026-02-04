import request from "@p/request";
const url = "/sysVersion";

//app版本管理分页
export const SysVersionPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysVersionList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const SysVersionInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SysVersionSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysVersionUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const SysVersionDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  