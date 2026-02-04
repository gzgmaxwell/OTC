import request from "@p/request";
const url = "/userPayModify";

//支付密码修改分页
export const UserPayModifyPage = params =>
  request({
    method: "get",
    url: url+"/member/page",
    params
  });
export const UserPayModifyList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const UserPayModifyInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const UserPayModifySave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const UserPayModifyUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const UserPayModifyDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  