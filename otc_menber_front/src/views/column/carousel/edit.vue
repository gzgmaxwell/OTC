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
          <el-col :span="20" >
            <el-form-item label="图片" prop="pic">
               <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.pic" :src="formValidate.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


            </el-form-item>
          </el-col>	
        </el-row>
		
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
         
            <el-form-item label="链接" prop="link">
              <el-input v-model="formValidate.link" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="排序" prop="orderNumber">
              <el-input v-model="formValidate.orderNumber" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {CarouselInfo ,CarouselSave ,CarouselUpdate} from "@a/column";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        pic: null,		
        link: null,		
        orderNumber: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        pic: [
          { required: true, message: '请输入图片', trigger: 'blur' } 
		],
        link: [
          { required: true, message: '请输入连接', trigger: 'blur' } 
		],
        orderNumber: [
          { required: true, message: '请输入排序', trigger: 'blur' } 
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
      handleIconSuccess(res, file) {
        this.formValidate.pic = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await CarouselInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await CarouselSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await CarouselUpdate(this.formValidate);
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
        name: "Carousel"
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