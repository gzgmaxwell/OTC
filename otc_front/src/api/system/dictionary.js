import request from "@p/request";
//数据字典
const url = `/system/sysDictionary`;
//数据字典子集
const childrenList = `/system/sysDictionary/childrenList`;

//上级目录/权限
const parentDirectory = `/res/getTree`;


// 获取列表
export const DicList = params =>
  request({
    method: "get",
    url: `${url}/all`,
    params
  });


  // 获取指定名称的选项
export const GetList = params =>
request({
  method: "get",
  url: `${url}/getList`,
  params
});


// 获取分页
export const DicPage = params =>
  request({
    method: "get",
    url: url+`/page`,
    params
  });
// 获取详情
export const DicInfo = id =>
  request({
    method: "get",
    url: url+"/get/"+id,
  });
// 删除
export const DictyDelete = data =>
  request({
    method: "post",
    url: url+`/deletes`,
    data
  });
// 新增
export const DicAdd = data =>
  request({
    method: "post",
    url: url+`/add`,
    data
  });
// 编辑
export const DicUpdate = (data, id) =>
  request({
    method: "post",
    url: url+"/put/"+id,
    data
  });

  //   //数据字典列表
//   dictionaryAllList(params) {
//     return request({
//       method: "get",
//       url: jsonUrl.dataDictionary + "/all",
//       params
//     });
//   },