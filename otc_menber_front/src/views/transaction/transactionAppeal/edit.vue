<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        查看信息
      </div>
      <div>
<!-- 
                <el-button type="primary"   @click="sssh('2')">已解决</el-button>
        
           <el-button size="mini" type="danger" @click="sssh('3')" >未解决</el-button > -->


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
            <el-form-item label="内容" prop="centent">
              <el-input v-model="formValidate.centent"  disabled   style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="类型" prop="appealType">

               <el-select
                disabled  
                  v-model="formValidate.appealType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in dics.appealType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>


            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="图片" prop="pic">


          <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleSuccess">
                <img v-if="formValidate.pic" :src="formValidate.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>





            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="订单编号" prop="orderNumber">
              <el-input v-model="formValidate.orderNumber"  disabled   style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		



       


      </el-form>
      </div>
  </div>





</template>
<script>
import {TransactionAppealInfo ,TransactionAppealSave ,TransactionAppealUpdate} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        centent: null,		
        appealType: null,		
        pic: null,		
        orderNumber: null,		
        userId: null,		
        createBy: null,		
        createTime: null,		
        isDelete: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        centent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
		],
        appealType: [
          { required: true, message: '请输入类型', trigger: 'blur' }
		],
        pic: [
          { required: true, message: '请输入图片', trigger: 'blur' }
		],
        orderNumber: [
          { required: true, message: '请输入订单编号', trigger: 'blur' }
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
      handleSuccess(res, file) {
        this.formValidate.pic = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await TransactionAppealInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await TransactionAppealSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async sssh(appealStatus) {
      var param =  Object.assign({}, this.formValidate);
      param.appealStatus=appealStatus;
        const  data = await TransactionAppealUpdate(param);
        this.$message.success("提交成功");
        this.resetForm();
        this.backTo();
    },
    //编辑保存接口
    async editData() {
        const  data = await TransactionAppealUpdate(this.formValidate);
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
        name: "TransactionAppeal"
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