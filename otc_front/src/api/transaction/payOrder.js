import request from "@p/request";
const url = "/payOrder";

//订单分页
export const PayOrderPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const PayOrderList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const PayOrderInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const PayOrderSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const PayOrderUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const PayOrderDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  