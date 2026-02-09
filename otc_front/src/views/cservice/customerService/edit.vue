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
          <el-col :span="20" >
            <el-form-item label="昵称" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
   
        </el-row>
		

         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
   
          <el-col :span="20" >
             <el-form-item label="用户" prop="userId" >

              <el-select  v-model='formValidate.userId' filterable   placeholder='请选择'   style="width: 100%;">
                      <el-option v-for='user in users' :key='user.userId' :label='user.phoneNum+"-"+user.fullName' :value='user.userId'    ></el-option>
              </el-select>

            </el-form-item>
          </el-col>	
        </el-row>

       
         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
   
          <el-col :span="20" >
        <el-form-item label="头像：" prop="header">

          <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.header" :src="formValidate.header" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


        </el-form-item> 
          </el-col>	
        </el-row>





      </el-form>
      </div>
  </div>





</template>
<script>
import {CustomerServiceInfo ,CustomerServiceSave ,CustomerServiceUpdate} from "@a/cservice";

import { QuerySelect} from "@a/system";
export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      users:[],
      params: {},
      formValidate: {
        name: null,		
        userId: null,		
        header: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        userId: [
          { required: true, message: '请输入用户id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        header: [
          { required: true, message: '请上传头像', trigger: 'blur' }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
      handleIconSuccess(res, file) {
        this.formValidate.header = res.url;
      },
    async getUsers() {
      
      const  data = await QuerySelect();
  
        this.users = data;
   
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await CustomerServiceInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await CustomerServiceSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await CustomerServiceUpdate(this.formValidate);
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
        name: "CustomerService"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
    this.getUsers();
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