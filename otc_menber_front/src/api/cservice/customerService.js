import request from "@p/request";
const url = "/customerService";

//客服分页
export const CustomerServicePage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const CustomerServiceList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const CustomerServiceInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const CustomerServiceSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const CustomerServiceUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const CustomerServiceDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  