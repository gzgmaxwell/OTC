<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // data() {
  //   return {
  //     cachedValue: null
  //   }
  // },

  mounted() {
    // 页面或组件加载完毕时执行
    // const now = new Date().toISOString()

    // 更新 localStorage
    localStorage.setItem('language','繁體中文')

    // 同步展示到界面
    // this.cachedValue = localStorage.getItem('myKey')
  }
}
</script>
<style>
body{
  margin: 0;
}
</style>