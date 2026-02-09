import request from "@p/request";
const url = "/userAtt";

//附件分页
export const UserAttPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const UserAttList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const UserAttInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const UserAttSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const UserAttUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.attId,
    data
  });  
  
 
 export const UserAttDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
 

  
 export const DeletesByUrl = data =>
 request({
   method: "post",
   url: url+"/deletesByUrl",
   data
 });