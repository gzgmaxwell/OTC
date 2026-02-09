import request from "@p/request";
const url = "/sysColumn";

//栏目名称分页
export const SysColumnPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SysColumnList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });
  export const SysColumnTree = params =>
  request({
    method: "get",
    url: url+"/tree",
    params
  });

// 获取详情
export const SysColumnInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SysColumnSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SysColumnUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const SysColumnDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  