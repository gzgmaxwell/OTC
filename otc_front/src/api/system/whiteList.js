import request from "@p/request";
const url = "/whiteList";

//白名单分页
export const WhiteListPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const WhiteListList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const WhiteListInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const WhiteListSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const WhiteListUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const WhiteListDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  