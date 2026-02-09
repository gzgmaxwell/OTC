<template>
  <div class="layout_wrapper">
    <Navbar />
      <div class="layout_content_wrapper">
        <router-view></router-view>
        <slot></slot>
      </div>
  </div>
</template>
<script>
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { mapGetters } from "vuex";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    ...mapGetters(["isCollapse"])
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
.layout_wrapper {
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
  .layout_content_wrapper {
    position: absolute;
    top: $navbarHeight;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
