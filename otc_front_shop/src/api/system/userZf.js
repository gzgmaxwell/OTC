
import request from "@p/request";
const url = "/userZf";

export const userZfPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const userZfList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const userZfInfo = id =>
  request({
    method: "get",
    url: `${url}/get/${id}`
  });


  export const userZfSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const userZfUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.userId,
    data
  });  
  
 
 export const userZfDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  