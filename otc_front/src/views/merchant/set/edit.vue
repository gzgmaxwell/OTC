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
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-form-item label="账号：" prop="userName">
          <el-input v-model="formValidate.userName"></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="phoneNum">
          <el-input v-model="formValidate.phoneNum"></el-input>
        </el-form-item>

        <el-form-item label="邮箱地址：" prop="emailAddress">
          <el-input v-model="formValidate.emailAddress"></el-input>
        </el-form-item>

        <el-form-item label="头像：" prop="header">
          <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false"
            accept=".jpg, .jpeg, .JPG, .JPEG, .png" :on-success="handleIconSuccess">
            <img v-if="formValidate.header" :src="formValidate.header" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="姓名：">
          <el-input v-model="formValidate.fullName"></el-input>
        </el-form-item>

        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="formValidate.nickName"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  UserInfo,
  UserSave,
  UserUpdate,
} from "@a/system";
import { merchant_get, merchant_put } from "@a/merchant/set";

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
        userPassword: "123456"
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
      this.formValidate = data;
    },
    //新增保存接口
    async addData() {
      await UserSave(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "User"
      });
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
        return this.id ? this.editData() : this.addData();
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
