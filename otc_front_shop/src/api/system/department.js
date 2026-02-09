import request from "@p/request";

const url = "/system/sysDepartment";

// 获取部门树
export const DepartmentCascader = () =>
  request({
    method: "get",
    url: url + "/cascader"
  });

// sysDepartmentList(params) {
//   return request({
//     method: "get",
//     url: jsonUrl.sysDepartment + "",
//     params: params
//   });
// },
// //部门管理列表所有
// sysDepartmentAllList(params) {
//   return request({
//     method: "get",
//     url: jsonUrl.sysDepartment + "/all",
//     params: params
//   });
// },
// //部门管理详情
// sysDepartmentInfo(id) {
//   return request({
//     method: "get",
//     url: `${jsonUrl.sysDepartment}/${id}`
//   });
// },
// //部门管理保存
// sysDepartmentSave(params) {
//   return request({
//     method: "post",
//     url: jsonUrl.sysDepartment + "",
//     params: params
//   });
// },
// //部门管理修改
// sysDepartmentUpdate(params, id) {
//   return request({
//     method: "post",
//     url: `${jsonUrl.sysDepartment}/${id}`,
//     params: params,
//     id: id
//   });
// },
// //部门管理删除
// sysDepartmentDelete(params) {
//   return request({
//     method: "post",
//     url: jsonUrl.sysDepartment + "",
//     params: params
//   });
// },
//   //部门信息
//   departmentList(params) {
//     return request({
//       method: "get",
//       url: jsonUrl.department,
//       params
//     });
//   },

//   //部门树
//   departmentTree(params) {
//     return request({
//       method: "get",
//       url: jsonUrl.departmentTree,
//       params
//     });
//   },

//   //部门新增保存
//   departSave(data) {
//     return request({
//       method: "post",
//       url: jsonUrl.depart,
//       data
//     });
//   },
//   //部门编辑保存
//   departUpdate(data, id) {
//     return request({
//       method: "post",
//       url: `${jsonUrl.depart}/${id}`,
//       data,
//       id: id
//     });
//   },
//   //部门删除
//   departDelete(data) {
//     return request({
//       method: "post",
//       url: jsonUrl.depart,
//       data
//     });
//   },
