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
            <el-form-item label="名称" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="区域" prop="area">
              <el-input v-model="formValidate.area" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="区域" prop="ground">
              <el-input v-model="formValidate.ground" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="顶部" prop="top">
              <el-input v-model="formValidate.top" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="地步" prop="bottom">
              <el-input v-model="formValidate.bottom" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="左边" prop="left">
              <el-input v-model="formValidate.left" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="右边" prop="right">
              <el-input v-model="formValidate.right" style="width: 100%;"></el-input>
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
import {ZtAreaInfo ,ZtAreaSave ,ZtAreaUpdate} from "@a/zt";

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
        area: null,		
        ground: null,		
        top: null,		
        bottom: null,		
        left: null,		
        right: null,		
        parentId: null,		
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
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        area: [
          { required: true, message: '请输入区域', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        ground: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        top: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        bottom: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        left: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        right: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        parentId: [
          { required: true, message: '请输入', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
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
      
      const  data = await ZtAreaInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await ZtAreaSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await ZtAreaUpdate(this.formValidate);
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
        name: "ZtArea"
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
