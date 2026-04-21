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
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="180px">
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
        </div>

        <div>
          <div>费用信息</div>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="收银台上分手续费：">
                <el-input v-model="formValidate.userFeeInfo.upFee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="含四方上分手续费：">
                <el-input v-model="formValidate.userFeeInfo.sifangFee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="代买单-代付手续费(银)：">
                <el-input v-model="formValidate.userFeeInfo.upFeePayYinYin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="代买单-代付手续费(支)：">
                <el-input v-model="formValidate.userFeeInfo.upFeePayZhiYin"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="代付强制需审核：">
                <el-switch v-model="formValidate.userFeeInfo.upFeePayForceAudit" active-color="#13ce66"
                  inactive-color="#ff4949" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否开启API充值：">
                <el-switch v-model="formValidate.userFeeInfo.upFeePayOpen" active-color="#13ce66"
                  inactive-color="#ff4949" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="10">
              <el-form-item label="是否开启API代付：">
                <el-switch v-model="formValidate.userFeeInfo.upFeePayOpenPay" active-color="#13ce66"
                  inactive-color="#ff4949" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="商户买卖币昵称：">
                <el-input v-model="formValidate.userFeeInfo.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </div>

      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_get, merchant_put } from "@a/merchant";

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
          upFee: undefined,
          sifangFee: undefined,
          upFeePayYinYin: undefined,
          upFeePayZhiYin: undefined,
          upFeePayForceAudit: false,
          upFeePayOpen: false,
          upFeePayOpenPay: false,
          nickName: undefined,
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
      const extendData = {
        ...data,
        userFeeInfo: {
          upFee: undefined,
          sifangFee: undefined,
          upFeePayYinYin: undefined,
          upFeePayZhiYin: undefined,
          upFeePayForceAudit: false,
          upFeePayOpen: false,
          upFeePayOpenPay: false,
          nickName: undefined,
        }
      };
      this.formValidate = extendData;
    },

    //编辑保存接口
    async editData() {
      await merchant_put(this.formValidate, this.id);
      this.$message.success("修改成功");
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
