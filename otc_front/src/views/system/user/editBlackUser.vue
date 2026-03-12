<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        编辑黑名单用户
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
        <el-form-item label="拉黑原因：" prop="blackUserReason">
          <el-select v-model="formValidate.blackUserReason" placeholder="请选择">
            <el-option v-for="item in blackUserReasonOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { blackUserReasonOptions } from "@/utils/enum";
import { UserUpdate2233 } from "@a/system";

export default {
  name: "Edit",
  data() {
    return {
      blackUserReasonOptions,
      formValidate: {
        userName: "",
        blackUserReason: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        blackUserReason: [{ required: true, message: "请选择拉黑原因", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.formValidate.userName = this.$route.query.id;
  },
  methods: {
    //新增保存接口
    async addData() {
      await UserUpdate2233(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "User"
      });
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.addData()
      });
    },

    //返回
    backTo() {
      this.$router.push({
        name: "User"
      });
    }
  }
};
</script>