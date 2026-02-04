import request from "@p/request";
const url = "/downloadRecord";

//下载记录分页
export const DownloadRecordPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const DownloadRecordList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const DownloadRecordInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const DownloadRecordSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const DownloadRecordUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const DownloadRecordDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  