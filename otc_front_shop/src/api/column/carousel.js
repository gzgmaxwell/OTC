import request from "@p/request";
const url = "/carousel";

//轮播图分页
export const CarouselPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const CarouselList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const CarouselInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const CarouselSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const CarouselUpdate = data =>
  request({
    method: "put",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const CarouselDelete = data =>
 request({
   method: "delete",
   url: url+"/deletes",
   data
 });
  