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
            <el-form-item label="设备型号" prop="deviceModel">
              <el-input v-model="formValidate.deviceModel" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="用户id" prop="userId">
              <el-input v-model="formValidate.userId" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {LoginDeviceInfo ,LoginDeviceSave ,LoginDeviceUpdate} from "@a/system";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        deviceModel: null,		
        userId: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        deviceModel: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
		],
        userId: [
          { required: true, message: '请输入用户id', trigger: 'blur' }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await LoginDeviceInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await LoginDeviceSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await LoginDeviceUpdate(this.formValidate);
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
        name: "LoginDevice"
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
