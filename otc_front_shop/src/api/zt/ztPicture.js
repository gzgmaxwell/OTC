import request from "@p/request";
const url = "/ztPicture";

//图片分页
export const ZtPicturePage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const ZtPictureList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const ZtPictureInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const ZtPictureSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const ZtPictureUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const ZtPictureDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  