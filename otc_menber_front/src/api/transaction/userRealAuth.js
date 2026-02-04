import request from "@p/request";
const url = "/userRealAuth";

//用户实名认证分页
export const UserRealAuthPage = params =>
  request({
    method: "get",
    url: url+"/member/page",
    params
  });
export const UserRealAuthList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const UserRealAuthInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const UserRealAuthSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const UserRealAuthUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const UserRealAuthDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  