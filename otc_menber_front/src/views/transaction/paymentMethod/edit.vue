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
        <!-- <el-button type="primary"   @click="rztg('2')">通过</el-button>
        
           <el-button size="mini" type="danger" @click="rztg('3')" >不通过</el-button > -->

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
            <el-form-item label="选择用户" prop="userId" label-width="220px">

            <el-select filterable v-model='formValidate.userId'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='user in users' :key='user.userId' :label='user.phoneNum+"-"+user.fullName' :value='user.userId'></el-option>
            </el-select>

            </el-form-item>
          </el-col>	
        </el-row>


         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="类型" prop="payType" label-width="220px">

            <el-select  v-model='formValidate.payType'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in dics.payType' :key='index' :label='item.label' :value='item.value'></el-option>
            </el-select>

            </el-form-item>
          </el-col>	

        </el-row>


        
         <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item  label-width="220px" label="姓名" prop="name">
              <el-input v-model="formValidate.name"       style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


		
        <el-row v-if="formValidate.payType == 1" :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label-width="220px" label="支付宝账户" prop="zfbAccount">
              <el-input v-model="formValidate.zfbAccount"       style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	

        </el-row>
		
		
        <el-row v-if="formValidate.payType == 1" :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item label-width="220px" label="支付宝二维码" prop="zfbEwm">
              <!-- <img :src="formValidate.zfbEwm" v-if="formValidate.zfbEwm" style="width: 100px; height: 80px"> -->

              
          <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleSuccess1">
                <img v-if="formValidate.zfbEwm" :src="formValidate.zfbEwm" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>



            </el-form-item>
          </el-col>	
        </el-row>
        <el-row v-if="formValidate.payType == 2" :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label-width="220px" label="微信账号" prop="wxAccount">
              <el-input v-model="formValidate.wxAccount"       style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
      
        </el-row>


           <el-row v-if="formValidate.payType == 2" :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item label-width="220px" label="微信二维码" prop="wxEwm">
              <!-- <img :src="formValidate.wxEwm" v-if="formValidate.wxEwm" style="width: 100px; height: 80px"> -->

                            
          <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleSuccess2">
                <img v-if="formValidate.wxEwm" :src="formValidate.wxEwm" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>



            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row v-if="formValidate.payType == 3" :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label-width="220px" label="银行名称" prop="bankName">
              <el-input v-model="formValidate.bankName"       style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
   
        </el-row>
		

        <el-row v-if="formValidate.payType == 3" :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item label-width="220px" label="银行卡号" prop="bankCardNumber">
              <el-input v-model="formValidate.bankCardNumber"       style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {PaymentMethodInfo ,PaymentMethodSave ,PaymentMethodUpdate} from "@a/transaction";

import { UserList} from "@a/system";
export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      users:[],
      formValidate: {
        payType: "1",		
        name: null,		
        zfbAccount: null,		
        zfbEwm: null,		
        wxAccount: null,		
        wxEwm: null,		
        bankName: null,		
        bankCardNumber: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        userId: [
          { required: true, message: '请选择用户', trigger: 'blur' }
		],
        wxAccount: [
          { required: true, message: '请输入微信账户', trigger: 'blur' }
		],
        wxEwm: [
          { required: true, message: '请上传微信二维码', trigger: 'blur' }
		],
        zfbAccount: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' }
		],
        zfbEwm: [
          { required: true, message: '请上传支付宝二维码', trigger: 'blur' }
		],
        bankName: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
		],
        bankCardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
		],
        payType: [
          { required: true, message: '请输入付款类型 1 支付宝 2 微信 3 银行卡', trigger: 'blur' }
		],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		]

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {   
    
    
      handleSuccess1(res, file) {
        this.formValidate.zfbEwm = res.url;
      },

      handleSuccess2(res, file) {
        this.formValidate.wxEwm = res.url;
      },

    //编辑保存接口
    async rztg(authStatus) {
      var param =  Object.assign({}, this.formValidate);
      param.authStatus=authStatus;
        const  data = await PaymentMethodUpdate(param);
        this.$message.success("提交成功");
        this.resetForm();
        this.backTo();
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await PaymentMethodInfo(id);
  
        this.formValidate = data;
   
    },
    async getmembers() {
      
      const  data = await UserList();
  
        this.users = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await PaymentMethodSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await PaymentMethodUpdate(this.formValidate);
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
        name: "PaymentMethod"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
    this.getmembers();
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