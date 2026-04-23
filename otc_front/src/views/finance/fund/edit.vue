<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑" : "新增" }}
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
        <el-form-item label="金额" prop="money">
          <el-input v-model="formValidate.money"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="formValidate.balance"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="type">
          <el-select style="width: 100%;" v-model="formValidate.type" placeholder="请选择账户类型" clearable>
            <el-option v-for="item in optWithdrawType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="钱包地址" prop="walletAddress">
          <el-input v-model="formValidate.walletAddress"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { merchant_addOrUpdate } from "@a/merchant/receiveCard";
import { optWithdrawType } from "@/utils/enum";

export default {
  name: "ConfigManageEdit",
  components: {},
  data() {
    return {
      id: "",
      optWithdrawType: optWithdrawType,
      formValidate: {
        money: undefined,
        balance: undefined,
        type: undefined,
        walletAddress: undefined,
      },
      rules: {
        money: [
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        balance: [
          { required: true, message: "请输入余额", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择账户类型", trigger: "blur" }
        ],
        walletAddress: [
          { required: true, message: "请输入钱包地址", trigger: "blur" }
        ]
      },
      dialogVisible: false
    };
  },
  methods: {
    getInfo(id) {
      // this.formValidate.remark = this.$route.query.remark 
    },
    //编辑保存接口
    editData() {
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
        money: undefined,
        balance: undefined,
        type: undefined,
        walletAddress: undefined,
      };
    },
    //返回
    backTo() {
      this.$router.push({
        name: "FinanceFund"
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
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
