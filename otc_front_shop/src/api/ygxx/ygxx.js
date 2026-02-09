import request from "@p/request";
const url = "/ygxx";

//渔港信息分页
export const YgxxPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const YgxxList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const YgxxInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const YgxxSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const YgxxUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const YgxxDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  