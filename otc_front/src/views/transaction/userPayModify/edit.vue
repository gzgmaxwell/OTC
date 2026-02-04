<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
 
        <!-- <el-button type="primary"   @click="save()">保存</el-button> -->

        <el-button type="primary"   @click="rztg('1')">通过</el-button>
        
           <el-button size="mini" type="danger" @click="rztg('2')" >不通过</el-button >


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
            <el-form-item label="支付密码" prop="payPassword">
              <el-input v-model="formValidate.payPassword"  disabled  style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formValidate.phone"  disabled  style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


		    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="身份认证信息上传" prop="idAuthInfo">
               <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.idAuthInfo" :src="formValidate.idAuthInfo" class="avatar">
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
import {UserPayModifyInfo ,UserPayModifySave ,UserPayModifyUpdate} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        payPassword: null,		
        phone: null,		
        code: 456123,		
        idAuthInfo: null,		
        authStatus: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        payPassword: [
          { required: true, message: '请输入支付密码', trigger: 'blur' } 
		],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
		],
        idAuthInfo: [
          { required: true, message: '请输入身份认证信息上传', trigger: 'blur' } 
		],
        

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
      handleIconSuccess(res, file) {
        this.formValidate.idAuthInfo = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await UserPayModifyInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
      var param =  Object.assign({}, this.formValidate);
      param.payPassword=jm(param.payPassword);
        const  data = await UserPayModifySave(param);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async rztg(authStatus) {
      var param =  Object.assign({}, this.formValidate);
      param.authStatus=authStatus;
        const  data = await UserPayModifyUpdate(param);
        this.$message.success("提交成功");
        this.resetForm();
        this.backTo();
    },
    //保存
    save(authStatus) {
      return this.$refs["formValidate"].validate().then(() => {
        return this.addData(authStatus);
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "UserPayModify"
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