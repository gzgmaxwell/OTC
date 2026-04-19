import { setToken, setUserInfo } from "@p/storage";
import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";
import router from "@r";
import config from "@p/config";
class NewAxios {
  readBlobAsText(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }
  handleError = result => {
    let { code, data, msg } = result;

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
    return Promise.reject(result);
  };
  create() {
    return options => {
      const instance = axios.create({
        baseURL: config.http_url + "/api",
        timeout: 1000 * 30,
        responseType: "blob"
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
        async response => {
          const contentType = (response.headers && response.headers["content-type"]) || "";

          if (contentType.includes("application/json") && response.data instanceof Blob) {
            const text = await this.readBlobAsText(response.data);
            const json = JSON.parse(text || "{}");
            if (json && json.code == "200") return Promise.resolve(json.data);
            return this.handleError(json);
          }

          return Promise.resolve(response);
        },
        error => {
          if (!error.response) return Promise.reject(error);

          const res = error.response;
          const contentType = (res.headers && res.headers["content-type"]) || "";
          if (contentType.includes("application/json") && res.data instanceof Blob) {
            return this.readBlobAsText(res.data)
              .then(text => JSON.parse(text || "{}"))
              .then(json => this.handleError(json));
          }

          return Promise.reject(error);
        }
      );
      return instance(options);
    };
  }
}
export default new NewAxios().create();
