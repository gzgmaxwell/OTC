<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ id ? "编辑信息" : "新增信息" }}
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo('formValidate')">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="200px">
        <div>
          <div>基本信息</div>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="账号：" prop="userName">
                <el-input v-model="formValidate.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号：" prop="phoneNum">
                <el-input v-model="formValidate.phoneNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="邮箱地址：" prop="emailAddress">
                <el-input v-model="formValidate.emailAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="姓名：">
                <el-input v-model="formValidate.fullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="头像：" prop="header">
                <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false"
                  accept=".jpg, .jpeg, .JPG, .JPEG, .png" :on-success="handleIconSuccess">
                  <img v-if="formValidate.header" :src="formValidate.header" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="昵称：" prop="nickName">
                <el-input v-model="formValidate.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="20">
              <el-form-item label="密码">
                <el-input v-model="formValidate.userPassword" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div>
          <div>费用信息</div>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="api代付手续费比例（小数）">
                <el-input v-model="formValidate.userFeeInfo.feeBehalfRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="提现手续费比例（小数）">
                <el-input v-model="formValidate.userFeeInfo.feeWithdrawRate"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="买币手续费比例 (小数)">
                <el-input v-model="formValidate.userFeeInfo.feeBuyfcbRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上分手续费（收银台）(小数)">
                <el-input v-model="formValidate.userFeeInfo.feeUpScoreCashierDesk"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="上分手续费（含四方）">
                <el-input v-model="formValidate.userFeeInfo.feeUpScoreGatherAlldir"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="待卖单-代付手续费（银）">
                <el-input v-model="formValidate.userFeeInfo.feeProcessRateBank"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="待卖单-代付手续费（阿里）">
                <el-input v-model="formValidate.userFeeInfo.feeProcessRateAlipay"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="代付强制审核开关">
                <el-switch v-model="formValidate.userFeeInfo.processForcecheckEnable" active-color="#13ce66"
                  inactive-color="#ff4949" active-value="0" inactive-value="1" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="API充值开关">
                <el-switch v-model="formValidate.userFeeInfo.rechargeEnable" active-color="#13ce66"
                  inactive-color="#ff4949" active-value="0" inactive-value="1" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="API充值代付开关">
                <el-switch v-model="formValidate.userFeeInfo.processEnable" active-color="#13ce66"
                  inactive-color="#ff4949" active-value="0" inactive-value="1" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="代付需审核金额">
                <el-input v-model="formValidate.userFeeInfo.processCheckamount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="最小API存款金额">
                <el-input v-model="formValidate.userFeeInfo.minDepositAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="最小代付金额">
                <el-input v-model="formValidate.userFeeInfo.minProcessAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="最大API存款金额">
                <el-input v-model="formValidate.userFeeInfo.maxDepositAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="20">
              <el-form-item label="最大API代付金额">
                <el-input v-model="formValidate.userFeeInfo.maxProcessAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </div>

      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_get, merchant_put, merchant_saveOrUpdate } from "@a/merchant";

export default {
  name: "Edit",
  data() {
    return {
      id: "",
      formValidate: {
        userName: "",
        fullName: "",
        header: null,
        departmentId: [],
        roleId: [],
        post: [],
        nation: "",
        province: "",
        city: "",
        county: "",
        street: "",
        userPassword: "123456",
        userFeeInfo: {
          feeBehalfRate: undefined,
          feeWithdrawRate: undefined,
          feeBuyfcbRate: undefined,
          feeUpScoreCashierDesk: undefined,
          feeUpScoreGatherAlldir: undefined,
          processCheckamount: undefined,
          minDepositAmount: undefined,
          minProcessAmount: undefined,
          maxDepositAmount: undefined,
          maxProcessAmount: undefined,
          feeProcessRateBank: undefined,
          feeProcessRateAlipay: undefined,
          processForcecheckEnable: 0,
          rechargeEnable: 0,
          processEnable: 0,
        }
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        post: [{ required: true, message: "请选择角色", trigger: "blur" }],
        fullName: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "请输入角色ID", trigger: "change" }]
      }
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getInfo();
    }
  },
  methods: {
    handleIconSuccess(res, file) {
      this.formValidate.header = res.url;
    },
    //获取列表详情接口
    async getInfo() {
      const data = await merchant_get(this.id);
      let userFeeInfo = {
        userId: data.userId,
        feeBehalfRate: undefined,
        feeWithdrawRate: undefined,
        feeBuyfcbRate: undefined,
        feeUpScoreCashierDesk: undefined,
        feeUpScoreGatherAlldir: undefined,
        processCheckamount: undefined,
        minDepositAmount: undefined,
        minProcessAmount: undefined,
        maxDepositAmount: undefined,
        maxProcessAmount: undefined,
        feeProcessRateBank: undefined,
        feeProcessRateAlipay: undefined,
        processForcecheckEnable: 0,
        rechargeEnable: 0,
        processEnable: 0,
      }
      if (data.userFeeInfo) {
        userFeeInfo = data.userFeeInfo
      }
      const extendData = {
        ...data,
        userFeeInfo
      };
      this.formValidate = extendData;
    },

    //编辑保存接口
    async editData() {
      // await merchant_put(this.formValidate, this.id);
      await merchant_saveOrUpdate(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "MerchantSet"
      });
    },

    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.editData();
      });
    },
    //返回
    backTo() {
      this.$router.push({
        name: "MerchantSet"
      });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
