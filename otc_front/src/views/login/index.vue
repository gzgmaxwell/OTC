<template>
  <div class="login_wrapper">
    <div class="login-title">
      <h3>OTC管理平台</h3>
      <p>输入您的个人详细信息开始使用！</p>
    </div>
    <el-form class="login_form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <h4>登录</h4>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-input
          v-model="loginForm.verificationCode"
          type="text"
          auto-complete="off"
          placeholder="谷歌验证码（如未绑定不必填写）"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-row class="v-center">
        <el-col :span="12" class="v-center">
          <el-checkbox v-model="loginForm.rememberMe" @change="jzwChange">记住我</el-checkbox>
        </el-col>
        <el-col :span="12" style="text-align: right" class="v-center h-end">
          <!-- <el-button type="text">忘记密码？</el-button> -->
        </el-col>
      </el-row>
      <el-row class="h-between button-area">
        <el-col :span="12">
          <el-button :loading="loading" type="primary" class="submit_button" @click="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-col>
        <!-- <el-col :span="12">
          <el-button class="submit_button" @click="handleRegister">注册</el-button>
        </el-col> -->
      </el-row>
     
    </el-form>
  </div>
</template>

<script>

import { loginAfter} from "@p/token";
import { Login} from "@a";
import Cookies from 'js-cookie';
// import debounce from '@p'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
      },      
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
      },
      loading: false,
    };
  },
  created() {},
  mounted() {
    this.$axios.get('https://w1.hifleet.com/hfWeatherApi/GetIsoline?&time=20231220&f=024').then(res => {
        console.log(res.data);
      })
      console.log(localStorage.getItem("rememberMe"));
      
    if(localStorage.getItem("rememberMe") ){
      
      console.log(localStorage.getItem("rememberMe") == "1");
        if(localStorage.getItem("rememberMe") == "1"){
              this.loginForm.rememberMe = true
              this.loginForm.username = localStorage.getItem("userName")
              this.loginForm.password = localStorage.getItem("password")
        }
    }
  },
  methods: {
    jzwChange(val){

        if(!val){
            localStorage.removeItem("userName");
            localStorage.removeItem("password");
            localStorage.setItem("rememberMe","2")
        }

    },

    handleLogin() {
      this.$refs.loginForm.validate( valid => {
        if (valid) {
          this.login();
          // this.loading = true;
          // if (this.loginForm.rememberMe) {
          //   Cookies.set("username", this.loginForm.username, { expires: 30 });
          //   Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
          //   Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          // } else {
          //   Cookies.remove("username");
          //   Cookies.remove("password");
          //   Cookies.remove('rememberMe');
          // }
          // 登录

 

          // this.$store.dispatch("Login", this.loginForm).then(() => {
          //   location.href = '/homeIndex';
          //   // this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          // }).catch(() => {
            
          //   // if (this.captchaEnabled) {
          //   //   this.getCode();
          //   // }
          // }).finally(()=>{this.loading = false;});
        }
      });

      
    },
    async login(){
         const userinfo = await Login({
            userName: this.loginForm.username,
            verificationCode: this.loginForm.verificationCode,
            client: "2",
            // password: this.loginForm.password
            password: jm(this.loginForm.password)
          });
          this.$message.success("登录成功");


          if(this.loginForm.rememberMe){
            
          console.log(this.loginForm.rememberMe);
            localStorage.setItem("userName", this.loginForm.username)
            localStorage.setItem("password",this.loginForm.password)
            localStorage.setItem("rememberMe","1")

          }
          console.log('userinfo========>', userinfo)
          if(userinfo) {
            loginAfter(userinfo);
            
          }
    },
    handleRegister() {
      this.$router.push({
        name: 'Register'
      })
    }
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
    width: calc(100% - 10px);
    margin-top: 20px;
  }
  .button-area {
    .el-col {
      &:nth-child(1) {
        .submit_button {
          margin-right: 10px;
        }
      }
      &:nth-child(2) {
        
        .submit_button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
