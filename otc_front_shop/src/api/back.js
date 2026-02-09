import config from "../config/sys-config.js";

// 登录
const login = `${config.http_url}/api/auth/login`;

//登出
const logout = `${config.http_url}/api/auth/logout`;

//修改密码
const changePwd = `${config.http_url}/api/user/pwd`;

//侧边菜单
const sideMenu = `${config.http_url}/api/res/queryResListByUserIdAndResType`;

//动态路由
const router = `${config.http_url}/api/res/menu`;

//数据转换接口
const getDics = `${config.http_url}/api/system/sysDictionary/getDics`;

const dic = `${config.http_url}/api/system/sysDictionary`;

//管理员列表
const adminList = `${config.http_url}/api/sys/admin`;

//用户管理
const users = `${config.http_url}/api/system/sysUser`;

//部门
const sysDepartment = `${config.http_url}/api/system/sysDepartment`;

//角色列表
const role = `${config.http_url}/api/role/all`;

//全部地区接口
const area = `${config.http_url}/api/sysOrg`;

//地区树
const areaTree = `${config.http_url}/api/sysOrg/getTree`;

//地区详情
const getArea = `${config.http_url}/api/sysOrg/get`;

//新增地区保存
const saveArea = `${config.http_url}/api/sysOrg/post`;

//编辑地区保存
const updateArea = `${config.http_url}/api/sysOrg/put`;

//删除地区保存
const deleteArea = `${config.http_url}/api/sysOrg/deletes`;

//数据字典
const dataDictionary = `${config.http_url}/api/system/sysDictionary`;

//数据字典子集
const childrenList = `${config.http_url}/api/system/sysDictionary/childrenList`;

//资源管理
const resource = `${config.http_url}/api/res`;

//上级目录/权限
const parentDirectory = `${config.http_url}/api/res/getTree`;

//获得所有目录
const allTree = `${config.http_url}/api/res/tree/all`;

//接口/菜单更新保存
const updateRoleAndRes = `${config.http_url}/api/res/updateRoleAndRes`;

//角色管理
const roleManage = `${config.http_url}/api/role`;

//行政区划管理
const administrative = `${config.http_url}/api/sysOrg/ztree`;

//缓存管理
const sysCache = `${config.http_url}/api/sysCache`;

//角色管理管理
const sysPost = `${config.http_url}/api/sysPost`;

export default {
  login,
  logout,
  changePwd,
  sideMenu,
  getDics,
  adminList,
  router,
  sysDepartment,
  role,
  area,
  areaTree,
  getArea,
  users,
  saveArea,
  updateArea,
  deleteArea,
  dataDictionary,
  childrenList,
  resource,
  parentDirectory,
  updateRoleAndRes,
  roleManage,
  administrative,
  allTree,
  sysPost,
  dic,
  sysCache,
  farmVariety
};
