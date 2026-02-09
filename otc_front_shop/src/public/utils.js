
import { Loading } from 'element-ui';

import JSEncrypt from "jsencrypt";


export const loading={
  open() {

    var options ={           // 声明一个loading对象
      lock: true,                             // 是否锁屏
      text: '加载数据中',                         // 加载动画的文字
      spinner: 'el-icon-loading',             // 引入的loading图标
      background: 'rgba(255, 255, 255, 255)',       // 背景颜色
      target: '.el-table, .table-flex, .region',       // **需要遮罩的区域，这里写要添加loading的选择器**
      fullscreen: false,
      customClass: 'loadingclass'             // **遮罩层新增类名，如果需要修改loading的样式**
    }

    // setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   loading.close();                        // 关闭遮罩层
    // },5000)
    return Loading.service(options);
  },
  close(loading){

    loading.close();
  },
  closeAll(){
    Loading.closeAll();
  }

};


export  function jm(str) {
  const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCxwKFSELNk7+aoZlp0E3EYmh/UeJKVb2ixjg19vXx5ZFMA8sJOJl/aUPGhMAJKuxsAdoRSwzXIdSNX+IVdt5J/fFmuwL0n3Igxt6ZUwRj3pEUgMRMZIiO1ZPdP2PpyGfVOMlrOip4zHP6hWJSfFRlu7cR44rxRbRCIq6wxZlFqQIDAQAB";
const encryptor = new JSEncrypt(); // 新建JSEncrypt对象
encryptor.setPublicKey(publicKey); // 设置公钥
  
return encryptor.encrypt(str);

}




/*删除地址栏中，指定的参数名*/
export function delParam(paramKey) {
  var url = window.location.href;    //页面url
  var urlParam = window.location.search.substr(1);  //页面参数
  var beforeUrl = url.substr(0, url.indexOf("?"));  //页面主地址（参数之前地址）
  var nextUrl = "";
  var arr = new Array();
  if (urlParam != "") {
      var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
      for (var i = 0; i < urlParamArr.length; i++) {
          var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
          //如果键雨要删除的不一致，则加入到参数中
          if (paramArr[0] != paramKey) {
              arr.push(urlParamArr[i]);
          }
      }
  }
  if (arr.length > 0) {
      nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url;
}

//根据url参数名称获取参数值
export function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}
/**
 * 判断是否为空
 * @param datas
 * @returns
 */
export function isEmpty(obj) {
  var flag = false;
  if (obj == null || obj == "null") {
    flag = true;
  } else if (obj == undefined || obj == "undefined") {
    flag = true;
  } else if (obj === false || obj === true) {
    flag = false;
  } else if (obj == "" || obj.trim == "") {
    flag = true;
  } else if (obj instanceof Array && obj == []) {
    flag = true;
  }
  return flag;
}

export function unique (arr) {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr) && res.set(arr, 1))
  }



  // 格式化日对象
  export function getNowDate (){
  var date = new Date();
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}


export function download(url){

  if(valiImgType(url)){
    downloadIamge(url)
  }else{
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.click()
    a.remove()
  }
  

}

export function downloadIamge(imgsrc) {
  var image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    var event = new MouseEvent('click')
    a.download =  'photo'
    a.href = url
    a.dispatchEvent(event)
  }
  image.src = imgsrc
}



//验证URL
function validUrl(strUrl){
  strUrl = strUrl.match(/http:\/\/.+/) 
  alert(strUrl)
    
  if(strUrl==null)
    return false
  else
    return true
}


//验证上传图片格式
function valiImgType(str){
  if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)){
    return false
  }else{
    return true
  }
        
}

//文件扩展名
function getFileUploadExtension(obj) {
  if (obj !== null) {
    var value = obj.value.trim()
    if (value.length > 0) {
      var index = value.lastIndexOf('.') + 1
      var ext = value.substring(index).toLowerCase()
      return ext
    }
  }
  return ''
}