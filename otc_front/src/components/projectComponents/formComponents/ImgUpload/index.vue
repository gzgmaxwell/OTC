<!--
 * @Descripttion:
 * @version:
 * @Author: 某人
 * @Date: 2022-03-16 19:48:58
-->
<template>
  <div>
    <div v-if="type === 'file'">
      <el-upload
        :action="fileManage.uploadPath"
        :http-request="handleUploadFile"
        :on-remove="handleRemove"
        :accept="accept"
        multiple
        v-loading="type === 'picture-card'?btnLoading:null"
        :show-file-list="true"
        :file-list="previewFileList"
        :class="['file-box', (previewFileList && previewFileList.length < maxLength) ? '' : 'btn-none']"
      >
        <div v-if="(previewFileList && previewFileList.length < maxLength)">
          <el-button size="small" type="primary" :loading="btnLoading">{{ item.btnText || '上传文件' }}</el-button>
        </div>
        <slot name="tip"></slot>
      </el-upload>
    </div>

    <div v-else :class="['img-content', $attrs.isView ? 'not-upload' : '', type === 'picture-card' ? 'img-contents-card' : '']">
      <el-upload
        :action="fileManage.uploadPath"
        :http-request="handleUploadFile"
        :on-progress="handleProgress"
        multiple
        :list-type="type"
        :accept="accept"
        v-loading="type === 'picture-card'?btnLoading:null"
        :class="['upload-box', type === 'picture-card' ? 'box-border' : '', maxLength <= previewImgList.length ? 'not-upload' : '' ]"
        ref="pictureUploadRef"
        :limit="maxLength"
        :on-exceed="handleExceed"
        :file-list="previewImgList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}" class="upload-item-box">
            <!-- <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            > -->
            <el-image
               class="upload-item-thumb"
              :src="file.url"
              fit="cover"></el-image>
            <!-- <div class="upload-item-thumb" :style="{backgroundImage: `url(${file.url})`}"></div> -->
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePreviewClick(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <!-- <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span> -->
              <span
              v-if="($attrs.isView !== true)"
                class="el-upload-list__item-delete"
                @click="handleDeleteClick(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
      </el-upload>
    </div>

    <!-- 预览 -->
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import * as fileManage from '@/util/fileManage'

export default {
  props: {
    maxLength: {
      type: Number,
      default: 6
    },
    imgList: {
      type: Array,
      default: () => []
    },
    type: {
      // text,picture-card,link
      type: String,
      default: () => 'text'
    },
    accept: {
      type: String,
      default: () => ''
    },
    size: {
      type: Number,
      default: () => 500
    },
    item:{
      type: Object,
      default: () =>{}
    }
  },
  data() {
    return {
      fileManage,
      previewImgList: [],
      dialogImageUrl: '',
      btnLoading: false,
      dialogVisible: false,
      previewFileList: [],
      tempFileList: []
    }
  },
  methods: {
    updateArchive(row) {
      let link = document.createElement('a')
      let body = document.querySelector('body')
      link.href = row.url
      link.style.display = 'none'
      body.appendChild(link)
      link.click()
      body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    },
    beforeUpload(file) {
      const { size, accept } = this
      if (accept && accept !== '') {
        const filName = '.' + file.name.substring(file.name.lastIndexOf('.') + 1)
        const arr = accept.split(',')
        if (
          arr.some((v) => {
            return v === filName
          })
        ) {
          return true
        } else {
          this.$message({
            message: `请上传${accept}格式文件`,
            type: 'warning'
          })
          return false
        }
      } else {
        const limitSize = file.size / 1024 / 1024 < Number(size)
        if (!limitSize) {
          this.$message({
            message: `上传文件不能大于${size}M!`,
            type: 'warning'
          })
          return false
        } else {
          return true
        }
      }
    },
    handleUploadFile(e) {
      console.log('e===>',e)
      if (this.beforeUpload(e.file)) {
        this.btnLoading = true
        fileManage.uploadFile(e).then((response) => {
          this.btnLoading = false
          let tempList = [];
          this.previewImgList.push({name: response.newFileName, url: response.url, newFileName: response.newFileName})
          // for (const file of response.mapList) {
          //   this.previewImgList.push(file)
          // }
          // this.previewImgList.map((item,index)=> {
          //   item.id = index
          // })
          // this.previewImgList = [...this.tempFileList, ...tempList]
          this.previewImgList.map((item,index)=> {
            item.id = index
          })

          this.$emit('uploadSuccess', [...this.previewImgList])
        })
      }
    },
    handleProgress(event, file, fileList){
      console.log('1----handleProgress====>', fileList)

    },
    handlePreviewClick(e) {
      this.dialogImageUrl = e.url
      this.dialogVisible = true
    },
    // 图片删除
    handleDeleteClick(file) {
      this.previewImgList.forEach((element, index) => {
        if (element.id === file.id || element.uid === file.uid) {
          this.previewImgList.splice(index, 1)
        }
      })
    },
    // 文件删除
    handleRemove(file) {
      // console.log('需要删除的是file===2',file)
      // this.previewFileList.shift()
      // this.$emit('uploadSuccess', this.previewFileList)
      this.previewFileList.forEach((element, index) => {
        if (element.id === file.id || element.uid === file.uid) {
          this.previewFileList.splice(index, 1)
        }
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.maxLength} 个文件`);
      // this.$message.warning(`当前限制选择 ${this.maxLength} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  },
  watch: {
    imgList: {
      immediate: true,
      handler(val) {
        // if(!this.previewImgList.length) this.previewImgList = val;
        // console.log('imgList', val)
        this.previewFileList = val;
        this.previewImgList = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.imglink {
  width: 300px;
  color: #4477dc;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
}
.img-content {
  flex-wrap: wrap;
  align-items: center;
  .img-list {
    display: inline;
    vertical-align: top;
    // justify-content: flex-start;
    // flex-wrap: wrap;
    // align-items: center;
  }

  .img-item {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    line-height: 100px;
    text-align: center;
    color: #666;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
      transition: all 0.2s;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size:contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      i {
        color: #fff;
        &:first-child {
          margin-right: 5px;
        }
      }
    }
    &:hover {
      .overlay {
        opacity: 1;
        // display: block;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep .upload-box .el-upload {
  // border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
    border-color: #409EFF;
  }
}
::v-deep .box-border {
  display: inline-block;
  vertical-align: top;
  .el-upload-list__item {
    width: 100px;
    height: 100px;
    .upload-item-box {
      width: 100%;
      height: 100%;
    .upload-item-thumb {
      width: 100%;
      height: 100%;
      background-position: 50% 50%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    }
  }
}
::v-deep .box-border .el-upload {
  border: 1px dashed #d9d9d9;
    margin-right: 10px;
    margin-bottom: 10px;
}
.preview-img {
  width: 100%;
  height: 100%;
}

.btn-none ::v-deep .el-upload {
  display: none;
}
.file-box ::v-deep .el-upload-list li:first-child{
  margin-top: 6px;
}


.img-contents-card {
  // display: flex;
  // justify-content: flex-start;
  .upload-box {
    margin: 10px 10px 10px 0;
  }
  .img-list{
    vertical-align: top;
    .img-item {
      margin: 10px 10px 10px 0;
    }
  }
}

.not-upload {
  ::v-deep .el-upload {
    display: none !important;
  }
}


::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: none;
}
::v-deep .el-list-enter,
::v-deep .el-list-leave-active {
  opacity: 0;
}
</style>
