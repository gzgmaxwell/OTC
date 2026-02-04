<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        查看信息
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
            <el-form-item label="缩写" prop="abs">
              <el-input v-model="formValidate.abs" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="单位" prop="unit">
              <el-input v-model="formValidate.unit" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
          
            <el-form-item label="上一级" prop="parentId">
              <el-input v-model="formValidate.parentId" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
     


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {ZtTypeInfo ,ZtTypeSave ,ZtTypeUpdate} from "@a/zt";

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
        abs: null,		
        unit: null,		
        res: null,		
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
        abs: [
          { required: true, message: '请输入缩写', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        unit: [
          { required: true, message: '请输入单位', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        res: [
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
      
      const  data = await ZtTypeInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await ZtTypeSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await ZtTypeUpdate(this.formValidate);
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
        name: "ZtType"
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
