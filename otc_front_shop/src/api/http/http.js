import request from "@p/request";
const url = "/http";

//请求管理分页
export const HttpPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const HttpList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const HttpInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const HttpSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const HttpUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const HttpDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  