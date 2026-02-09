import request from "@p/request";
const url = "/dataGxjl";

//更新记录分页
export const DataGxjlPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });
export const DataGxjlList = params =>
  request({
    method: "get",
    url: url+"/all",
    params
  });


// 获取详情
export const DataGxjlInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });


  export const DataGxjlSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

  export const DataGxjlUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  });  
  
 
 export const DataGxjlDelete = data =>
 request({
   method: "post",
   url: url+"/deletes",
   data
 });
  