const host = window.location.hostname;

let evnInfo = {
  curEvn: "", // 当前环境地址
  hostHref: "",
  appName: "otc",
  html_prefix: "vip",
  http_url: null, // 后端服务器地址
  upload_url: null, // 文件上传
  cookieValid: 30 * 60 * 1000 // cookie有效时长  单位（毫秒）
};

// 本地环境
evnInfo.hostHref = "http://localhost:26455";
// evnInfo.hostHref = "http://221.224.89.22:26400";
// evnInfo.hostHref = "https://sczy.fishseed.cn";
// evnInfo.hostHref = "http://10.96.33.5:26355";
evnInfo.html_url = "http://" + window.location.host + "/#/";

if (host.includes("h5.jingchat.com.cn")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://h5.jingchat.com.cn";
}

if (host.includes("39.97.254.203")) {
  evnInfo.hostHref = "http://39.97.254.203";
}


if (host.includes("45.77.69.197")) {
  evnInfo.hostHref = "http://45.77.69.197";
}

if (host.includes("www.d-xilzd.com")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://www.d-xilzd.com";
}

if (host.includes("www.k-xyudil.com")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://www.k-xyudil.com";
}

if (host.includes("www.s-odlrxi.com")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://www.s-odlrxi.com";
}
if (host.includes("www.m-lixtdu.com")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://www.m-lixtdu.com";
}
if (host.includes("www.p-iwdlax.com")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "https://www.p-iwdlax.com";
}
if (host.includes("18.221.156.131")) {
  // 	evnInfo.curEvn = 'https://edu.fclassroom.com';
  evnInfo.hostHref = "http://18.221.156.131";
}
// evnInfo.hostHref = "http://221.224.89.22:26400";

// evnInfo.hostHref = "https://clw.fishseed.cn";
// evnInfo.hostHref = "https://example.fishseed.cn";

  // evnInfo.hostHref = "https://www.d-xilzd.com";
  // evnInfo.hostHref = "https://h5.jingchat.com.cn";
evnInfo.http_url = evnInfo.hostHref + "/" + evnInfo.appName;
evnInfo.upload_url = evnInfo.http_url+ "/api/upload";
export default evnInfo;
