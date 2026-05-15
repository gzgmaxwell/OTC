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
        <el-button type="primary" @click="openBlackDialog">加入黑名单</el-button>
        <el-button type="danger" @click="closeBuyOrder">关闭</el-button>
        <el-button type="primary" v-if="canRelease" @click="releaseBuyOrder">放行</el-button>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="购买金额" prop="money">
              <span v-html="formValidate?.buyCoins?.money" style="width: 100%;"></span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="卖家订单" prop="orgOrderId">
              <el-select disabled collapse-tags v-model="formValidate.buyCoins.orgOrderId" placeholder="请选择"
                style="width: 100%;">
                <el-option v-for="(item, index) in sellOrders" :key="index"
                  :label="item.cfcfName + '   ' + item.balance" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="买家昵称">
              <span v-html="formValidate.buyCoins.buyerNickName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="买家头像">
              <img :src="formValidate.buyCoins.buyerHeader" v-if="formValidate.buyerHeader"
                style="width: 100px; height: 80px" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="挂单编号">
              <span v-html="formValidate.buyCoins.hangingOrderNumber" style="width: 100%;"></span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="卖家昵称">
              <span v-html="formValidate.buyCoins.sellerNickName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="卖家头像">
              <img :src="formValidate.buyCoins.sellerHeader" v-if="formValidate.buyCoins.sellerHeader"
                style="width: 100px; height: 80px" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="订单状态">
              <span v-html="formValidate?.buyCoins?.orderStatusName" style="width: 100%;"></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="买家付款凭证">
              <el-image v-for="item, index in compcStr2Arr(formValidate.buyCoins.voucherBuyPayedUrl)" :key="index"
                :src="item" fit="fill" :preview-src-list="[item]" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="卖家付款凭证">
              <el-image v-for="item, index in compcStr2Arr(formValidate.buyCoins.voucherSellerUnreceivedUrl)"
                :key="index" :src="item" fit="fill" :preview-src-list="[item]" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <add-black :visible.sync="blackDialogVisible" :user-id="blackUserId" />
  </div>
</template>
<script>
import {
  BuyCoinsSave,
  BuyCoinsUpdate,
  SellCoinsList,
  releaseOrder,
  buyCoins_close,
  TransactionAppealInfo
} from "@a/transaction";
import AddBlack from "./addBlack";

export default {
  name: "Edit",
  components: {
    AddBlack
  },
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
        isDelete: null,
        buyCoins: {
          buyerNickName: null,
          buyerHeader: null,
          hangingOrderNumber: null,
          sellerNickName: null,
          sellerHeader: null,
          orderStatusName: null,
          voucherBuyPayedUrl: null,
          voucherSellerUnreceivedUrl: null
        }
      },
      data: [],
      rules: {
        buyerId: [
          { required: true, message: "请输入买家id", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        money: [
          { required: true, message: "请输入购买金额", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "请输入卖家id", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        orgOrderId: [
          { required: true, message: "请输入卖家订单id", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        orderStatus: [
          { required: true, message: "请输入订单状态", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      otherType: "",
      sellOrders: [],
      blackDialogVisible: false
    };
  },
  computed: {
    compcStr2Arr() {
      return (str) => str ? str.split(",") : [];
    },
    canRelease() {
      const orderStatus = Number(this.formValidate?.buyCoins?.orderStatus);
      return [2, 5, 6].includes(orderStatus);
    },
    blackUserId() {
      return this.formValidate.userId
    }
  },
  methods: {
    async getSellOrders() {
      const data = await SellCoinsList();
      this.sellOrders = data;
    },

    //获取列表详情接口
    async getInfo(id) {
      const data = await TransactionAppealInfo(id);
      this.formValidate = data;
    },
    openBlackDialog() {
      this.blackDialogVisible = true;
    },
    async releaseOrd(id) {
      await releaseOrder(id);
      this.$message.success("放行成功");
    },
    async releaseBuyOrder() {
      this.$confirm("此操作将放行订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.releaseOrd(this.formValidate.buyCoins.id);
        })
        .catch(() => { });
    },
    closeBuyOrder() {
      this.$confirm("此操作将关闭订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          buyCoins_close({ id: this.formValidate.buyCoins.id }).then(() => {
            this.$message.success("关闭成功");
            this.getInfo(this.formValidate.id || this.id);
          });
        })
        .catch(() => { });
    },
    //新增保存接口
    async addData() {
      await BuyCoinsSave(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      await BuyCoinsUpdate(this.formValidate);
      this.$message.success("修改成功");
      this.resetForm();
      this.backTo();
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm() {
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
    this.getSellOrders();
  }
};
</script>
