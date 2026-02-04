import request from "@p/request";
const url = "/user";

//组织机构分页
export const UserPage = params =>
  request({
    method: "get",
    url: url+"/member/page",
    params
  });
export const UserList = params =>
  request({
    method: "get",
    url: url+"/member/all",
    params
  });


// 获取详情
export const UserInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  
// 获取详情
export const MySellUserInfo = () =>
  request({
    method: "get",
    url: url+"/userInfo"
  });




  export const UserSave = data =>
  request({
    method: "post",
    url: url+"/member/add",
    data
  });
  




  export const UserUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.userId,
    data
  });  


  //绑定谷歌秘钥

  export const BindSecretKey = data =>
  request({
    method: "post",
    url: url+"/bindSecretKey",
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
  