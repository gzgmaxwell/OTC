<template>
  <div class="login_wrapper">
    <div class="login-title">
      <h3>码商平台</h3>
      <p>输入您的个人详细信息开始使用！</p>
    </div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      class="login_form"
    >
      <h4>注册</h4>
      <el-form-item prop="phone">
        <el-input
          v-model="registerForm.phone"
          type="text"
          auto-complete="off"
          placeholder="手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row>
          <el-col :span="17" class="v-center"
            ><el-input
              v-model="registerForm.code"
              type="text"
              auto-complete="off"
              placeholder="短信验证码"
              style="width: 100%"
            ></el-input
          ></el-col>
          <el-col :span="7" class="v-center h-end">
            <el-button :loading="loading" @click="sendCode" style="width: calc(100% - 10px); margin-left: 10px"
              >{{ time != 60 ? `已发送（${time}）`:'获取验证码'}}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="yhlx">


        
                  <el-select placeholder="用户类型" style="width:100%" disabled  v-model="registerForm.yhlx" >
                      

                      <el-option
                        v-for="item in lxs"
                        :key="item.dicId"
                        :label="item.dicLabel"
                        :value="item.dicValue"
                      ></el-option>
                    </el-select>


      </el-form-item>
      <el-form-item prop="companyName">
        <el-input
          v-model="registerForm.companyName"
          type="text"
          auto-complete="off"
          placeholder="企业名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="8">
          <el-upload
            class="avatar-uploader2"
            :action="upload_url"
            :show-file-list="false"
            accept=".jpg, .jpeg, .JPG, .JPEG"
            :on-success="handleIconSuccess"
          >
            <img
              v-if="registerForm.businessLicense"
              :src="registerForm.businessLicense"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span class="image-title">营业执照</span>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
            class="avatar-uploader2"
            :action="upload_url"
            :show-file-list="false"
            accept=".jpg, .jpeg, .JPG, .JPEG"
            :on-success="handleMzscxkzSuccess"
          >
            <img
              v-if="registerForm.mzscxkz"
              :src="registerForm.mzscxkz"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span class="image-title">苗种生产许可证</span>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleRegister"
        >
        </el-input>
        <div class="password-level h-between" v-if="registerForm.password">
          <span class="fill"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input
          v-model="registerForm.userPassword"
          type="password"
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter.native="handleRegister"
        >
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <!-- <div style="float: right;">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div> -->
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          style="width: 100%"
          @click="$router.push({ path: '/login' })"
        >
          <span>返 回</span>
        </el-button>
        <!-- <div style="float: right;">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { register } from "@/api/login";

import {registerCode,GetList ,UserZczh} from "@a/system";
import { configForm } from "./data";
export default {
  name: "Register",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      lxs:[],
      configForm: configForm,
      registerForm: {
        phone: "",
        code: "",
        yhlx: "3",
        companyName: "",
        password: "",
        userPassword: "",
        businessLicense: "",
        mzscxkz: "",
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", message: "请输入手机号" },
        ],
        code: [
          { required: true, trigger: "blur", message: "请输入您的短信验证码" },
        ],
        yhlx: [
          { required: true, trigger: ['blur', 'change'], message: "请选择企业类型" },
        ],
        companyName: [
          { required: true, trigger: "blur", message: "请输入企业名称" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          {
            min: 8,
            max: 20,
            message: "密码长度必须介于 8 和 20 位之间",
            trigger: "blur",
          },
        ],
        userPassword: [
          { required: true, trigger: "blur", message: "请再次输入密码" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
      loading: false,
      captchaEnabled: true,
      time: 60,
      showSend: false,
      sendTime: null,
      timer: null
    };
  },
  created() {},
  methods: {
    async getLxs(){
      this.lxs = await GetList({model:"yhlx"})
    },
   async zczh(){
      this.loading = true;
      const data = await UserZczh(this.registerForm);
      this.loading = false;

        console.log(data)
        if(data.code == "200"){

        const username = this.registerForm.phone;
            this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).then(() => {
              this.$router.push("/login");
            }).catch(() => {});

        }

    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
         

          this.zczh();

          // register(this.registerForm).then(res => {
          
          // }).catch(() => {
          //   this.loading = false;
          //   if (this.captchaEnabled) {
          //     this.getCode();
          //   }
          // })
        }
      });
    },
    sendCode() {
      if(this.time != 60) return
      this.$refs.registerForm.validateField('phone', (val) => {
        if (!val) {
          this.sendRegister();
          return true;
        } else {
          return false;
        }
      })
      // this.timers(new Date().getTime())
    },
    async sendRegister(){
      const res = await registerCode({phoneNum:this.registerForm.phone})
      console.log('res======', res)
      this.$message.success("发送成功");
      this.timers(new Date().getTime())
    },
    handleIconSuccess(res, file) {
      this.registerForm.businessLicense = res.url;
    },
    handleMzscxkzSuccess(res, file) {
      this.registerForm.mzscxkz = res.url;
    },
    // 计时器
    timers(nt) {
      // 重新发送时nt会有参数
      const sendTime = nt ? nt : this.sendTime;
      console.log(sendTime);
      const reSendTime = sendTime + 60 * 1000;
      if (Math.trunc((reSendTime - sendTime) / 1000) <= 60) {
        this.time = Math.trunc((reSendTime - sendTime) / 1000);
        this.showSend = false;
        this.timer = setInterval(() => {
          this.time--;
          if (this.time < 1) {
            clearInterval(this.timer);
            this.showSend = true;
            this.time = 60
          }
          console.log(this.time);
        }, 1000);
      } else {
        this.showSend = true;
      }
    },
  },
 async mounted() {
   await  this.getLxs();
 },
 destroyed() {
  clearInterval(this.timer);
 }
};
</script>

<style lang="scss">
.login_wrapper {
  $bg: #2d3a4b;
  $color: #fff;
  $cursor: #fff;
  height: 100%;
  margin-left: -280px;
  background: $bg url("../../assets/images/bg.png") 50% 50% no-repeat;
  background-size:cover;
  overflow: hidden;
  .login-title {
    position: absolute;
    width: 420px;
    top: 50%;
    left: 15%;
    transform: translate(0, -50%);
    color: $color;
    h3 {
      font-size: 30px;
      line-height: 40px;
    }
    p {
      font-size: 14px;
      line-height: 40px;
    }
  }
  .login_form {
    position: absolute;
    width: 420px;
    top: 50%;
    right: 15%;
    transform: translate(10%, -50%);
    h4 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .submit_button {
    width: 95%;
    margin-top: 20px;
  }
  .password-level {
    display: flex;
    margin: 15px 0 8px;
    span {
      width: calc(25% - 5px);
      height: 5px;
      border-radius: 2px;
      background-color: rgba(191, 191, 191, 1);
      margin-left: 5px;
      &.fill {
        background-color: rgba(231, 67, 67, 1);
      }
      &:first-child {
        margin: 0;
      }
    }
  }
  .image-title {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
