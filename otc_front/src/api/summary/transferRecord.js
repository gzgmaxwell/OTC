import request from "@p/request";
const url = "/transferRecord";

//转账记录分页
export const TransferRecordPage = params =>
  request({
    method: "get",
    url: url + "/money/page",
    params
  });
export const TransferRecordDelete = data =>
  request({
    method: "delete",
    url: url + "/deletes",
    data
  });

// 获取详情
export const TransferRecordInfo = id =>
  request({
    method: "get",
    url: url + "/get/" + id
  });

export const TransferRecordSave = data =>
  request({
    method: "post",
    url: url + "/add",
    data
  });


export const TransferRecordUpdate = data =>
  request({
    method: "put",
    url: url + "/put/" + data.id,
    data
  });
