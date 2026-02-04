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
            <el-form-item label="公司" prop="qymc">
              <el-input v-model="formValidate.qymc" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="船名" prop="cm">
              <el-input v-model="formValidate.cm" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="mmsi" prop="mmsi">
              <el-input v-model="formValidate.mmsi" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="呼号" prop="hh">
              <el-input v-model="formValidate.hh" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="总吨" prop="zd">
              <el-input v-model="formValidate.zd" style="width: 100%;"></el-input>
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
import {DataYcInfo ,DataYcSave ,DataYcUpdate} from "@a/data";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        qymc: null,		
        cm: null,		
        mmsi: null,		
        hh: null,		
        zd: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        qymc: [
          { required: true, message: '请输入公司', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        cm: [
          { required: true, message: '请输入船名', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        mmsi: [
          { required: true, message: '请输入mmsi', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        hh: [
          { required: true, message: '请输入呼号', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        zd: [
          { required: true, message: '请输入总吨', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await DataYcInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await DataYcSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await DataYcUpdate(this.formValidate);
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
        name: "DataYc"
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
