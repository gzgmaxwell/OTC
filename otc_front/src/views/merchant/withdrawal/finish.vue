<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        编辑信息
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
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="付款凭证" prop="paymentVoucher">
              <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png" :on-success="handleIconSuccess">
                <img v-if="formValidate.paymentVoucher" :src="formValidate.paymentVoucher" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="交易描述" prop="transDes">
              <el-input v-model="formValidate.transDes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_get, merchant_put, merchant_saveOrUpdate, merchant_finishPay } from "@a/merchant";

export default {
  name: "Edit",
  data() {
    return {
      formValidate: {
        id: "",
        transDes: "",
        paymentVoucher: null,
      },
      rules: {
        transDes: [{ required: false, message: "请输入交易描述", trigger: "blur" }],
      }
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.formValidate.id = this.id;
      this.formValidate.transDes = this.$route.query.transDes;
    }
  },
  methods: {
    handleIconSuccess(res, file) {
      this.formValidate.paymentVoucher = res.url;
    },
    //编辑保存接口
    async editData() {
      merchant_finishPay(this.formValidate).then(() => {
        this.$message.success("保存成功");
        this.backTo();
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
        name: "MerchantWithdrawal"
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
