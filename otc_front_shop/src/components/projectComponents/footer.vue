<template>
  <div class="page-footer">
    <div class="menu-list">
      <div class="item" v-for="(item, index) in menuList" :key="index" @click="goTo(item)">
        <div class="ico" :style="`background-image:url(${item.ico})`"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="links">
      <h4>友情链接</h4>
      <ul class="list">
        <li v-for="(item, index) in links" :key="index" class="item">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="info">
      沪ICP备：09054200号-4 沪公网安备：31010502002847号 免责声明 隐私权政策
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const menuList = [
      {
        ico: require("@/assets/images/menu_ico.png"),
        title: "数据库",
        path: "/database/dnaManager",
      },
      {
        ico: require("@/assets/images/menu_ico2.png"),
        title: "核酸库",
        path: "/nuclein/nucleinList",
      },
      {
        ico: require("@/assets/images/menu_ico3.png"),
        title: "组织库",
        path: "/tissue/list",
      },
      {
        ico: require("@/assets/images/menu_ico4.png"),
        title: "标本库",
        path: "/repository/sample",
      },
      {
        ico: require("@/assets/images/menu_ico5.png"),
        title: "活体库",
        path: "/livingBody/list",
      },
      {
        ico: require("@/assets/images/menu_ico6.png"),
        title: "产卵场",
        path: "/oviposition/list",
      },
    ];
    const links = [
      {
        title: "XXXXX网站",
        link: "https://www.baidu.com/",
      },
      {
        title: "XXXXX网站",
        link: "https://www.baidu.com/",
      },
      {
        title: "XXXXX网站",
        link: "https://www.baidu.com/",
      },
      {
        title: "XXXXX网站",
        link: "https://www.baidu.com/",
      },
    ];
    return {
      menuList,
      links,
    };
  },
  methods: {
    goTo(item){
      this.$router.push({
        path: item.path,
        query: {}
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
.page-footer {
  background: #3287bd;
  .menu-list {
    display: flex;
    height: 267px;
    justify-content: center;
    align-items: center;
    background: url("../../assets/images/footer_bg.png") 50% 0 no-repeat;
    .item {
      width: 203px;
      text-align: center;
      cursor: pointer;
      .ico {
        width: 100%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        height: 73px;
      }
      .title {
        &:before {
          content: "";
          display: block;
          width: 57px;
          height: 3px;
          background: #3287bd;
          border-radius: 1px;
          margin-bottom: 23px;
        }
        display: inline-block;
        height: 17px;
        font-size: 18px;
        line-height: 20px;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .info {
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    line-height: 54px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
  .links {
    h4 {
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      line-height: 18px;
      padding-top: 38px;
    }
    .list {
      display: flex;
      justify-content: center;
      padding: 24px 0 32px;
      .item {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        padding: 0 82px;
        line-height: 18px;
        a {
          padding: 0 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
