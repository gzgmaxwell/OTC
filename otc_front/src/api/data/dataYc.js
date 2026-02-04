import request from "@p/request";
const url = "/dataYc";

//渔船信息分页
export const DataYcPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const DataYcList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const DataYcInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const DataYcSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const DataYcUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const DataYcDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  