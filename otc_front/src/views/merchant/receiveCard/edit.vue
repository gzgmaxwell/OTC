<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑配置" : "新增配置" }}
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
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="付款类型" prop="payType">
              <el-select style="width: 100%;" v-model="formValidate.payType" placeholder="请选择类型" clearable>
                <el-option v-for="item in optPayType" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="用户ID" prop="userId">
              <el-input v-model="formValidate.userId" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="用户账号" prop="userName">
              <el-input v-model="formValidate.userName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label=" 姓名" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="提现类型" prop="withdrawType">
              <el-select style="width: 100%;" v-model="formValidate.withdrawType" placeholder="请选择类型" clearable>
                <el-option v-for="item in optWithdrawType" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="货币地址" prop="fcbAddress">
              <el-input v-model="formValidate.fcbAddress" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="银行卡姓名" prop="idCardName">
              <el-input v-model="formValidate.idCardName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="银行名称" prop="bankCaller">
              <el-input v-model="formValidate.bankCaller" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="银行编码" prop="bankCode">
              <el-input v-model="formValidate.bankCode" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="收款码图" >
              <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png" :on-success="handleIconSuccess">
                <img v-if="formValidate.paymentQr" :src="formValidate.paymentQr" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input v-model="formValidate.remark" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_addOrUpdate } from "@a/merchant/receiveCard";

import { optWithdrawType, optCominPayType } from "@/utils/enum";

export default {
  name: "ConfigManageEdit",
  components: {},
  data() {
    return {
      id: "",
      optPayType: optCominPayType,
      optWithdrawType: optWithdrawType,
      formValidate: {
        payType: null, // 付款类型
        userId: null, // 用户ID
        userName: null, //用户账号/商户账号
        name: null, // 姓名
        withdrawType: null, // 提现类型
        fcbAddress: null, // 货币地址
        idCardName: null, // 银行卡姓名
        bankCaller: null, // 银行名称
        bankCode: null, // 银行编码
        paymentQr: null, // 收款码图
        remark: null, // 备注
      },
      rules: {
        payType: [
          { required: true, message: "请选择付款类型", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "请输入用户ID", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户账号/商户账号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        withdrawType: [
          { required: true, message: "请输入提现类型", trigger: "blur" }
        ],
        fcbAddress: [
          { required: true, message: "请输入货币地址", trigger: "blur" }
        ],
        idCardName: [
          { required: true, message: "请输入银行卡姓名", trigger: "blur" }
        ],
        bankCaller: [
          { required: true, message: "请输入银行名称", trigger: "blur" }
        ],
        bankCode: [
          { required: true, message: "请输入银行编码", trigger: "blur" }
        ],
        paymentQr: [
          { required: true, message: "请上传收款码图", trigger: "blur" }
        ]
      },
      dialogVisible: false
    };
  },
  methods: {
    handleIconSuccess(res, file) {
      this.formValidate.paymentQr = res.url;
    },
    getInfo(id) {
      const query = this.$route.query || {};
      this.formValidate.id = query.id || id || null;
      this.formValidate.payType = query.payType ?? this.formValidate.payType;
      this.formValidate.userId = query.userId ?? this.formValidate.userId;
      this.formValidate.userName = query.userName ?? this.formValidate.userName;
      this.formValidate.name = query.name ?? this.formValidate.name;
      this.formValidate.withdrawType =
        query.withdrawType ?? this.formValidate.withdrawType;
      this.formValidate.fcbAddress = query.fcbAddress ?? this.formValidate.fcbAddress;
      this.formValidate.idCardName = query.idCardName ?? this.formValidate.idCardName;
      this.formValidate.bankCaller = query.bankCaller ?? this.formValidate.bankCaller;
      this.formValidate.bankCode = query.bankCode ?? this.formValidate.bankCode;
      this.formValidate.paymentQr = query.paymentQr ?? this.formValidate.paymentQr;
      this.formValidate.remark = query.remark ?? this.formValidate.remark;
    },
    //编辑保存接口
    editData() {
      console.log(333, this.formValidate);
      merchant_addOrUpdate(this.formValidate).then(res => {
        this.$message.success("操作成功");
        this.resetForm();
        this.backTo();
      });
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.editData();
      });
    },

    //重置
    resetForm() {
      this.formValidate = {
        id: null,
        payType: null,
        userId: null,
        userName: null,
        name: null,
        withdrawType: null,
        fcbAddress: null,
        idCardName: null,
        bankCaller: null,
        bankCode: null,
        paymentQr: null,
        remark: null
      };
    },
    //返回
    backTo() {
      this.$router.push({
        name: "MerchantReceiveCard"
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.formValidate.id = this.id;
      this.getInfo(this.id);
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
