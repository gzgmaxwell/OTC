import request from "@p/request";
const url = "/sysInst";

//组织机构分页
export const SysInstPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysInstList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const SysInstInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SysInstSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysInstUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const SysInstDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  