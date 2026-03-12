<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        提现审核
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
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="formValidate.idNumber" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { UserRealAuthUpdate566 } from "@a/transaction";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      formValidate: {
        name: null,
        idNumber: null,
        sfzZm: null,
        sfzFm: null,
        level: null,
        createBy: null,
        createTime: null,
        isDelete: null,
        updateBy: null,
        updateTime: null
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
        idNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { max: 50, message: "长度最多为50", trigger: "blur" }
        ],
      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    getInfo() {
      this.formValidate = this.$route.query;
    },

    //编辑保存接口
    async editData() {
      await UserRealAuthUpdate566(this.formValidate);
      this.$message.success("审核成功");
      this.resetForm();
      this.backTo();
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.editData()
      });
    },

    //重置
    resetForm() {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "WithdrawalReview"
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id);
    }
  }
};
</script>
