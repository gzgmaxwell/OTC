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
		

       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
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
            <el-form-item label="初始金额" >
              <el-input v-model="formValidate.money"  disabled  style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
         <el-form-item label="余额" >
              <span  v-html="formValidate.balance" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
        
             <el-form-item label="拆分方式" prop="cfcf">
                  <el-radio  disabled  v-model="formValidate.cfcf" label="1">可拆分</el-radio>
                  <el-radio   disabled  v-model="formValidate.cfcf" label="2">不可拆分</el-radio>
                </el-form-item>
          </el-col>	
        </el-row>
		
        <el-row  v-if="formValidate.cfcf == 1" :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="最低购买" >
              <el-input v-model="formValidate.zdgm" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
      
        </el-row>
      <el-row   :gutter="20" type="flex" class="row-bg" justify="center">
      
          <el-col :span="20" >
            <el-form-item label="付款方式" >
            <el-select multiple collapse-tags v-model='formValidate.payTypeArray'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in dics.payType' :key='index' :label='item.label' :value='item.value'></el-option>
            </el-select>
            </el-form-item>
          </el-col>	
        </el-row>

      <el-row   :gutter="20" type="flex" class="row-bg" justify="center">
      
          <el-col :span="20" >
            <el-form-item label="付款账户" >
            <el-select multiple collapse-tags v-model='formValidate.payAccountIdsArray'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in payAccountArray'  :key='index' :label='item.payTypeName'  :value='item.id' >
                      <span v-if="item.payType == 1" v-html="item.payTypeName+' '+item.zfbAccount"></span>
                      <span v-if="item.payType == 2" v-html="item.payTypeName+' '+item.wxAccount"></span>
                      <span v-if="item.payType == 3" v-html="item.bankName+' '+item.bankCardNumber"></span>
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

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        sellerId: null,		
        money: null,		
        balance: null,		
        cfcf: null,		
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
        zdgm: [
          { required: true, message: '请输入最低购买', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        
        orderStatus: [
          { required: true, message: '请输入订单状态', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      payTypeArray: [],
      payAccountArray: [],
      otherType: ""
    };
  },
  methods: {
      //获取列表详情接口
    async getFkzh() {
      
      const  data = await PaymentMethodList();
  
        this.payAccountArray = data;
   
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await SellCoinsInfo(id);
  
        this.formValidate = data;
   
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
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
    this.getFkzh();
  }
};
</script>
