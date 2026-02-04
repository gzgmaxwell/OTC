<template>
  <div>
    <el-drawer
      :visible.sync="mobileDialog"
      direction="rtl"
      size="70%"
      @update:visible="handleVisibleChange"
    >
      <template #title>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <header
            data-v-65508b29
            class="w-full h-[3.2rem] pc:py-[0.8rem] pc:px-[1.6rem] mob:p-[0.8rem] flex justify-between"
          >
            <div data-v-65508b29></div>
            <div data-v-65508b29 class="flex items-center gap-[0.8rem]" style="border: 1px solid;">
              <div data-v-65508b29 class="cursor-pointer" style="position: relative;">
                <div
                  data-v-65508b29
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
                </div>
                <div
                  class="ant-dropdown css-1p3hq3p ant-dropdown-placement-bottomLeft"
                  style="min-width: 80px; position: absolute;top: 30px;left: -8px;"
                  v-if="languageShow"
                >
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
          </header>
        </div>
      </template>
      <div class="ant-drawer-content-wrapper">
        <div
          class="ant-drawer-content"
          style="background: rgba(255, 255, 255, 0.82); padding: 0px; backdrop-filter: blur(10px);"
        >
          <div class="ant-drawer-wrapper-body">
            <div class="ant-drawer-body" style="padding: 0px;">
              <div data-v-65508b29 class="w-full flex flex-col">
                <div data-v-65508b29 class="flex flex-col items-center gap-[2.9rem] mt-[9.35rem]">
                  <div
                    data-v-65508b29
                    class="text-[1.3rem] font-[600] leading-[1.8rem] text-[#000] w-[100%] flex justify-between cursor-pointer px-[1.5rem]"
                    @click="routeChange('index')"
                  >
                    <span data-v-65508b29 class="flex">
                      <img
                        data-v-65508b29
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADzSURBVHgB7ZXBDYIwFIZfcYEe1DNuwAhsIBuwAhfPcvFgPMAm6AZsoBvgACZw1IOpr/ElJoYS+gQTkS/5A7y+vr9pSwsw8o9EqAK1hi+QoBQqp2cCPSFRGZnEFIvpO6P2znBRRyoevbVFFC8orxMzXaxE+YYcj9o/NvWoSEHvbQbWJreWEOxH7cJrNkKwRHfU62a7GST1K00JjiHuog6oCuyoqJ+0NewNluF8qwJgYm043SlfCMhmG8XajewpnTi80+U31nDYhpeVyMUdFtcbnICBMMT1DbCH509syxIVNNSuJSVTrlJT4aZRSOBfrGcYGSwPNTFDhWKVxN4AAAAASUVORK5CYII="
                        class="w-[1.8rem] h-[1.8rem]"
                      />
                      {{$t('home')}}
                    </span>
                    <img
                      data-v-65508b29
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAYAAACp65zuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABOSURBVHgB7cw7DUAhEETRSZ6BV1IiBUk4QAISsIATJGCDDoaEks/2MMnp7i4AWPIQLFKlcAp/Si+exd8mLKTIjKPl3PiWSd8Z9UVJJF4D7JQpNpdTnaEAAAAASUVORK5CYII="
                      class="w-[0.8rem] h-[1.4rem] mt-[0.2rem]"
                    />
                  </div>
                  <div
                    data-v-65508b29
                    class="text-[1.3rem] font-[600] leading-[1.8rem] text-[#000] w-[100%] flex justify-between cursor-pointer px-[1.5rem]"
                    @click="routeChange('about')"
                  >
                    <span data-v-65508b29 class="flex">
                      <img
                        data-v-65508b29
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC1SURBVHgB7dVBDoIwEAXQP41ncI0n4AhexVsYV9alKz0CR6knoUu9BHUKcUOk6TRgDJmX/A2UDjDJFFBqJjdOKMw5tTFNXI8POs4DMntOxdlBKBa0kLOcNrXA4MdyC8a3nupZC4FN5roLht5847FAwQYz0R5+aA+z5X5hb3sNlmg0KwP860jZo0xU0HRw3eifGFqmh73niRyGoV7sr3pYcw6QqVGoQfkBfE9tTIl7Fcp4qFV7Ay6FRiSAql+RAAAAAElFTkSuQmCC"
                        class="w-[1.8rem] h-[1.8rem]"
                      />
                      {{$t('about')}}
                    </span>
                    <img
                      data-v-65508b29
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAYAAACp65zuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABOSURBVHgB7cw7DUAhEETRSZ6BV1IiBUk4QAISsIATJGCDDoaEks/2MMnp7i4AWPIQLFKlcAp/Si+exd8mLKTIjKPl3PiWSd8Z9UVJJF4D7JQpNpdTnaEAAAAASUVORK5CYII="
                      class="w-[0.8rem] h-[1.4rem] mt-[0.2rem]"
                    />
                  </div>
                  <div
                    data-v-65508b29
                    class="text-[1.3rem] font-[600] leading-[1.8rem] text-[#000] w-[100%] flex justify-between cursor-pointer px-[1.5rem]"
                    @click="routeChange('privacy')"
                  >
                    <span data-v-65508b29 class="flex">
                      <img
                        data-v-65508b29
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgB7ZXBUcMwEEW/AwXkBMxwUQekBNNBSggd5MopOsHAhXQQOoAOTAeGCsyRm1NAGLEfrycmExtZdnJJ3syfiRXtfu9KloAjh0gsmosWIoMdEosSkRPlokx/c2yMnhiKpqJUk9PE6jg1qRhn+hwMjXJN9oaiwjomOqc0niIABqf/GG0yQtHiHAHQ0KI9VmO3MkAPXNw74zu3s+Hloxu5E6Tnd85r3bwNWcVmJTRbFWu2jCK8+uTxNnSnWLgBktL0j9k3rr9uo0+fPE2GSxTf2i/RCjeIxFhMzx7cuMFsqLGtDd9FV+UDkzI5TaV9L6ivjDEfCICbgNs7rg6ypVLhc83ONBozQQBsDT/gpEUM52boAA9lvvHMY+4MHaqrYjUR181s+Z9j5S1i0RPlQc52Va+iWMdyBB7YTRisryK27wnrA95gh1g1oubYEwbFVXTkAPkBR45zjmrCXWkAAAAASUVORK5CYII="
                        class="w-[1.8rem] h-[1.8rem]"
                      />
                      {{$t('privacy')}}
                    </span>
                    <img
                      data-v-65508b29
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAYAAACp65zuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABOSURBVHgB7cw7DUAhEETRSZ6BV1IiBUk4QAISsIATJGCDDoaEks/2MMnp7i4AWPIQLFKlcAp/Si+exd8mLKTIjKPl3PiWSd8Z9UVJJF4D7JQpNpdTnaEAAAAASUVORK5CYII="
                      class="w-[0.8rem] h-[1.4rem] mt-[0.2rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script >
export default {
  props: {
    language: {
      type: String,
      default: "繁體中文"
    },
    mobileDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      languageShow: false
    };
  },
  watch: {
    language(newVal, oldVal) {
      console.log("language changed:", newVal);
      // 这里写你语言变化后的逻辑
    }
  },
  mounted() {
    console.log("mounted language:", this.language);
  },
  methods: {
    languageChange() {
      console.log("oooo2222222222");
      this.languageShow = !this.languageShow;
    },
    languageChoose(lan) {
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
    handleVisibleChange(val) {
      if (!val) {
        // 关闭弹框时通知父组件
        this.$emit("close-drawer");
      }
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
@import "./mobile.scss";
.header-inner {
}
</style>