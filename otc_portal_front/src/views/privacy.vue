<template>
  <div data-v-828b61c5 class="w-full min-h-screen" style="overflow: visible;">
    <section data-v-828b61c5 class="app-main w-full relative flex flex-grow flex-col">
      <div data-v-828b61c5 class="app-main-wrap" ref="scrollContainer">
        <div data-v-207a772c data-v-828b61c5 class="w-full flex flex-col">
          <header
            data-v-65508b29
            data-v-207a772c
            :class="['w-full h-[3.2rem] pc:py-[0.8rem] pc:px-[1.6rem] mob:p-[0.8rem] flex justify-between items-center fixed z-50 left-0 top-0 transition-colors duration-300', { 'bg-black': scrolled, 'bg-transparent': !scrolled }]"
            style="background: transparent;"
          >
            <img
              data-v-65508b29
              class="w-[1.6rem] h-[1.6rem] cursor-pointer"
              src="../assets/images/logo-CtPFg1YT.png"
            />
            <div data-v-65508b29 class="pc:block mob:hidden">
              <div data-v-65508b29 class="flex items-center gap-[4rem]">
                <div
                  data-v-65508b29
                  class="text-[0.8rem] font-[500] leading-[1.1rem] cursor-pointer text-white"
                  @click="routeChange('index')"
                >{{$t('home')}}</div>
                <div
                  data-v-65508b29
                  class="text-[0.8rem] font-[500] leading-[1.1rem] cursor-pointer text-white"
                  @click="routeChange('about')"
                >{{$t('about')}}</div>
                <div
                  data-v-65508b29
                  class="text-[0.8rem] font-[500] leading-[1.1rem] cursor-pointer text-white"
                  @click="routeChange('privacy')"
                >{{$t('privacy')}}</div>
                <div data-v-65508b29 class="ant-dropdown-link cursor-pointer ant-dropdown-trigger">
                  <div
                    data-v-65508b29
                    style="position: relative;"
                    class="py-[0.2rem] px-[0.4rem] flex items-center gap-[0.2rem] h-[1.6rem] bg-[#ffffff] rounded-[0.2rem]"
                
                   >
                    <img
                      data-v-65508b29
                      class="w-[0.8rem] h-[0.8rem]"
                      src="data:image/png;base64,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"
                      alt
                    />
                    <span
                      data-v-65508b29
                      class="text-[0.8rem] font-[400] leading-[1.2rem]"
                      @click="languageChange" 
                    >{{language}}</span>
                    <div
                      class="ant-dropdown css-1p3hq3p ant-dropdown-placement-bottomLeft"
                      style="min-width: 80px; position: absolute;top: 30px;left: -8px;"
                      v-if="languageShow"
                    >
                      <!---->
                      <ul
                        class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light css-1p3hq3p"
                        role="menu"
                      >
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === '繁體中文'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('繁體中文')">繁體中文</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'English'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('English')">English</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'Tiếng Việt'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('Tiếng Việt')">Tiếng Việt</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'Português'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('Português')">Português</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-v-65508b29 class="pc:hidden mob:block">
              <div data-v-65508b29 class="flex items-center gap-[0.8rem]">
                <div data-v-65508b29 class="ant-dropdown-link cursor-pointer ant-dropdown-trigger" style="position: relative;">
                  <div
                    data-v-65508b29
                    class="py-[0.2rem] px-[0.4rem] flex items-center gap-[0.2rem] h-[1.6rem] bg-[#ffffff] rounded-[0.2rem]"
                    @click="languageChange"  >
                    <img
                      data-v-65508b29
                      class="w-[0.8rem] h-[0.8rem]"
                      src="data:image/png;base64,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"
                      alt
                    />
                    <span
                      data-v-65508b29
                      class="text-[0.8rem] font-[400] leading-[1.2rem]"
                       
                    >{{language}}</span>
                  </div>
                  <div
                      class="ant-dropdown css-1p3hq3p ant-dropdown-placement-bottomLeft"
                      style="min-width: 80px; position: absolute;top: 30px;left: -8px;"
                      v-if="languageShow"
                    >
                      <!---->
                      <ul
                        class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light css-1p3hq3p"
                        role="menu"
                      >
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === '繁體中文'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('繁體中文')">繁體中文</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'English'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('English')">English</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'Tiếng Việt'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('Tiếng Việt')">Tiếng Việt</span>
                          </span>
                        </li>
                        <li
                          :class="['ant-dropdown-menu-item ant-dropdown-menu-item-only-child', {'ant-dropdown-menu-item-disabled': language === 'Português'}]"
                          role="menuitem"
                        >
                          <span class="ant-dropdown-menu-title-content">
                            <span @click.prevent="languageChoose('Português')">Português</span>
                          </span>
                        </li>
                      </ul>
                    </div>                                                                                           
                </div>
              
                <img
                  data-v-65508b29
                  class="w-[1.2rem] h-[1.2rem]"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABICAYAAAC6L9h5AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADESURBVHgB7djRTQMxDAZgHxOwAhvARh2BDRihsFE3gA1gg+sGxveORAqpkrbfJ1l5is46JZbyRwAAAAAAAADA7cnMl6o1x/jcvh8zqwb3OYfnOIMlOqjm1lruY7yPZVmeorO74Fe9ftJbzGGWPn5WV+41xw3u9VzzCAAA5pBjo5JW71WPcaJeKcC+lkt5FhyrHiotOLZu6PXA3cXl2CKd3SkbbjUqaT5Fm2uLSlp8VR1ihBwblbQ65B8GNwAAAAAAAPB/3xUH8unwIEzhAAAAAElFTkSuQmCC"
                  @click="mobileDialogBtn"
                  alt
                />
              </div>
            </div>
            <!---->
          </header>

          <privacy :language="language"></privacy>

          <footer data-v-207a772c class="w-full h-[3.2rem] py-[1.2rem] mb-[2rem]">
            <div
              data-v-207a772c
              class="w-full text-center text-[12px] font-[400] leading-[0.9rem] text-[#9AA5AD]"
            >Copyright © 2025 Mengyu Ahead US LLC</div>
          </footer>
          <!---->
        </div>
      </div>
    </section>
    <mobile :language="language" :mobileDialog="mobileDialog" @close-drawer="onDrawerClosed"></mobile>
  </div>
</template>
  
  <script >
import privacy from "./privacy/privacy.vue";
import mobile from "../components/mobileDialog.vue";
export default {
  components: { privacy ,mobile},
  data() {
    return {
      language: localStorage.getItem('language'),
      mobileDialog: false,
      scrolled: false,
      languageShow: false
    };
  },
  mounted() {
  this.$refs.scrollContainer.addEventListener("scroll", this.handleScroll);
  window.addEventListener("scroll", this.handleScroll);
  window.addEventListener('beforeunload', this.beforeUnloadHandler);
},
beforeDestroy() {
  this.$refs.scrollContainer.removeEventListener("scroll", this.handleScroll);
  window.removeEventListener("scroll", this.handleScroll);
  window.removeEventListener('beforeunload', this.beforeUnloadHandler);
},
  methods: {
    beforeUnloadHandler(event) {
        localStorage.setItem('language','繁體中文')
  },
    onDrawerClosed() {
      console.log("guanbi");
      this.mobileDialog = false;
    },

    mobileDialogBtn() {
      this.mobileDialog = true;
    },

    languageChange() {
      this.languageShow = !this.languageShow;
    },
    languageChoose(lan) {
      console.log("lan", lan);
      this.language = lan;
      localStorage.setItem('language',this.language)
      if(lan==='繁體中文'){
        this.$i18n.locale = 'zh';
      }else if(lan==='English'){
        this.$i18n.locale = 'en';
      }else if(lan==='Tiếng Việt'){
        this.$i18n.locale = 'tv';
      }else if(lan==='Português'){
        this.$i18n.locale = 'ph';
      }
     
      this.languageShow = false;
    },
    handleScroll() {
      this.scrolled = window.scrollY > 80;
    },
    routeChange(val) {
      if (val === "index") {
        this.$router.push({ name: "index" });
      } else if (val === "about") {
        this.$router.push({ name: "about" });
      } else if (val === "privacy") {
        this.$router.push({ name: "privacy" });
      }
    }
  }
};
</script>
  
  <style lang="scss" scoped >
@import "./index.scss";
.bg-transparent {
  background-color: transparent !important;
}
.bg-black {
  background-color: #000 !important;
}
.text-white {
  color: #fff;
}
.text-black {
  color: #000;
}
</style>