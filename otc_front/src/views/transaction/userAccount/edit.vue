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




            <el-form-item label="余额" prop="money">
              <el-input v-model="formValidate.money" ></el-input>
            </el-form-item>
     
            <el-form-item label="钱包地址"  prop="walletAddress">
              <el-input  disabled  v-model="formValidate.walletAddress" ></el-input>
            </el-form-item>
		


         <el-form-item label="账号：" prop="userName">
          <el-input v-model="formValidate.userName" disabled></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="phoneNum">
          <el-input v-model="formValidate.phoneNum" disabled ></el-input>
        </el-form-item>

       <el-form-item label="邮箱地址：" prop="emailAddress">
          <el-input v-model="formValidate.emailAddress" disabled ></el-input>
        </el-form-item>


      </el-form>
      </div>
  </div>





</template>
<script>
import {UserAccountInfo ,UserAccountSave ,UserAccountUpdate} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        money: null,		
        walletAddress: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        money: [
          { required: true, message: '请输入余额', trigger: 'blur' }
		],
        walletAddress: [
          { required: true, message: '请输入钱包地址', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await UserAccountInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await UserAccountSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await UserAccountUpdate(this.formValidate);
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
        name: "UserAccount"
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
