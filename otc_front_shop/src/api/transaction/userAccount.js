import request from "@p/request";
const url = "/userAccount";

//账户分页
export const UserAccountPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
  //商户账户分页
export const UserAccountPageShop = params =>
  request({
    method: "get",
    url: url+"/shop",
    params
  });
export const UserAccountList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const UserAccountInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const UserAccountSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const UserAccountUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const UserAccountDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  