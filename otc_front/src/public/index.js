import Vue from "vue";
import { getToken, getUserInfo, getDics ,removeUserInfo} from "@p/storage";

import config from "@p/config";
import { unique,getNowDate,isEmpty,loading,download,jm,getUrlKey} from "@p/utils";
import { filterDate } from "@f";
import { encrypt ,decrypt } from "@p/sm2";
import { formValidateConstant, formValidator } from "./formValidator";
// Vue.prototype挂载
Vue.prototype.userInfo = getUserInfo();
Vue.prototype.dics = getDics();
Vue.prototype.getUrlKey = getUrlKey();
Vue.prototype.getNowDate = getNowDate();
Vue.prototype.getUrlKey = getUrlKey;
Vue.prototype.http_url = config.http_url;
Vue.prototype.upload_url = config.upload_url;
Vue.prototype.filterDate = filterDate; // 例如：this.filterDate(date, 'yyyy-MM-dd hh:mm:ss')
Vue.prototype.formValidator = formValidator;
Vue.prototype.formValidateConstant = formValidateConstant;
Vue.prototype.getToken = getToken;
Vue.prototype.download = download;
Vue.prototype.jm = jm;
// Vue.prototype.encrypt = encrypt;
// Vue.prototype.decrypt = decrypt;

// window变量挂载
// window.encrypt = encrypt;
// window.decrypt = decrypt;
window.download = download;
window.getToken = getToken;
window.unique = unique;
window.isEmpty = isEmpty;
window.loading = loading;
window.jm = jm;
window.getUrlKey = getUrlKey;



Vue.prototype.loading = loading;