<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <!-- <ja-button type="primary" :click="save">
          保存
        </ja-button> -->
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
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formValidate.name" disabled style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="formValidate.idNumber"  disabled style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="身份证正面" prop="sfzZm">

              <img :src="formValidate.sfzZm" v-if="formValidate.sfzZm" style="width: 100px; height: 80px">
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="身份证反面" prop="sfzFm">
              <img :src="formValidate.sfzFm" v-if="formValidate.sfzFm" style="width: 100px; height: 80px">
            </el-form-item>
          </el-col>	
        </el-row>
		
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="实名认证级别">
              <span v-html="formValidate.levelName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            
          </el-col>	
        </el-row>

       


      </el-form>
      </div>
  </div>





</template>
<script>
import {UserRealAuthInfo ,UserRealAuthSave ,UserRealAuthUpdate} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        name: null,		
        idNumber: null,		
        sfzZm: null,		
        sfzFm: null,		
        level: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        sfzZm: [
          { required: true, message: '请输入身份证正面', trigger: 'blur' } , {  max: 250, message: '长度最多为250', trigger: "blur" }
		],
        sfzFm: [
          { required: true, message: '请输入身份证反面', trigger: 'blur' } , {  max: 250, message: '长度最多为250', trigger: "blur" }
		],
        level: [
          { required: true, message: '请输入实名认证级别1初级2高级', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await UserRealAuthInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await UserRealAuthSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await UserRealAuthUpdate(this.formValidate);
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
        name: "UserRealAuth"
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
