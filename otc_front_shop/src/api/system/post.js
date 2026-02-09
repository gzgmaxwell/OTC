import request from "@p/request";

const url = "/sysPost";

// 获取角色树
export const PostCascader = params =>
  request({
    method: "get",
    url: url + "/cascader",
    params
  });

// 获取列表
export const PostList = params =>
  request({
    method: "get",
    url: url + "/page",
    params
  });

// 删除
export const PostDelete = data =>
  request({
    method: "post",
    url: url + "/deletes",
    data
  });

// 新增
export const PostSave = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });

// 编辑
export const PostUpdate = (data, id) =>
  request({
    method: "post",
    url: `${url}/put/${id}`,
    data
  });

// 详情
export const PostInfo = id =>
  request({
    method: "get",
    url: `${url}/get/${id}`
  });
