import request from "@p/request";
const url = "/userZj";

//专家用户分页
export const UserZjPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const UserZjList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const UserZjInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const UserZjSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const UserZjUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.userId,
    data
  });  
  
 
 export const UserZjDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  