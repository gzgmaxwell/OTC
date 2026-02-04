import request from "@p/request";
const url = "/ztType";

//专题图类型分页
export const ZtTypePage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const ZtTypeList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const ZtTypeInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const ZtTypeSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const ZtTypeUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const ZtTypeDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  