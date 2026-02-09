import request from "@p/request";
const url = "/sysGrow";

// 生长模型分页查询
export const SysGrowPage = params =>
  request({
    method: "get",
    url: url+"/page",
    params
  });

// 生长模型新增
export const SysGrowSave = data =>
  request({
    method: "post",
    url: url+"/add",
    data
  });

// 获取详情
export const SysGrowInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id
  });

// 生长模型更新
export const SysGrowUpdate = data =>
  request({
    method: "post",
    url: url+"/put/"+data.id,
    data
  }); 

export const SysGrowDelete = data =>
  request({
    method: "post",
    url: url+"/deletes",
    data
  });
   

  


  
  
 
  