<template>
  <div class="navbar_wrapper">
    <div class="left_box">
      <svg
        :class="{ collapse: true, 'is-active': !isCollapse }"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        @click="$store.commit('SET_COLLAPSE')"
      >
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </div>
    <div class="right_box">
      <!-- <i class="el-icon-data-analysis color-icon ft-25 mr-10" @click="toData"></i> -->
      <!-- <i
        class="el-icon-bell color-icon ft-25 mr-10"
        @click="openNews = !openNews"
      ></i> -->
      <!-- <div v-show="openNews" class="news_box">
        <el-card class="box-card">
          <div slot="header">
            <div>
              <i class="el-icon-bell red"></i>
              <span style="padding: 0 10px;">新消息提醒</span>
              <i
                class="el-icon-s-unfold ft-20"
                @click="showNewMenu = !showNewMenu"
              ></i>
            </div>
            <span class="all">全部标记为已读</span>
          </div>
          <div v-show="showNewMenu" class="menu_box">
            <el-button round>全部</el-button>
            <el-button round>待审</el-button>
            <el-button round>待办</el-button>
            <el-button round>提醒</el-button>
            <el-button round>待阅</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </div> -->
      <i class="el-icon-rank color-icon ft-25" @click="fullScreen"></i>
      <el-dropdown
        trigger="click"
        @command="checkItem"
        placement="bottom-end"
      >
        <span class="el-dropdown-link" style="color:#031529;user-select:none;">
          欢迎您,
          {{ userInfo.fullName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
      :modal-append-to-body="false"
      width="40%"
      top="25vh"
    >
      <el-form
        :model="formValidate"
        label-width="100px"
        ref="formValidate"
        :rules="rules"
      >
        <el-form-item label="账号:">
          <span>{{ userInfo.userName }}</span>
        </el-form-item>
        <el-form-item label="原密码:" prop="oldPwd">
          <el-input
            v-model="formValidate.oldPwd"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd">
          <el-input
            v-model="formValidate.newPwd"
            autocomplete="off"
            type="password"
          ></el-input>

          <div class="intensity">
          <span class="psdText">密码强度</span>
          <span
            class="line"
            :class="[level.includes('low') ? 'low' : '']"
          ></span>
          <span
            class="line"
            :class="[level.includes('middle') ? 'middle' : '']"
          ></span>
          <span
            class="line"
            :class="[level.includes('high') ? 'high' : '']"
          ></span>
          <div class="warningtext">
            密码应由8-16位数字、字母、符号组成。请不要使用容易被猜到的密码
          </div>
        </div>


        </el-form-item>
        <el-form-item label="确认密码:" prop="affirmPwd">
          <el-input
            v-model="formValidate.affirmPwd"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="save('formValidate')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import screenfull from "screenfull";
import { Logout, ChangePwd } from "@a";


// 刷新路由
import { refreshRouter } from "@r/dealRouter";
import { removeRouter, removeDics, removeToken } from "@p/storage";
import { getToken, getUserInfo, getDics ,removeUserInfo} from "@p/storage";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formValidate.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      level: [],
      openNews: false,
      userInfo: {},
      showNewMenu: true,
      dialogFormVisible: false,
      formValidate: {
        oldPwd: "",
        newPwd: "",
        affirmPwd: "",
        userId: ""
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPwd: [ { required: true, validator: this.checkPassword, trigger: 'change' }],
        affirmPwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  mounted() {
   this.userInfo = getUserInfo();
   console.log(this.userInfo);
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {// 校验密码
    checkPassword(rule, value, callback) {
      this.level = []
      if (!value) {
        return callback('密码不能为空')
      }
      if (value.length < 8) {
        return callback('密码不少于8位')
      }
      if (value.length > 16) {
        return callback('密码不大于16位')
      }
      // 校验是数字
      const regex1 = /^\d+$/
      // 校验字母
      const regex2 = /^[A-Za-z]+$/
      // 校验符号
      const regex3 =
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
      if (regex1.test(value)) {
        this.level.push('low')
      } else if (regex2.test(value)) {
        this.level.push('low')
      } else if (regex3.test(value)) {
        this.level.push('low')
      } else if (/^[A-Za-z\d]+$/.test(value)) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(  value  )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
        this.level.push('high')
      }
      return callback()
    },
    toData(){
      this.$router.push("/data");
      // window.open(this.html_url+"data","大屏")
    },
    toHome() {
      this.$router.push("/dashboard/index");
    },
    checkItem(item) {
      switch (item) {
        case "setting":
          this.dialogFormVisible = true;
          break;
        case "logout":
          this.Logout();
          break;
        default:
          break;
      }
    },
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        this.formValidate.userId = this.userInfo.userId;


        var param={};
        param.oldPwd=jm(this.formValidate.oldPwd);
        param.newPwd=jm(this.formValidate.newPwd);
        param.affirmPwd=jm(this.formValidate.affirmPwd);
        await ChangePwd(param);
        this.closeDialog();
        this.$message.success("修改成功");
      });
    },
    // 退出登录
    Logout() {
      this.$confirm("确定要注销登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await Logout();
        removeRouter(); 
        removeDics(); 
        removeUserInfo(); 
        removeToken();
        refreshRouter();
        // this.removeUserInfo();
        // localStorage.clear();
        this.$message.success("退出成功");
        

        // const host = window.location.hostname;

        // if (host.includes("syj.fishseed.")) {
        //     // window.location.href="http://112.23.1.136:8081/dashboard/analysis";
        //     window.close();
        //   }else{
            this.$router.push("/login");
          // }


        // window.close();
        
      });
    },
    //关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs["formValidate"].resetFields();
    },
    fullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>

<style lang="scss" >
.navbar_wrapper {
  height: $navbarHeight;
  box-shadow: 0 2px 4px #e4e4e4;
  display: flex;
  justify-content: space-between;
  .left_box {
    height: 100%;
    display: flex;
    align-items: center;
    > i {
      font-size: 28px;
      margin-left: 10px;
      cursor: pointer;
      color: gray;
    }
    .collapse {
      cursor: pointer;
      margin-left: 20px;
    }
    .collapse.is-active {
      transform: rotate(180deg);
    }
  }
  .right_box {
    display: flex;
    align-items: center;
    position: relative;
    > i {
      font-size: 26px;
      margin-right: 12px;
      cursor: pointer;
      color: gray;
    }
    .el-dropdown {
      font-size: 16px;
      margin-right: 30px;
      cursor: pointer;
    }
    .news_box {
      position: fixed;
      top: 50px;
      right: 20px;
      z-index: 10;
      width: 400px;
      .el-card__header {
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > div {
            display: flex;
            align-items: center;
          }
          i {
            font-size: 20px;
            cursor: pointer;
          }
          .all {
            cursor: pointer;
          }
        }
      }
      .menu_box {
        .el-button.is-round {
          padding: 5px 14px;
          color: blueviolet;
        }
        padding-bottom: 15px;
      }
    }
  }
}


.intensity {
  .psdText {
    font-size: 14px;
    margin-right: 10px;
  }
  .line {
    display: inline-block;
    width: 48px;
    height: 4px;
    background: #d8d8d8;
    border-radius: 3px;
    margin-right: 8px;
    &.low {
      background: #f4664a;
    }
    &.middle {
      background: #ffb700;
    }
    &.high {
      background: #2cbb79;
    }
  }
  .level {
    margin: 0 16px 0 8px;
  }
  .warningtext {
    color: #5a5a5a;
    font-size: 12px;
    margin-top: 5px;
  }
}

</style>
