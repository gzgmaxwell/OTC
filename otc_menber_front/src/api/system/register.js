import request from "@p/requestRegister";
const url = "/user";


  export const UserZczh = data =>
  request({
    method: "post",
    url: url+"/zczh",
    data
  });
