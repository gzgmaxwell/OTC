import request from "@p/request";
const url = "/transactionAppeal";

//交易申诉分页
export const TransactionAppealPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const TransactionAppealList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const TransactionAppealInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const TransactionAppealSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const TransactionAppealUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const TransactionAppealDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  