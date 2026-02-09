<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑信息" : "新增信息" }}
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo()">返回</el-button>
      </div>
       </div>
      <div class="edit_content">
      <el-form
        class="u_form"
        :model="formValidate"
        :rules="rules"
        ref="formValidate"
        label-width="100px"
      >
     

       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
                <el-form-item label="强制更新：" prop="qzgx">
                    <el-select
                    style="width: 100%;"
                      v-model="formValidate.qzgx"
                      placeholder="请选择类型"
                    >
                      <el-option
                        v-for="item in dics.qzgx"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
              </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="标题" prop="title">
              <el-input v-model="formValidate.title" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>





        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="版本号" prop="version">
              <el-input v-model="formValidate.version" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
     
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
  
          <el-col :span="20" >
            <el-form-item label="下载链接" prop="apkLink">
              <el-input v-model="formValidate.apkLink" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		


        <el-row v-if="formValidate.id == 2" :gutter="20" type="flex" class="row-bg" justify="center" >

            <el-col :span="20" >
              <el-form-item label="apk：" prop="apk">
                      <!-- <el-upload
                            :action="upload_url+'?index=1'"
                            :limit="1"         
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :on-success="handleSuccess"
                            :file-list="fileList"> -->
                            <el-button size="small" type="primary"  @click="openPage()">点击上传</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传单个文件</div> -->
                          <!-- </el-upload> -->

            </el-form-item>
                </el-col>


        </el-row> 

       


      </el-form>
      </div>
  </div>





</template>
<script>
import {SysVersionInfo ,SysVersionSave ,SysVersionUpdate} from "@a/system";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
       fileList: [] , // 存储已上传文件列表
      params: {},
      formValidate: {
        version: null,		
        apkLink: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
		],
        apkLink: [
          { required: true, message: '请输入下载', trigger: 'blur' }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    openPage(){
      window.open("http://18.221.156.131:26456/upload.html", "_blank");

    },
     // 文件超出数量限制时的回调
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
    },
    
    // 上传前的校验（可选）
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 200MB!');
      }
      return isLt2M;
    },
    
    // 上传成功回调
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.$message.success('上传成功');
      console.log('服务器返回:', response);
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await SysVersionInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await SysVersionSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await SysVersionUpdate(this.formValidate);
        this.$message.success("修改成功");
        this.resetForm();
        this.backTo();
    },
    //保存
    save(formName) {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "SysVersion"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>