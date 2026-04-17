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
        <el-form-item label="拉黑原因：" prop="recType">
          <el-select v-model="formValidate.recType" placeholder="请选择">
            <el-option v-for="item in blackUserReasonOpt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formValidate.note1"></el-input>
        </el-form-item>
        <el-form-item label="操作权限：" v-if="compcChecked(formValidate.recType)">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="formValidate.limitResource" @change="handleCheckedChange">
            <el-checkbox v-for="item in authOpt" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { blackUserReasonOpt, authOpt, blackUserReason_enum } from "@/utils/enum";
import { blackList_add } from "@a/system";

export default {
  name: "Edit",
  data() {
    return {
      checkAll: false,
      authOpt: authOpt,
      isIndeterminate: true,
      blackUserReasonOpt,
      formValidate: {
        userId: "",
        note1: "",
        recType: "",
        limitResource: [],
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        blackUserReason: [{ required: true, message: "请选择拉黑原因", trigger: "change" }]
      }
    };
  },
  computed: {
    compcChecked() {
      // return (recType) => recType === blackUserReason_enum.freeze;
      return (recType) => true;
    }
  },
  mounted() {
    this.formValidate.userId = this.$route.query.userId;
  },
  methods: {
    handleCheckAllChange(val) {
      this.formValidate.limitResource = val ? this.authOpt.map(item => item.value) : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.authOpt.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.authOpt.length;
    },
    //新增保存接口
    async addData() {
      const limitResource = this.formValidate.limitResource.join(',');
      await blackList_add({
        ...this.formValidate,
        limitResource
      });
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