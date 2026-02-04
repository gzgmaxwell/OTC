/* eslint-disable no-useless-escape */
export const formValidateConstant = {
  //手机验证
  isPhone: /^0?1[0-9][0-9]\d{8}$/,
  //座机
  isMob: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
  //身份证
  isIDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  //邮编
  isPostalCode: /^[1-9][0-9]{5}$/,
  //合法文件名
  isNotFileName: /[\\\\/:*?\"<>|]/,
  //传真
  isFAX: /^(\d{3,4}-)?\d{7,8}$/,
  //空格
  existSpace: /^[^\s]*$/,
  //数字
  onlyNum: /^[0-9]*$/,
  //邮箱
  isEmall: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
  //url
  isUrl: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
};

export const formValidator = {
  //自定义验证，字符串
  customValidate(rule, value, callback, reg, errMsg) {
    //不符合要求
    try {
      if (!reg) {
        callback(errMsg);
      }
      try {
        reg.test(value);
      } catch (err) {
        //不是正则（不是//开头结尾）而是字符串则转换
        reg = new RegExp(reg);
      }
      try {
        if (!reg.test(value)) {
          callback(errMsg);
        }
      } catch (err) {
        //验证失败
        callback("验证规则失败");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  //验证字符串最大长度，不验证最小
  validateStrMaxLength(rule, value, callback, maxLen, errMsg) {
    //验证字符串最大长度
    try {
      if (!value) {
        callback();
      } else {
        if (value.length > maxLen) {
          if (errMsg) {
            callback(errMsg);
          } else {
            callback("长度不能超过" + maxLen + "个");
          }
        }
        callback();
      }
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  //验证字符串最小长度
  validateStrMinLength(rule, value, callback, minLen, errMsg) {
    //验证字符串最小长度
    try {
      if (!value) {
        if (errMsg) {
          callback(errMsg);
        } else {
          if (Number(minLen) == 1) {
            callback("必填");
          } else {
            callback("长度不能小于" + len + "个");
          }
        }
      } else {
        if (value.length < minLen) {
          if (errMsg) {
            callback(errMsg);
          } else {
            if (Number(minLen) == 1) {
              callback("必填");
            } else {
              callback("长度不能小于" + len + "个");
            }
          }
        }
        callback();
      }
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateContactInfo(rule, value, callback) {
    try {
      //验证联系方式，包括手机和座机
      //手机号码

      var isPhone = formValidateConstant.isPhone;
      // 座机格式
      var isMob = formValidateConstant.isMob;
      if (!isMob.test(value) && !isPhone.test(value)) {
        callback("联系方式只能是座机或者手机号");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validatePhone(rule, value, callback) {
    try {
      //验证联系方式
      //手机号码
      var isPhone = formValidateConstant.isPhone;
      if (!isPhone.test(value)) {
        callback("手机号格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateLandline(rule, value, callback) {
    try {
      //验证联系方式
      // 座机格式
      var isMob = formValidateConstant.isMob;
      if (!isMob.test(value)) {
        callback("固定电话格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateIDCard(rule, value, callback) {
    try {
      //简单验证身份证
      var reg = formValidateConstant.isIDCard;
      if (!reg.test(value)) {
        callback("身份证格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validatePostalCode(rule, value, callback) {
    try {
      //简单验证邮编
      var reg = formValidateConstant.isPostalCode;
      if (!reg.test(value)) {
        callback("邮政编码格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateEmall(rule, value, callback) {
    try {
      //简单验证邮箱
      var reg = formValidateConstant.isEmall;
      if (!reg.test(value)) {
        callback("邮箱格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateFileName(rule, value, callback) {
    try {
      //简单验证文件名
      var reg = formValidateConstant.isNotFileName;
      if (reg.test(value)) {
        callback("文件名存在非法字符");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateFAX(rule, value, callback) {
    try {
      //传真格式
      var isFAX = formValidateConstant.isFAX;
      if (!isFAX.test(value)) {
        callback("传真格式不正确");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateSpace(rule, value, callback) {
    try {
      //不能有空格
      var existSpace = formValidateConstant.existSpace;
      if (!existSpace.test(value)) {
        callback("不能有空格！");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateOnlyNum(rule, value, callback) {
    try {
      //只能是数字
      var onlyNum = formValidateConstant.onlyNum;
      if (!onlyNum.test(value)) {
        callback("只能是数字！");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  },
  validateUrl(rule, value, callback) {
    try {
      //只能是url
      var isUrl = formValidateConstant.isUrl;
      if (!isUrl.test(value)) {
        callback("URL格式不正确！");
      }
      callback();
    } catch (err) {
      //验证失败
      callback("验证规则失败");
    }
  }
};
