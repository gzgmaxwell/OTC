import request from "@p/request";

const url = "/sys/admin";

// 获取列表
export const AdminList = params =>
  request({
    method: "get",
    url: url+`/page`,
    params
  });
// 获取详情
export const AdminInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id,
  });
// 删除
export const AdminDelete = data =>
  request({
    method: "post",
    url: url+`/deletes`,
    data
  });
// 新增
export const AdminSave = data =>
  request({
    method: "post",
    url: url+`/add`,
    data
  });
// 编辑
export const AdminUpdate = (data, id) =>
  request({
    method: "post",
    url: url+"/put/"+id,
    data
  });
// 重置密码
export const ResetPassword = id =>
  request({
    method: "post",
    url: `/user/pwd/${id}`
  });
