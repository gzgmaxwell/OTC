
<template>
  <div class="apk-upload-container">
    <div class="upload-card">
      <h2 class="title">APK文件上传</h2>
      <p class="subtitle">请选择并上传您的Android应用程序安装包</p>
      
      <el-upload
        class="upload-area"
        drag
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
        :file-list="fileList"
        :limit="1"
        accept=".apk"
        v-loading="uploading"
        element-loading-text="文件上传中..."
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将APK文件拖到此处，或<em>点击选择文件</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          请上传APK格式文件，文件大小不超过200MB
        </div>
      </el-upload>

      <div v-if="fileInfo" class="file-info">
        <h3>文件信息</h3>
        <el-descriptions :column="1" size="small" border>
          <el-descriptions-item label="文件名">{{ fileInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="文件大小">{{ formatFileSize(fileInfo.size) }}</el-descriptions-item>
          <el-descriptions-item label="最后修改">{{ formatDate(fileInfo.lastModified) }}</el-descriptions-item>
          <el-descriptions-item label="文件类型">{{ fileInfo.type }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="action-buttons">
        <el-button 
          type="primary" 
          @click="submitUpload" 
          :disabled="!fileInfo || uploading"
          size="medium"
        >
          <i class="el-icon-upload2"></i>
          {{ uploading ? '上传中...' : '开始上传' }}
        </el-button>
        <el-button @click="clearFile" :disabled="!fileInfo" size="medium">
          <i class="el-icon-delete"></i>
          清空文件
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
export default {
  name: 'ApkUpload',
  data() {
    return {
      fileList: [],
      fileInfo: null,
      uploading: false
    }
  },
  methods: {
    handleFileChange(file, fileList) {

      
      if (fileList.length > 0) {
        const selectedFile = fileList[0].raw
        if (selectedFile && selectedFile.name.endsWith('.apk')) {
          this.fileInfo = {
            name: selectedFile.name,
            size: selectedFile.size,
            lastModified: selectedFile.lastModified,
            type: selectedFile.type || 'application/vnd.android.package-archive'
          }
          
           this.fileList=fileList;
        } else {
          this.$message.error('请选择有效的APK文件')
          this.clearFile()
        }
      }
    },
    handleFileRemove() {
      this.clearFile()
    },
    formatFileSize(size) {
      if (size === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(size) / Math.log(k))
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('zh-CN')
    },
    async submitUpload() {
      if (!this.fileInfo) {
        this.$message.warning('请先选择文件')
        return
      }

      this.uploading = true
      
      try {
        // 模拟上传过程
        // await new Promise(resolve => setTimeout(resolve, 2000))
           console.error('文件上传:', this.fileList);
                  
          let formData = new FormData();
          formData.append('file',this.fileList[0].raw); 
         await axios.post(this.upload_url+"?index=1", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Axios 会自动设置这个，通常不需要手动设置
                }
            })
            .then(response => {
                console.log('文件上传成功:', response);
            })
            .catch(error => {
                console.error('文件上传失败:', error);
});

        // 实际项目中应替换为真实上传逻辑
        // const formData = new FormData()
        // formData.append('file', this.fileList[0].raw)
        // const response = await this.$http.post('/api/upload/apk', formData)
     
        //  :action="upload_url+'?index=1'"
        this.$message.success('APK文件上传成功')
        this.clearFile()
      } catch (error) {
        console.error(error);
        this.$message.error('上传失败，请重试')
      } finally {
        this.uploading = false
      }
    },
    clearFile() {
      this.fileList = []
      this.fileInfo = null
    }
  }
}
</script>

<style scoped>
.apk-upload-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.upload-card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.title {
  color: #303133;
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
}

.subtitle {
  color: #909399;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.upload-area {
  margin-bottom: 30px;
}

.file-info {
  margin-bottom: 30px;
}

.file-info h3 {
  color: #606266;
  margin-bottom: 15px;
  font-size: 18px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.el-button {
  min-width: 120px;
}

/deep/ .el-upload-dragger {
  width: 100%;
}

/deep/ .el-descriptions__body {
  background-color: #f8f9fa;
}
</style>
