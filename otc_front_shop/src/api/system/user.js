import request from "@p/request";
const url = "/user";

//组织机构分页
export const UserPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const UserList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });

export const QuerySelect = params =>
  request({
    method: "get",
    url: url+"/select",
    params
  });

// 获取详情
export const UserInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const RemoveSecretKey = data =>
  request({
    method: "post",
    url: url+"/removeSecretKey",
    data
  });
  
  //绑定谷歌秘钥

  export const BindSecretKey = data =>
  request({
    method: "post",
    url: url+"/bindSecretKey",
    data
  });  


  export const UserSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });



  export const UserUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.userId,
    data
  });  

  export const UserLockStatus = data =>
  request({
    method: "post",
    url: url+"/lockStatus",
    data
  });  
  
  
 export const UserDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  