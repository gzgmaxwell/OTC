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
            <el-form-item label="购买金额" prop="money">
              <el-input v-model="formValidate.money" disabled  style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        <el-col :span="10" >
            <el-form-item label="卖家订单" prop="orgOrderId">

                <el-select disabled   collapse-tags v-model='formValidate.orgOrderId'  placeholder='请选择' style="width: 100%;">
                    <el-option v-for='(item, index) in sellOrders'  :key='index' :label='item.cfcfName+"   "+item.balance'  :value='item.id' >
                    </el-option>
                </el-select>


            </el-form-item>
          </el-col>	
        </el-row>


        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
         <el-form-item label="买家昵称" >
              <span  v-html="formValidate.buyerNickName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>	
          <el-col :span="10" >
            <el-form-item label="买家头像" >
                   <img :src="formValidate.buyerHeader" v-if="formValidate.buyerHeader" style="width: 100px; height: 80px">
            </el-form-item>
          </el-col>	
        </el-row>

		
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
		
        


       


      </el-form>
      </div>
  </div>





</template>
<script>
import {BuyCoinsInfo ,BuyCoinsSave ,BuyCoinsUpdate,SellCoinsList} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        buyerId: null,		
        money: null,		
        sellerId: null,		
        orgOrderId: null,		
        orderStatus: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        buyerId: [
          { required: true, message: '请输入买家id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        money: [
          { required: true, message: '请输入购买金额', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        sellerId: [
          { required: true, message: '请输入卖家id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        orgOrderId: [
          { required: true, message: '请输入卖家订单id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        orderStatus: [
          { required: true, message: '请输入订单状态', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: "",
      sellOrders:[]
    };
  },
  methods: {
   async getSellOrders() {
      
      const  data = await SellCoinsList();
      this.sellOrders = data;
   
    },
    
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await BuyCoinsInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await BuyCoinsSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await BuyCoinsUpdate(this.formValidate);
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
        name: "BuyCoins"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
    this.getSellOrders();
  }
};
</script>
