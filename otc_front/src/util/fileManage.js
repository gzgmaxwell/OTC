/*
 * @Descripttion: 文件上传下载
 * @version: 1.0.0
 * @Author: 某人
 * @Date: 2022-02-14 09:11:07
 */
import axios from 'axios'
import httpRequest from "@p/request";
import { Message } from 'element-ui'
import config from '@p/config'
// import { getToken } from '@/utils/auth'
let uploadStatus = false
// const uploadPath = 'http://qazapis.cs01.site/api/file/upload'

// const uploadPath = process.env.VUE_APP_BASE_API + '/common/upload'
const uploadPath = config.upload_url

// const delPath = '/minio/file/delete'
// const detailPath = '/minio/file/list'
// const downLoadPath = '/minio/file/download'
// 把接收到的file转换为formData对象
function _createFormData(files) {
  files = Array.isArray(files) ? files : [files]
  let formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file.file ? file.file : file)
  })
  return formData
}
/**
 * @name: uploadFile
 * @desc: 上传文件
 * @param {file} files 文件集合
 */
function uploadFile(files) {
  const formData = _createFormData(files)
  return new Promise((resolve, reject) => {
    axios({
      url: uploadPath,
      method: 'POST',
      data: formData,
      // headers: {
      //   Authorization: 'Bearer ' + getToken()
      // }
    })
      .then((res) => {
        let response = res.data
        console.log(response)
        if (response.code != 200) {
          Message.error(response.msg)
          reject(response.msg)
        } else {
          Message.success('上传成功')
          resolve(response)
        }
      })
      .catch((e) => {
        Message.error(e)
        reject(e)
      })
  })
}
/**
 * @name: getFileDetail
 * @desc: 获取文件详情
 * @param {string, number} ids 传递的ID集合，接收数组或者是字符串
 * @return {*} 返回文件对象
 */
function getFileDetail(ids) {
  return new Promise((resolve, reject) => {
    httpRequest({
      url: `${detailPath}/${ids.join(',')}`,
      method: 'GET'
    })
      .then((response) => {
        if (!response.success) {
          Message.error(response.msg)
          reject(response.msg)
        } else {
          resolve(response.data)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}
/**
 * @name: delFile
 * @desc: 获取文件详情
 * @param {string, number} ids 传递的ID集合，接收数组或者是字符串
 * @return {*} 返回文件对象
 */
function delFile(ids) {
  return new Promise((resolve, reject) => {
    httpRequest({
      url: `${delPath}/${ids.join(',')}`,
      method: 'GET'
    })
      .then((response) => {
        if (!response.success) {
          Message.error(response.msg)
          reject(response.msg)
        } else {
          resolve(response.data)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}
/**
 * @name: downloadFile
 * @desc: 获取文件详情
 * @param {string, number} ids 传递的ID集合，接收数组或者是字符串
 * @return {*} 返回文件对象
 */
/**
 * @description 文件下载
 * @param {string} url 请求地址 `/api/${url}/export`
 * @param {object} data 请求参数
 * @param {string} fileName 下载文件名
 * @param {string} fileType 下载文件类型
 * @example
 * downloadFile('sys/demo', { field: 'value' }, { '示例表格.xlsx', 'application/vnd-ms.xls' })
 */
function downloadFile(ids, { fileName, fileType }) {
  httpRequest({
    url: `${downLoadPath}/${ids}`,
    method: 'GET',
    headers: {
      responseType: 'blob',
    }
  })
    .then((res) => {
      const blob = new Blob([res.data], { type: fileType })
      const fileUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = fileUrl + `.${fileType}`
      link.download = fileName + `.${fileType}`
      link.click()
      URL.revokeObjectURL(fileUrl)
    })
    .catch(() => {
      Message.error('导出失败')
    })
}

// 下载图片
function downImgUrl(config){
  const a = document.createElement('a') // 创建一个a标签
  a.href = config.src // a标签的src属性赋值
  if (config.target) {
    a.target = config.target
  }
  a.download = config.fileName // a标签的download属性赋值
  document.body.appendChild(a) // 添加a标签到body下
  a.click() // 触发a标签点击事件
  document.body.removeChild(a) //  完成后删除a标签
}

/**
 * 获取图片的 base64 编码
 * @param image 图像对象
 * @return {string} 返回已编码的 base64数据
 */
function getImageBase64(image){
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, image.width, image.height)
  // 获取图片后缀名
  const extension = image.src
    .substring(image.src.lastIndexOf('.') + 1)
    .toLowerCase()
    // 某些图片 url 可能没有后缀名，默认是 png
  return canvas.toDataURL('image/' + extension, 1)
}

/**
* 单张图片下载
* @param url 图像链接
* @param downloadName 图片名称
*/
function  downloadImage(url, downloadName){
  const link = document.createElement('a')
  link.setAttribute('download', downloadName)
  const image = new Image()
  // 添加时间戳，防止浏览器缓存图片
  image.src = url + '?timestamp=' + new Date().getTime()
  // 设置 crossOrigin 属性，解决图片跨域报错
  image.setAttribute('crossOrigin', 'Anonymous')
  image.onload = () => {
    link.href = getImageBase64(image)
    link.click()
  }
}

/**
 * base64转文件
 */
function base64ImgtoFile(dataurl, filename = "file") {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  });
}


export { uploadFile, uploadPath, uploadStatus, getFileDetail, delFile, downloadFile,downImgUrl,downloadImage,base64ImgtoFile }
