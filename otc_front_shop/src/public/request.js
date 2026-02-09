
import { setToken, setUserInfo} from "@p/storage";
import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";
import router from "@r";
import config from "@p/config";
class NewAxios {
  handleError = result => {
    let { code, data ,msg } = result;
  
    switch (code) {
      case "401":
        Message({
          message: msg ? `${msg}` : `token过期，请重新登录`,
          type: "error"
        });
        router.push("/login");
        break;
      case "403":
        Message({
          message: msg ? `${msg}` : `没有权限，请联系管理员`,
          type: "error"
        });
        break;
      case "406":
        Message({
          message: msg,
          type: "error"
        });
          setToken(data.token);
          setUserInfo(data);
          Vue.prototype.userInfo = data;
        router.push("/auth");

        break;
      default:
        Message({
          message: msg ? `${msg}` : ` 系统维护中`,
          type: "error"
        });
        break;
    }
    return Promise.reject(error);
  };
  create() {
    return options => {
      const instance = axios.create({
        baseURL: config.http_url + "/api",
        timeout: 1000 * 30
      });
      instance.interceptors.request.use(
        config => {
          config.headers["Authorization"] = window.getToken();
          config.headers["Content-Type"] = "application/json;charset=UTF-8";
          return config;
        },
        error => Promise.reject(error)
      );
      instance.interceptors.response.use(
        response => {
          if (response.data && response.data.code == "200") {
            return Promise.resolve(response.data.data);
          }
          return this.handleError(response.data);
        },
        error => {
          return error.response
            ? this.handleError(error.response)
            : Promise.reject(error);
        }
      );
      return instance(options);
    };
  }
}
export default new NewAxios().create();
