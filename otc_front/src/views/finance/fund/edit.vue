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
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="120px">
        <el-form-item label="用户id" prop="userId">
          <el-select v-model="formValidate.userId" filterable remote reserve-keyword placeholder="请输入关键词"
            style="width: 100%;" @change="changeUserId" :loading="loading">
            <el-option v-for="item, index in options" :key="index" :label="`${item.nickName}--${item.userId}`"
              :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item :label="compcChecked()" prop="money">
          <el-input v-model="formValidate.money"
            oninput="value=value.replace(/[^\d.]/g,'').replace(/(\..*)\./g,'$1')"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="formValidate.balance" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="type">
          <el-select style="width: 100%;" v-model="formValidate.type" placeholder="请选择账户类型" clearable>
            <el-option v-for="item in optAccountType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作类型" prop="operationType">
          <el-radio-group v-model="formValidate.ElFormItemoperationType">
            <el-radio :label="item.value" :key="item.value" v-for="item in optOperationType">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { operation_create, operation_page, operation_userInfos } from "@a/finance";
import { optAccountType, optOperationType, enum_OperationType } from "@/utils/enum";

export default {
  name: "ConfigManageEdit",
  components: {},
  data() {
    return {
      id: "",
      options: [],
      loading: false,
      optAccountType: optAccountType,
      optOperationType,
      formValidate: {
        userId: undefined,// '2036101816762703874' || JSON.parse(localStorage.getItem("UserInfo"))?.userId,
        money: undefined,
        balance: undefined,
        type: '',
        operationType: this.$route.query.operationType, //  0：加钱，1：扣款
      },
      rules: {
        userId: [
          { required: true, message: "请输入用户id", trigger: "blur" }
        ],
        money: [
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        balance: [
          { required: true, message: "请输入余额", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择账户类型", trigger: "blur" }
        ],
        operationType: [
          { required: true, message: "请选择操作类型", trigger: "blur" }
        ],
        walletAddress: [
          { required: true, message: "请输入钱包地址", trigger: "blur" }
        ]
      },
      dialogVisible: false
    };
  },
  computed: {
    compcChecked() {
      return () => enum_OperationType.add == this.$route.query.operationType ? "手动加款金额" : "手动扣款金额";
    },
  },
  methods: {
    changeUserId(val) {
      const balance = this.options.find(v => v.userId === val).balance
      this.formValidate.balance = balance
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        operation_userInfos({
          size: 10,
          current: 1,
          query: query,
        }).then(res => {
          this.loading = false;
          this.options = res.records
        })
      } else {
        this.options = [];
      }
    },
    getInfo(id) {
      // this.formValidate.remark = this.$route.query.remark 
    },
    //编辑保存接口
    editData() {
      operation_create(this.formValidate).then(res => {
        this.$message.success("保存成功");
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
    operation_userInfos().then(res => {
      this.loading = false;
      this.options = res
    })
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
