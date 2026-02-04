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
          <el-col :span="20" >

                <el-form-item label="账号：" prop="userName">
                  <el-input v-model="formValidate.userName"></el-input>
                </el-form-item>
            </el-col>	
          </el-row>

     

                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >

              <el-form-item label="专家头像" >
                   <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.headerUrl" :src="formValidate.headerUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


            </el-form-item>
          </el-col>	
          <el-col :span="10" >
          </el-col>	
        </el-row>


        
		

		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="专家名称" prop="fullName">
              <el-input v-model="formValidate.fullName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="联系方式" >
              <el-input v-model="formValidate.contact" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		

		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="专家类型" prop="lxs">
              
            <el-select v-model="formValidate.lxs" multiple placeholder="请选择类型">
              <el-option
                v-for="item in dics.pzlx"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

          
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="所在单位" prop="dw">
              <el-input v-model="formValidate.dw" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >

               <el-form-item label="擅长品种：" prop="breeds" >
                <SelectTree
                  :checkedKeys.sync="formValidate.breeds"
                  :checkStrictly="false"
                  multiple
                  :defaultProps="defaultProps"
                  :nodeKey="'id'"
                  :data="breeds"
                  :width="100"
                />
              </el-form-item>

          </el-col>	
        </el-row>
		

		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item label="擅长领域" prop="sclyms">
             <el-input type="textarea" :rows="7"  v-model="formValidate.sclyms"></el-input>

            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="专家简介" prop="intro">

              <editor ref="ntiContent" style="width:100%" @change="catchData" />
            </el-form-item>
          </el-col>	
        </el-row>

       


      </el-form>
      </div>
  </div>





</template>
<script>
import {UserZjInfo ,UserZjSave ,UserZjUpdate,BreedCascaderAll} from "@a/system";
import editor from "@/components/editor/index.vue";
import SelectTree from "@/components/tree/SelectTree.vue";

export default {
  name: "Edit",
  components: {editor,SelectTree},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      breeds:[],
      defaultProps: {
        children: "children",
        label: "label",
        value: "id"
      },
      formValidate: {
        lxs: [],		
        userName: null,		
        fullName: null,		
        headerUrl: null,		
        dw: null,		
        breeds:[],
        lxfs: null,		
        contact: null,		
        intro: null,		
        sclyms: null,		
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
        lxs: [
          { required: true, message: '请选择专家类型', trigger: 'blur' } ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        fullName: [
          { required: true, message: '请输入专家名称', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        headerUrl: [
          { required: true, message: '请输入专家头像', trigger: 'blur' } , {  max: 250, message: '长度最多为250', trigger: "blur" }
		],
        dw: [
          { required: true, message: '请输入单位', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        lxfs: [
          { required: true, message: '请输入生产模式', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        contact: [
          { required: true, message: '请输入联系方式', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        intro: [
          { required: true, message: '请输入专家简介', trigger: 'blur' } , {  max: 2000, message: '长度最多为2000', trigger: "blur" }
		],
        sclyms: [
          { required: true, message: '请输入擅长领域', trigger: 'blur' } , {  max: 250, message: '长度最多为250', trigger: "blur" }
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
  async  lxChange(){

      const  data = await BreedCascaderAll();
      this.formValidate.breeds=[];
      this.breeds=data;
    },
    //新增保存接口
    async getBreeds(params) {
        const  data = await BreedCascaderAll();
        this.breeds=data;
    },
    catchData(content) {
      this.formValidate.intro = content;
    },
      handleIconSuccess(res, file) {
        this.formValidate.headerUrl = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await UserZjInfo(id);
  
        this.formValidate = data;
        if (data.intro) {
          this.$refs.ntiContent.setHtml(data.intro);
        }
   
    },
    //新增保存接口
    async addData() {
        const  data = await UserZjSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await UserZjUpdate(this.formValidate);
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
        name: "UserZj"
      });
    }
  },
 async mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    await this.getBreeds();
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