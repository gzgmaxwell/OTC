import request from "@p/request";
const url = "/lsShxx";

//建设情况更新分页
export const LsShxxPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const LsShxxList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });
  

// 获取详情
export const LsShxxInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });

  

  export const LsShxxTj = data =>
  request({
    method: "post",
    url: url+"/tj",
    data
  });



  export const LsShxxSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const LsShxxUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const LsShxxDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  