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
            <el-form-item label="客服聊天" prop="customerServiceId">

                 <el-select  v-model='formValidate.customerServiceId'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in csList'  :key='index' :label='item.name'  :value='item.id' >
                    </el-option>
                </el-select>


            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="内容" prop="content">
              <el-input v-model="formValidate.content" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
 


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {ChatHistoryInfo ,ChatHistorySave ,ChatHistoryUpdate,CustomerServiceList} from "@a/cservice";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        customerServiceId: null,		
        content: null,		
        sender: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        customerServiceId: [
          { required: true, message: '请输入客服聊天', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        sender: [
          { required: true, message: '请输入发送人', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      csList:[],
      otherType: ""
    };
  },
  methods: {
    
    //获取列表详情接口
    async getcsAll() {
      
      const  data = await CustomerServiceList();
  
        this.csList = data;
   
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await ChatHistoryInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await ChatHistorySave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await ChatHistoryUpdate(this.formValidate);
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
        name: "ChatHistory"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
    this.getcsAll();
  }
};
</script>
