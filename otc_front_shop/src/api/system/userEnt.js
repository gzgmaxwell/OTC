
import request from "@p/request";
const url = "/userEnt";

export const userEntPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const userEntList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const userEntInfo = id =>
  request({
    method: "get",
    url: `${url}/get/${id}`
  });


  export const userEntSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const userEntUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.userId,
    data
  });  
  
 
 export const userEntDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  