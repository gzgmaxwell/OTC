<template>
  <div>
    <div v-for="item in routes" :key="item.value">
      <template v-if="item.showMenu">
        <el-submenu
          v-if="showMenu(item) "
          :index="item.path"
          :key="item.name"
          @click="handleRoute(item)"
        >
          <template slot="title">
            <div @click="handleRoute(item)">
              <i :class="item.icon" class="iconfont"></i>
              <span slot="title">{{ item.title }}</span>
            </div>
          </template>
          <sidebar-item :routes="item.children"></sidebar-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" @click="handleRoute(item)">
          <i :class="item.icon" class="iconfont"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  mounted() {},
  methods: {
    handleRoute(item) {
      if (item.hasPage && item.path !== this.$route.path) {
        this.$router.push(item.path);
      }
    },
    showMenu(item) {
      if(item.children && item.children.length &&  item.children.some(v => v.showMenu === true)){
        let list  = item.children.filter(v => v.showMenu === true)
        if(list.length&&list.length>1){
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
};
</script>
<style lang="scss">
</style>