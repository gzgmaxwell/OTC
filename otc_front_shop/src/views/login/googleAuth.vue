<template>
  <div class="google-auth-container">
    <h3>绑定谷歌验证</h3>
    
    <!-- 第一步 -->
    <div class="step">
      <h4>第一步：下载Google身份验证APP</h4>
      <p>未绑定: 您未绑定谷歌验证</p>
      <p style="color: red;">提示:为了您的资金安全,请尽快绑定谷歌验证码!</p>
      <p>手机客户端下载地址:
        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" style="color: blue;">Android</a> | 
        <a target="_blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605" style="color: blue;">IOS</a>
      </p>
    </div>

    <!-- 第二步 -->
    <div class="step">
      <h4>第二步：在Google身份验证中添加密钥，获取授权码</h4>
      <p>请使用Google身份验证器扫描下方二维码</p>
      <img :src="userInfo.ewm" alt="QR Code" />
      <div class="manual-entry">
        <p>扫描不了？使用账号+密钥获取</p>
        <p>用户账号：{{userInfo.userName}}</p>
        <p>谷歌密钥：{{userInfo.secretKey}}</p>
        <p style="color: red;">绑定成功后密钥将不再展示，请自行备份保存。</p>
      </div>
    </div>

    <!-- 第三步 -->
    <div class="step">
      <h4>第三步：输入Google验证器中验证码</h4>
      <el-input v-model="verificationCode" placeholder="请输入谷歌验证码" style="width: 200px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="bindGoogleAuth">绑定</el-button>
    </div>
  </div>
</template>

<script>

  

import {  getUserInfo} from "@p/storage";

import router from "@r";
import { loginAfter} from "@p/token";
import { BindSecretKey } from "@a/system";



// 刷新路由
import { refreshRouter } from "@r/dealRouter";
import { removeRouter, removeDics, removeToken } from "@p/storage";
export default {
  data() {
    return {
      verificationCode: '',
      userInfo: {},
    };
  },
  methods: {
    async bindGoogleAuth() {
      // 这里可以添加绑定逻辑

       const userinfo = await BindSecretKey({
            userId: this.userInfo.userId,
            secretKey: this.userInfo.secretKey,
            verificationCode: this.verificationCode
          });
          this.$message.success("绑定成功");
          
        router.push("/login");
            // loginAfter(userinfo);
    }
  },
  mounted() {
        removeRouter(); 
        removeDics(); 
        refreshRouter();
   this.userInfo = getUserInfo();
   console.error(this.userInfo);
  },
};
</script>

<style scoped>
.google-auth-container {
  padding: 20px;
}
.step {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
}
.manual-entry {
  margin-top: 10px;
}
</style>