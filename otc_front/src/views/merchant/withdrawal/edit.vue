<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <el-button type="primary" @click="rztg('2')">通过</el-button>

        <el-button size="mini" type="danger" @click="rztg('3')">不通过</el-button>

        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="付款类型" prop="payType">
              <el-select disabled v-model="formValidate.payType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="(item, index) in dics.payType" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formValidate.name" disabled style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  PaymentMethodInfo,
  PaymentMethodSave,
  PaymentMethodUpdate
} from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      params: {},
      formValidate: {
        payType: null,
        name: null,
        zfbAccount: null,
        zfbEwm: null,
        wxAccount: null,
        wxEwm: null,
        bankName: null,
        bankCardNumber: null,
        createBy: null,
        createTime: null,
        isDelete: null,
        updateBy: null,
        updateTime: null
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
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //编辑保存接口
    async rztg(authStatus) {
      var param = Object.assign({}, this.formValidate);
      param.authStatus = authStatus;
      const data = await PaymentMethodUpdate(param);
      this.$message.success("提交成功");
      this.resetForm();
      this.backTo();
    },
    //获取列表详情接口
    async getInfo(id) {
      const data = await PaymentMethodInfo(id);
      this.formValidate = data;
    },
    //新增保存接口
    async addData() {
      const data = await PaymentMethodSave(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      const data = await PaymentMethodUpdate(this.formValidate);
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
        name: "MerchantWithdrawal"
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
