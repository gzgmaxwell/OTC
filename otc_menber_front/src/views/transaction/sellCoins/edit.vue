<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <ja-button type="primary" v-if="id.trim().length == 0" :click="save">
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
            <el-form-item label="卖家账号" prop="sellerId" >

            <el-select   filterable v-model='formValidate.sellerId' :disabled="id.trim().length != 0"   placeholder='请选择'   @change="changeUser" style="width: 100%;">
                    <el-option v-for='user in users' :key='user.userId' :label='user.phoneNum+"-"+user.fullName' :value='user.userId'    ></el-option>
            </el-select>

            </el-form-item>
          </el-col>	
        </el-row>

       <el-row :gutter="20" type="flex"  v-if="id.trim().length != 0" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="挂单编号" >
              <span  v-html="formValidate.hangingOrderNumber" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
         <el-form-item label="卖家昵称" >
              <span  v-html="formValidate.sellerNickName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
        </el-row>
		

       <el-row :gutter="20" type="flex"  v-if="id.trim().length != 0" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="卖家头像" >
               <img :src="formValidate.sellerHeader" v-if="formValidate.sellerHeader" style="width: 100px; height: 80px">
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
         <el-form-item label="订单状态" >
              <span  v-html="formValidate.orderStatusName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
        </el-row>

       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="金额"  prop="money">
              <el-input v-model="formValidate.money" :disabled="id.trim().length != 0"   style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
         <el-form-item label="余额"  v-if="id.trim().length != 0" >
              <span  v-html="formValidate.balance" :disabled="id.trim().length != 0"   style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
        
             <el-form-item label="是否拆分" prop="cfcf">
                  <el-radio v-model="formValidate.cfcf"  :disabled="id.trim().length != 0"  label="1">可拆分</el-radio>
                  <el-radio v-model="formValidate.cfcf"  :disabled="id.trim().length != 0"  label="2">不可拆分</el-radio>
                </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row  v-if="formValidate.cfcf == 1" :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="最低购买"  prop="zdgm" >
              <el-input v-model="formValidate.zdgm" :disabled="id.trim().length != 0"   style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
      
        </el-row>




      <el-row   :gutter="20" type="flex" class="row-bg" justify="center">
      
          <el-col :span="20" >
            <el-form-item label="收款方式" prop="payTypeArray" >
            <el-select multiple v-model='formValidate.payTypeArray'  :disabled="id.trim().length != 0"   placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in dics.payType' :key='index' :label='item.label' :value='item.value'></el-option>
            </el-select>
            </el-form-item>
          </el-col>	
        </el-row>

      <el-row   :gutter="20" type="flex" class="row-bg" justify="center">
      
          <el-col :span="20" >
            <el-form-item label="收款账户" prop="payAccountIdsArray">
            <el-select multiple v-model='formValidate.payAccountIdsArray'  :disabled="id.trim().length != 0"    placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in payAccountArray'  :key='index' :label="item.label"  :value='item.id' >
                      <!-- <span v-if="item.payType == 1" v-html="item.payTypeName+' '+item.zfbAccount"></span>
                      <span v-if="item.payType == 2" v-html="item.payTypeName+' '+item.wxAccount"></span>
                      <span v-if="item.payType == 3" v-html="item.bankName+' '+item.bankCardNumber"></span> -->
                    </el-option>
            </el-select>
            </el-form-item>
          </el-col>	
        </el-row>
       


      </el-form>
      </div>
  </div>





</template>
<script>
import {SellCoinsInfo ,SellCoinsSave ,SellCoinsUpdate ,PaymentMethodList} from "@a/transaction";

import { UserList} from "@a/system";
export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      users:[],
      params: {},
      formValidate: {
        sellerId: null,		
        money: null,		
        balance: null,		
        cfcf: "1",		
        zdgm: null,		
        payType: null,		
        payTypeArray:[],
        payAccountIdsArray:[],
        orderStatus: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        sellerId: [
          { required: true, message: '请输入卖家id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        balance: [
          { required: true, message: '请输入余额', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        cfcf: [
          { required: true, message: '请输入拆分方式', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        sellerId: [
          { required: true, message: "请选择用户", trigger: "blur" }
		],
        zdgm: [
          { required: true, message: '请输入最低购买', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        
        payTypeArray: [
          { required: true, message: '请选择收款方式', trigger: 'blur' } 
		],

        payAccountIdsArray: [
          { required: true, message: '请选择收款账户', trigger: 'blur' } 
		],
      },
      dialogVisible: false,
      payTypeArray: [],
      payAccountArray: [],
      otherType: ""
    };
  },
  methods: {
    
    changeUser(value) {
      if (value) {
        this.getFkzh({ userId: value });
      }
    },
    async getmembers() {
      
      const  data = await UserList();
  
        this.users = data;
   
    },
      //获取列表详情接口
    async getFkzh(params) {
      
      const  data = await PaymentMethodList(params);
  
        this.payAccountArray = data;
   
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await SellCoinsInfo(id);
  
        this.formValidate = data;
        if(this.formValidate.userId){
              this.getFkzh({ userId: this.formValidate.userId });
        }
   
    },
    //新增保存接口
    async addData() {
        const  data = await SellCoinsSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await SellCoinsUpdate(this.formValidate);
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
        name: "SellCoins"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
   
    if(this.$route.query.id){
      this.id = this.$route.query.id;
    }
    this.getmembers();
    if (this.id) {
      this.getInfo(this.id);
    }
    // this.getFkzh();
  }
};
</script>
