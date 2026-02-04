import request from "@p/request";
const url = "/sellCoins";

//卖币分页
export const SellCoinsPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const SellCoinsList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const SellCoinsInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const SellCoinsSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const SellCoinsUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const SellCoinsDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  