<template>
  <div id="app">
    <div :class="{ left_wrapper: true, c_left_wrapper: isCollapse }">
      <div class="menu_tittle" v-if="!isCollapse">码商平台</div>
      <Sidebar />
    </div>
    <div :class="{ right_wrapper: true, s_right_wrapper: isCollapse }">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Sidebar from "./views/layout/components/sidebar";
import { mapGetters } from "vuex";
import Vue from "vue";
import { setToken, setUserInfo, setDics, setRouter, getTheme, setTheme } from "@p/storage";
import {  GetDics, GetRouterList,CodeLogin } from "@a";
export default {
  name: "app",
  components: {
    Sidebar
  },
  computed: {
    ...mapGetters(["isCollapse", "theme"])
  },
  data() {
    return {
      showMenu : false
    }
  },
  mounted() {
    console.log(window.location, 23233)
    this.getDics();
    const theme = getTheme();
    setTheme(theme);
    this.applyTheme(theme);
  },
  methods: {
    async getDics() {
      // 获取并储存字典信息
      const dictionaryData = await GetDics();
      setDics(dictionaryData);
      Vue.prototype.dics = dictionaryData;
    },
    applyTheme(theme) {
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    }
  },
  watch: {
    theme(newVal) {
      this.applyTheme(newVal);
    }
  }  
};
</script>
<style lang="scss">
.menu_tittle {
  height: $navbarHeight;
  line-height: $navbarHeight;
  background-color: var(--navbar-bg);
  font-size: 20px;
  text-align: center;
}
#app {
  height: 100%;
  position: relative;
  .left_wrapper {
    position: absolute;
    left: 0;
    width: $sSidebarWidth;
    top: 0;
    height: 100%;
    transition: all 0.3s;
    background-color: var(--sidebar-bg);
    color: #fff;
  }
  .c_left_wrapper {
    width: $cSidebarWidth;
  }
  .right_wrapper {
    position: absolute;
    left: $sSidebarWidth;
    right: 0;
    top: 0;
    height: 100%;
    transition: all 0.3s;
  }
  .s_right_wrapper {
    left: $cSidebarWidth;
  }
  .right_wrapper2 {
    width: 100%;
    height: 100%;
  }
  .layout_content_wrapper {
    position: absolute;
    top: $navbarHeight;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
