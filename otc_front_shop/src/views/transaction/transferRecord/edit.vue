<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <!-- <ja-button type="primary" :click="save">
          保存
        </ja-button> -->
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
            <el-form-item label="钱包地址" prop="address"  disabled >
              <el-input v-model="formValidate.address" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    
          <el-col :span="10" >
            <el-form-item label="金额" prop="money"  disabled >
              <el-input v-model="formValidate.money" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
		


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {TransferRecordInfo ,TransferRecordSave ,TransferRecordUpdate} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        fromId: null,		
        address: null,		
        purposeId: null,		
        money: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        fromId: [
          { required: true, message: '请输入发起人', trigger: 'blur' }
		],
        address: [
          { required: true, message: '请输入钱包地址', trigger: 'blur' }
		],
        purposeId: [
          { required: true, message: '请输入接收人', trigger: 'blur' }
		],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await TransferRecordInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await TransferRecordSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await TransferRecordUpdate(this.formValidate);
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
        name: "TransferRecord"
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
