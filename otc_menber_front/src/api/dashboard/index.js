import request from "@p/request";
//灾害测报统计分析数据
export const disasterInfo = (params) =>
  request({
    method: "get",
    url: "/sbgl/data/tjfx",
    params,
  });

export const tableInfo = (params) =>
  request({
    method: "get",
    url: "/sbglBjjl/3l/page",
    params,
  });

export const tableInfo2 = (params) =>
  request({
    method: "get",
    url: "/sbglBjjl/3b/page",
    params,
  });

export const xmList = (params) =>
  request({
    method: "get",
    url: "/xmglXm/all",
    params,
  });

export const bjsbPage = (params) =>
  request({
    method: "get",
    url: "/sbgl/bjsbtjfx",
    params,
  });

export const sjfx = (params) =>
  request({
    method: "get",
    url: "/sbgl/data/sjfx",
    params,
  });

export const sjfx2 = (params,type) =>
  request({
    method: "get",
    url: "/sbgl/data/sjfx"+ type,
    params,
  });
export const sbzxl = (params) =>
  request({
    method: "get",
    url: "/xmsbzxl/sbzxl",

    params,
  });


  export const xmsbzxl = (params) =>
  request({
    method: "get",
    url: "/xmsbzxl/xmsbzxl",

    params,
  });  
