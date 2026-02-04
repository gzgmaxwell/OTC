import request from "@p/request";
const url = "/loginDevice";

//登录设备分页
export const LoginDevicePage = params =>
  request({
    method: "get",
    url: url+"/member/page",
    params
  });
export const LoginDeviceList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const LoginDeviceInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const LoginDeviceSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const LoginDeviceUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const LoginDeviceDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  