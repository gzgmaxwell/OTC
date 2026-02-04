<template>
  <div class="menu_wrapper">
    <el-menu
      :collapse-transition="false"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="$route.path"
      unique-opened
      background-color="rgba(0, 21, 41)"
      text-color="rgb(191, 203, 217)"
      active-text-color="#fff"
    >
      <sidebar-item :routes="menuList"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import sidebarItem from "./sideBar";
import { mapGetters } from "vuex";
import { getRouters } from "@r/dealRouter";
export default {
  components: { sidebarItem },
  computed: {
    ...mapGetters(["isCollapse"]),
    menuList() {
      return getRouters();
    }
  }
};
</script>
<style lang="scss">
.menu_wrapper {
  height: calc(100% - 56px);
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    border-right: 0;
    .is-active {
      background-color: rgb(24, 144, 255) !important;
    }
  }
  .el-submenu__title span {
    padding-left: 14px;
    display: inline-block;
    overflow: hidden;
  }
  .el-menu--collapse {
    .el-submenu__icon-arrow {
      opacity: 0;
    }
    .el-submenu__title span {
      width: 0;
    }
  }
}
.el-menu-item:hover {
  background-color: rgb(24, 144, 255,0.5) !important;
}
.el-submenu__title:hover {
  background-color: rgb(24, 144, 255,0.5) !important;
}
</style>
