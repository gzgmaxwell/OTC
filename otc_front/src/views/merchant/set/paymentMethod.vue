<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
        <el-table-column prop="payType" label="付款类型">
          <template slot-scope="scope">
            {{ compcChecked(scope.row.payType) }}
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="userName" label="用户账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="withdrawType" label="提现类型">
          <template slot-scope="scope">
            {{ compcChecked111(scope.row.withdrawType) }}
          </template>
        </el-table-column>
        <el-table-column prop="fcbAddress" label="货币地址"></el-table-column>
        <el-table-column prop="idCardName" label="银行卡姓名"></el-table-column>
        <el-table-column prop="bankCaller" label="银行名称"></el-table-column>
        <el-table-column prop="bankCode" label="银行编码"></el-table-column>
        <el-table-column prop="paymentQr" label="收款码图">
          <template slot-scope="scope">
            <img :src="scope.row.paymentQr" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { merchant_payMethod } from "@a/merchant";
import { optWithdrawType, optCominPayType } from "@/utils/enum";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      list: [],
    };
  },
  computed: {
    compcChecked() {
      return (val) => optCominPayType.find(item => item.value === val)?.label;
    },
    compcChecked111() {
      return (val) => optWithdrawType.find(item => item.value === val)?.label;
    }
  },
  methods: {

    //获取列表详情接口
    async getInfo(id) {
      const data = await merchant_payMethod(id);
      this.list = data || [];
      console.log(222, this.list);
    },
    //返回
    backTo() {
      this.$router.push({
        name: "MerchantSet"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.userId;
    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>
