import request from "@p/request";
const url = "/chatHistory";

//聊天记录分页
export const ChatHistoryPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const ChatHistoryList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const ChatHistoryInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const ChatHistorySave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const ChatHistoryUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const ChatHistoryDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  