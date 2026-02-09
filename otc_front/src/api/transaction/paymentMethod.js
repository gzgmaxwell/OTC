import request from "@p/request";
const url = "/paymentMethod";

//付款方式分页
export const PaymentMethodPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const PaymentMethodList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const PaymentMethodInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const PaymentMethodSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const PaymentMethodUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const PaymentMethodDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  