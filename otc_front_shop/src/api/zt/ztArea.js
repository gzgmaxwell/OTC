import request from "@p/request";
const url = "/ztArea";

//区域分页
export const ZtAreaPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const ZtAreaList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const ZtAreaInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const ZtAreaSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const ZtAreaUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const ZtAreaDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  