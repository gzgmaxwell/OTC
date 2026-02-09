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
        <el-button @click="backTo('formValidate')">返回</el-button>
      </div>
       </div>
      <div class="edit_content">
      <el-form
        class="u_form"
        :model="formValidate"
        :rules="rules"
        ref="formValidate"
        label-width="130px"
      >
     

 <el-row :gutter="20" type="flex" class="row-bg" justify="left">

          <el-col :span="8" :offset="2">
            <el-form-item label="登录账号" prop="userName">
              <el-input v-model="formValidate.userName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="8" :offset="2">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="formValidate.companyName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="left">
          <el-col :span="8" :offset="2">
            <el-form-item label="统一信用代码" prop="uniformCreditCode">
              <el-input v-model="formValidate.uniformCreditCode" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="8" :offset="2">
            <el-form-item label="负责人联系方式" prop="contactPersonMobile">
              <el-input v-model="formValidate.contactPersonMobile" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="left">
          <el-col :span="18" :offset="2">

            <el-form-item label="位置" >
                <el-cascader style="width: 100%;"
                      v-model="orgValue"
                      :options="orgs"
                      @change="handleChange"></el-cascader>
                </el-form-item>
            
          </el-col>	
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="left">
              <el-col :span="18" :offset="2">
                <el-form-item label="详细地址" prop="address">
              <el-input v-model="formValidate.address" style="width: 100%;"></el-input>
            </el-form-item>
              </el-col>	

            </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="left">
          <el-col :span="8" :offset="2">
            <el-form-item label="营业执照" prop="businessLicense">
              <!-- <el-input v-model="formValidate.businessLicense" style="width: 100%;"></el-input> -->

              <el-upload
              class="avatar-uploader"
              :action="upload_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formValidate.businessLicense" :src="formValidate.businessLicense" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>	
          <el-col :span="8" :offset="2">
          </el-col>	
        </el-row>
  
      

    


      </el-form>
      </div>
  </div>


</template>
<script>
import { userEntInfo ,userEntSave ,userEntUpdate,orgCascade } from "@a/system";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      orgValue: [],
      orgs:[],
      formValidate: {
        userId: null,		
        companyName: null,		
        uniformCreditCode: null,		
        address: null,		
        contactPersonMobile: null,		
        businessLicense: null,		
        province: null,		
        city: null,		
        county: null,		
      },
      data: [],
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
		],
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
		],
        uniformCreditCode: [
          { required: true, message: '请输入统一信用代码', trigger: 'blur' }
		],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
		],
        contactPersonMobile: [
          { required: true, message: '请输入负责人联系方式', trigger: 'blur' }
		],
        businessLicense: [
          { required: true, message: '请输入营业执照地址', trigger: 'blur' }
		],
       

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.formValidate.businessLicense = res.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //获取地区信息
    async getAreaCascade() {
      const data  = await orgCascade();
      this.orgs=data;
     
    },
    handleChange(value) {
        this.formValidate.province=value[0];
        this.formValidate.city=value[1];
        this.formValidate.county=value[2];
      },
    //获取列表详情接口
    async getInfo(id) {
       const data  = await userEntInfo(id);
        this.formValidate = data;
        if(data.province && data.city && data.county){
          var values=[];
          values.push(data.province)
          values.push(data.city)
          values.push(data.county)
          this.orgValue=values;
        }
    },
    //新增保存接口
    async addData() {
       await userEntSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
    },
    //编辑保存接口
    async editData() {
      await userEntUpdate(this.formValidate);
        this.$message.success("修改成功");
        this.resetForm();
        this.backTo();
    },
    save() {
      this.$refs["formValidate"].validate().then(() => {
         this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "SH"
      });
    }
  },
 async mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
     await this.getAreaCascade();

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