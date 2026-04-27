<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <el-button type="primary" @click="pass">通过</el-button>

        <el-button size="mini" type="danger" @click="noPass">不通过</el-button>

        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="操作备注" prop="note1">
              <!-- <el-select disabled v-model="formValidate.payType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="(item, index) in dics.payType" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select> -->
              <el-input v-model="formValidate.note1" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="交易描述" prop="transDes">
              <el-input v-model="formValidate.transDes" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_auditReject, merchant_finishPay, merchant_auditPass } from "@a/merchant";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      formValidate: {
        id: null,
        note1: null,
        transDes: null
      },
      data: [],
      rules: {
        payType: [
          {
            required: true,
            message: "请输入付款类型 1 支付宝 2 微信 3 银行卡",
            trigger: "blur"
          },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    //编辑保存接口
    pass() {
      merchant_auditPass({
        id: this.formValidate.id,
        transDes: this.formValidate.transDes
      }).then(() => {
        this.$message.success("通过成功");
        this.resetForm();
        this.backTo();
      });
    },
    noPass() {
      merchant_auditReject(this.formValidate).then(() => {
        this.$message.success("不通过成功");
        this.resetForm();
        this.backTo();
      });
    },
    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "MerchantWithdrawal"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
    if (this.id) {
      this.formValidate.id = this.id;
    }
  }
};
</script>
