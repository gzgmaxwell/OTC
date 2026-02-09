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
            <el-form-item label="文件路径" prop="file">
              <el-input v-model="formValidate.file" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="文件名称" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="图片日期" prop="pictime">
              <el-input v-model="formValidate.pictime" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="类型" prop="type">
              <el-input v-model="formValidate.type" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="时间字符串" prop="timechar">
              <el-input v-model="formValidate.timechar" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="区域" prop="area">
              <el-input v-model="formValidate.area" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		

       


      </el-form>
      </div>
  </div>





</template>
<script>
import {ZtPictureInfo ,ZtPictureSave ,ZtPictureUpdate} from "@a/zt";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        file: null,		
        name: null,		
        pictime: null,		
        type: null,		
        timechar: null,		
        area: null,		
        createBy: null,		
        createName: null,		
        createTime: null,		
        updateBy: null,		
        updateName: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        file: [
          { required: true, message: '请输入文件路径', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        pictime: [
          { required: true, message: '请输入图片日期', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        timechar: [
          { required: true, message: '请输入时间字符串', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        area: [
          { required: true, message: '请输入区域', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        createName: [
          { required: true, message: '请输入创建人', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        updateName: [
          { required: true, message: '请输入更新人', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await ZtPictureInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await ZtPictureSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await ZtPictureUpdate(this.formValidate);
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
        name: "ZtPicture"
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
