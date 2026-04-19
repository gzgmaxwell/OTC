import request from "@p/request";
const url = "/merchant";

//转账记录分页
export const member_list = params =>
  request({
    method: "get",
    url: url + "/member/list",
    params
  });
export const TransferRecordDelete = data =>
  request({
    method: "delete",
    url: url + "/deletes",
    data
  });