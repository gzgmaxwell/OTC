<template>
  <div class="menu_wrapper">
    <el-menu
      :collapse-transition="false"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="$route.path"
      unique-opened
      background-color="var(--sidebar-bg)"
      text-color="var(--sidebar-text)"
      active-text-color="var(--active-text)"
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
      background-color: var(--primary) !important;
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
  background-color: var(--primary-hover) !important;
}
.el-submenu__title:hover {
  background-color: var(--primary-hover) !important;
}
</style>
