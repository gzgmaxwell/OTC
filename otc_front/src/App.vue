<template>
  <div id="app">
    <div :class="{ left_wrapper: true, c_left_wrapper: isCollapse }">
      <div class="menu_tittle" v-if="!isCollapse">OTC综合管理平台</div>
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
import { setToken, setUserInfo, setDics, setRouter } from "@p/storage";
import {  GetDics, GetRouterList,CodeLogin } from "@a";
export default {
  name: "app",
  components: {
    Sidebar
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  data() {
    return {
      showMenu : false
    }
  },
  mounted() {
    console.log(window.location, 23233)
    this.getDics();
  },
  methods: {
    async getDics() {
      // 获取并储存字典信息
      const dictionaryData = await GetDics();
      setDics(dictionaryData);
      Vue.prototype.dics = dictionaryData;
    }
  }  
};
</script>
<style lang="scss">
.menu_tittle {
  height: $navbarHeight;
  line-height: $navbarHeight;
  background-color: rgba(0, 40, 77);
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
    background-color: $siderbarBac;
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
