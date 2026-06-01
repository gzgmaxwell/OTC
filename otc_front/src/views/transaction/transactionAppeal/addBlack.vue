<template>
  <el-dialog title="加入黑名单" :visible.sync="dialogVisible" width="500px" @close="handleClose">
    <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
      <el-form-item label="拉黑原因：" prop="recType">
        <el-select v-model="formValidate.recType" placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in blackUserReasonOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拉黑对象：" prop="userId">
        <el-select v-model="formValidate.userId" placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in optBuySell" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="formValidate.note1"></el-input>
      </el-form-item>
      <el-form-item label="限制功能：" v-if="compcChecked(formValidate.recType)">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="formValidate.limitResource" @change="handleCheckedChange">
          <el-checkbox v-for="item in authOpt" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { blackUserReasonOpt, authOpt } from "@/utils/enum";
import { blackList_add } from "@a/system";

export default {
  name: "JudgeAddBlack",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: [String, Number],
      default: ""
    },
    optBuySell: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      authOpt: authOpt,
      isIndeterminate: true,
      blackUserReasonOpt,
      formValidate: this.getDefaultForm(),
      rules: {
        recType: [{ required: true, message: "请选择拉黑原因", trigger: "change" }]
      }
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    compcChecked() {
      return () => true;
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.resetForm();
      }
    },
    userId(val) {
      this.formValidate.userId = val;
    }
  },
  methods: {
    getDefaultForm() {
      return {
        userId: this.userId,
        note1: "",
        recType: "",
        limitResource: []
      };
    },
    resetForm() {
      this.formValidate = this.getDefaultForm();
      this.checkAll = false;
      this.isIndeterminate = true;
      this.$nextTick(() => {
        this.$refs.formValidate && this.$refs.formValidate.clearValidate();
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCheckAllChange(val) {
      this.formValidate.limitResource = val ? this.authOpt.map(item => item.value) : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.authOpt.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.authOpt.length;
    },
    async addData() {
      const limitResource = this.formValidate.limitResource.join(",");
      await blackList_add({
        ...this.formValidate,
        limitResource
      });
      this.$message.success("保存成功");
      this.dialogVisible = false;
      this.$emit("success");
    },
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.addData();
      });
    }
  }
};
</script>
