<template>
  <div class="page-header">
    <div class="top">
      <div class="web-logo cursor" @click="$router.push('homeIndex')">
        <img src="../../assets/images/logo.png" width="75" height="74" />
        <div class="web-logo-title">
          <div>海南省海洋与渔业科学院</div>
          <div class="sub-tit">
            HAINAN ACADEMY OF OCEAN AND FISHERIES SCIENCES
          </div>
        </div>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" v-if="getToken()">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon el-icon-caret-bottom" style="color: #fff" />
        </div>
        <el-dropdown-menu slot="dropdown" style="width: 92px">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="btn-login" @click="$router.push({name: 'Login'})" v-else>登录</div>
    </div>
    <h1>海南淡水及河口鱼类种质资源库</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { removeRouter, removeDics, removeUserInfo, removeToken } from "@p/storage";
export default {
  data() {
    return {
      getToken
    };
  },
  computed: {
    ...mapGetters([
      'avatar',
    ]),
  },
  methods: {
    
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
        removeRouter(); 
        removeDics(); 
        removeUserInfo(); 
        removeToken();
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/homeIndex';
        })
      }).catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  background: url("../../assets/images/header_bg.png") 50% 0 no-repeat;
  background-size: cover;
  padding-top: 9px;
  height: 310px;
  .top {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    height: 74px;
    align-items: center;
    margin: 0 auto 48px;
    .btn-login {
      color: #ffffff; 
      width: 60px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
  .web-logo {
    display: flex;
    align-items: center;
    text-align: left;
    .web-logo-title {
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      line-height: 26px;
      margin-left: 15px;
      .sub-tit {
        height: 9px;
        font-size: 10px;
        font-weight: 500;
        color: #ffffff;
        line-height: 14px;
        margin-top: 7px;
      }
    }
  }
  h1 {
    text-align: center;
    font-size: 75px;
    line-height: 77px;
    font-weight: 500;
    color: #ffffff;
  }
  .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 12px;
          font-size: 12px;
        }
      }
    }
}
</style>
