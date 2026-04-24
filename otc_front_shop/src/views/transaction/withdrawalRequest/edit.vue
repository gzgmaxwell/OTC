<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        提现审核
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-form-item label="账户余额：">
          <span>{{ banlence }}</span>
        </el-form-item>
        <el-form-item label="账户" prop="accountAddress">
          <el-input v-model="formValidate.accountAddress"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="formValidate.money" @change="changeMoney"></el-input>
        </el-form-item>
        <el-form-item label="提现类型" prop="type">
          <el-select v-model="formValidate.type" placeholder="提现类型" style="width: 100%;" @change="changeType">
            <el-option v-for="(item, index) in optWithdrawType" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手续费" prop="exchangeRate">
          <el-input v-model="formValidate.exchangeRate" disabled></el-input>
        </el-form-item>
        <el-form-item label="货币数量" prop="quantity">
          <el-input v-model="formValidate.quantity" disabled></el-input>
        </el-form-item>
        <el-form-item label="币种名称" prop="cashName">
          <el-input v-model="formValidate.cashName"></el-input>
        </el-form-item>
        <el-form-item label="交易描述" prop="transDes">
          <el-input v-model="formValidate.transDes"></el-input>
        </el-form-item>
        <el-form-item label="提现账号" prop="account">
          <el-input v-model="formValidate.account"></el-input>
        </el-form-item>
        <el-form-item label="提现信息" prop="info">
          <el-input v-model="formValidate.info"></el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import { withdrawOrder_createWithdraw, config_queryCode, queryUserBalance } from "@a/transaction";
import { optOrderModel, optOrderStatus, enum_orderStatus, optWithdrawType, enum_withdrawType } from "@/utils/enum";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      banlence: 0,
      optWithdrawType,
      disabled: false,
      formValidate: {
        accountAddress: undefined,
        money: undefined,
        cashName: undefined,
        type: undefined,
        transDes: undefined,
        account: undefined,
        info: undefined,
        quantity: undefined,
        exchangeRate: 0
      },
      rules: {
        accountAddress: [{ required: true, message: "请输入账户", trigger: "change" }],
        money: [{ required: true, message: "请输入金额", trigger: "change" }],
        cashName: [{ required: true, message: "请输入火币名称", trigger: "change" }],
        type: [{ required: true, message: "请输入提现类型", trigger: "change" }],
        transDes: [{ required: true, message: "请输入交易描述", trigger: "change" }],
        account: [{ required: true, message: "请输入提现账号", trigger: "change" }],
        info: [{ required: true, message: "请输入提现信息", trigger: "change" }],
        quantity: [{ required: true, message: "请输入货币数量", trigger: "change" }],
        exchangeRate: [{ required: true, message: "请输入汇率", trigger: "change" }]
      },
    };
  },
  methods: {
    changeMoney(val) {
      this.formValidate.quantity = val;
      // if (enum_withdrawType.usdt === this.formValidate.type && this.formValidate.exchangeRate) {
      //   this.formValidate.quantity = Number(this.formValidate.money) / Number(this.formValidate.exchangeRate);
      // }
    },
    changeType(value) {
      // this.formValidate.type = value;
      // if (enum_withdrawType.usdt === value) {
      //   this.disabled = true;
      //   const userName = JSON.parse(localStorage.getItem("UserInfo")).userName
      //   config_queryCode({
      //     codeName: "exchange_rate",
      //     userName: userName
      //   }).then(res => {
      //     const exchangeRate = res.value1;
      //     this.formValidate.exchangeRate = exchangeRate;
      //     if (this.formValidate.money) {
      //       this.formValidate.quantity = Number(this.formValidate.money) / Number(this.formValidate.exchangeRate);
      //     }
      //   });
      // } else {
      //   this.formValidate.exchangeRate = 0;
      //   this.formValidate.quantity = undefined;
      //   this.disabled = false;
      // }
    },
    //获取列表详情接口
    getInfo() {
      this.formValidate = this.$route.query;
    },

    //编辑保存接口
    async editData() {
      await withdrawOrder_createWithdraw(this.formValidate);
      this.$message.success("保存成功");
      this.resetForm();
      this.backTo();
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.editData()
      });
    },

    //重置
    resetForm() {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "WithdrawalRequest"
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id);
    }
    queryUserBalance({ userId: JSON.parse(localStorage.getItem("UserInfo")).userId }).then(res => {
      this.banlence = res;
    });
  }
};
</script>
