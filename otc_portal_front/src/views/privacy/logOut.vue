<template>
  <div class="account-deactivation-page">
    <el-card class="deactivation-card">
      <div slot="header" class="clearfix">
        <span>Delete account</span>
      </div>

      <el-alert
        title="Important reminder: Account cancellation is irreversible！"
        type="warning"
        description="Cancelling your account will permanently delete all your data"
        show-icon
        :closable="false"
        style="margin-bottom: 20px;"
      ></el-alert>

      <el-form
        :model="deactivateForm"
        :rules="rules"
        ref="deactivateForm"
        label-width="150px"
        class="deactivation-form"
      >
        <el-form-item label="Account name" prop="username">
          <el-input v-model="deactivateForm.username" placeholder="Please enter your account name"></el-input>
        </el-form-item>

        <el-form-item label="password" prop="password">
          <el-input
            type="password"
            v-model="deactivateForm.password"
            placeholder="Please enter your password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('deactivateForm')"
            :loading="loading"
            class="deactivate-btn"
          >{{ loading ? 'Cancelling...' : 'Delete account' }}</el-button>
          <el-button @click="resetForm('deactivateForm')">reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 确认注销对话框 -->
    <el-dialog
      title="Confirm account cancellation"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDialog"
      center
    >
      <span>Are you sure you want to permanently cancel this account? This operation is irrevocable, please confirm again!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button
          type="danger"
          @click="handleDeactivation"
          :loading="loading"
        >{{ loading ? 'Processing...' : 'Confirm logout' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

  <script>
import axios from "axios";
export default {
  name: "AccountDeactivation",
  data() {
    return {
      deactivateForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter the account name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter the password",
            trigger: "blur"
          }
        ]
      },
      loading: false, // 控制按钮的loading状态
      dialogVisible: false // 控制确认对话框的显示
    };
  },
  mounted() {},
  methods: {
    // 提交表单前的验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，弹出确认对话框
          this.dialogVisible = true;
        } else {
          console.log("表单验证失败！");
          this.$message.error(
            "Please fill in the complete account name and password."
          );
          return false;
        }
      });
    },

    // 处理账户注销的实际逻辑（模拟API请求）
    handleDeactivation() {
      this.loading = true; // 开始加载
      this.dialogVisible = false; // 关闭确认对话框

      // 模拟一个异步请求，通常这里会调用你的后端API
      setTimeout(async () => {
        try {
          // 假设这是一个创建用户的API
          const response = await axios.post(
            "https://www.jingchat.com.cn/jing_chat_api/api/v1/user/log_off",
            {
              phoneNumber: this.deactivateForm.username,
              password: this.deactivateForm.password,
              phoneAreaPrefix: "86"
            }
          );
          console.log("用户创建成功:", response.data);
          // alert('用户创建成功！');
          if (response.data.code === 200) {
            this.$message({
              message: "We have received your request to cancel your account. If you do not log in to the account within 90 days, we will clean up your account. Thank you for using our service!",
              type: "success"
            });
          } else {
            this.$message({
              message: "Logout failed",
              type: "warning"
            });
          }
          // // 可以选择更新用户列表或清空表单
          // this.users.push(response.data); // 简单地添加到现有列表
          // this.newUser.name = '';
          // this.newUser.email = '';
        } catch (err) {
          console.error("创建用户失败:", err);
          // alert('创建用户失败: ' + (err.response?.data?.message || err.message || '未知错误'));
        } finally {
          this.creatingUser = false;
        }

        this.loading = false; // 停止加载
        this.resetForm("deactivateForm"); // 重置表单
      }, 2000); // 模拟2秒的网络请求
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 对话框关闭前的回调
    handleCloseDialog(done) {
      // 可以在这里添加一些逻辑，例如在用户点击遮罩层或X关闭对话框时
      // 询问用户是否确定关闭
      console.log("Dialog closed by user or X button.");
      done(); // 必须调用 done() 才能关闭对话框
    }
  }
};
</script>
  
  <style scoped>
.account-deactivation-page {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 调整为flex-start，让内容靠顶部对齐 */
  min-height: calc(
    100vh - 60px
  ); /* 假设头部高度为60px，减去后保证全屏垂直居中 */
  padding-top: 50px; /* 顶部留一些空间 */
  background-color: #f5f7fa;
}

.deactivation-card {
  width: 500px;
  max-width: 90%; /* 适应小屏幕 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  font-size: 18px;
  font-weight: bold;
}

.deactivation-form {
  margin-top: 20px;
}

.deactivate-btn {
  width: 120px;
}

/* 可以在这里添加更多样式来美化页面 */
</style>