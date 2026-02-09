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
            <el-form-item label="下载地址" prop="url">
              <el-input v-model="formValidate.url" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="日期" prop="date">
              <el-date-picker
                type="date"
                v-model="formValidate.date"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="类型" prop="lx">
              <el-input v-model="formValidate.lx" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {DownloadRecordInfo ,DownloadRecordSave ,DownloadRecordUpdate} from "@a/data";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        url: null,		
        date: null,		
        lx: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        url: [
          { required: true, message: '请输入下载地址', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        date: [
          { required: true, message: '请输入日期', trigger: 'blur' }
		],
        lx: [
          { required: true, message: '请输入类型', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await DownloadRecordInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await DownloadRecordSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await DownloadRecordUpdate(this.formValidate);
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
        name: "DownloadRecord"
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
