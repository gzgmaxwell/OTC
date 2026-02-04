import request from "@p/request";
const url = "/buyCoins";

//买单分页
export const BuyCoinsPage = params =>
  request({
    method: "get",
    url: url+"/member/page",
    params
  });
export const BuyCoinsList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const BuyCoinsInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


// 放行

export const releaseOrder = id =>
  request({
    method: "post",
    url: url+"/release/"+id
  });


  export const BuyCoinsSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const BuyCoinsUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const BuyCoinsDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  