<template>
  <div>
    <div data-v-0391810e class="w-full relative flex justify-start items-center">
      <img data-v-0391810e class="w-full h-auto" src="../../assets/images/privacy-bg.png" alt />
      <div
        data-v-0391810e
        class="w-full pc:text-[2.8rem] mob:text-[1.3rem] font-[600] pc:leading-[3.9rem] mob:leading-[1.8rem] pc:px-[26.6rem] pc:pb-[5rem] mob:px-[2.4rem] pc:text-left mob:text-center text-[#ffffff] absolute"
      >{{$t('privacyPolicy')}}</div>
    </div>
    <div data-v-0391810e class="w-full bg-[#ffffff]">
      <div
        data-v-0391810e
        class="flex flex-col items-center pc:w-[56rem] mx-auto mob:px-[0.8rem] pc:py-[4.6rem] mob:py-[1.6rem] pc:gap-[4rem] mob-[2.4rem]"
      >
        <div data-v-0391810e class="w-full flex flex-col items-start gap-[1rem]">
          <div
            data-v-0391810e
            class="pc:text-[1.95rem] mob:text-[1.3rem] font-[700] leading-[2.5rem] text-[#252A34] text-left"
          >{{$t('regardingSharing')}}</div>
          <div
            data-v-0391810e
            class="text-[0.9rem] leading-[1.2rem] text-[#555555] text-left"
          >{{$t('rshareDesc')}}</div>
        </div>
        <div data-v-0391810e class="w-full flex flex-col items-start gap-[1rem] mob:mt-[1.5rem]">
          <div
            data-v-0391810e
            class="pc:text-[1.95rem] mob:text-[1.3rem] font-[700] leading-[2.5rem] text-[#252A34] text-left"
          >{{$t('aboutData')}}</div>
          <div
            data-v-0391810e
            class="text-[0.9rem] leading-[1.2rem] text-[#555555] text-left"
          >{{$t('dataDesc')}}</div>
        </div>
        <div data-v-0391810e class="w-full flex flex-col items-start gap-[1rem] mob:mt-[1.5rem]">
          <div
            data-v-0391810e
            class="pc:text-[1.95rem] mob:text-[1.3rem] font-[700] leading-[2.5rem] text-[#252A34] text-left"
          >{{$t('aboutChat')}}</div>
          <div
            data-v-0391810e
            class="text-[0.9rem] leading-[1.2rem] text-[#555555] text-left"
          >{{$t('chatDesc')}}</div>
        </div>
        <div data-v-0391810e class="w-full flex flex-col items-start gap-[1rem] mob:mt-[1.5rem]">
          <div
            data-v-0391810e
            class="pc:text-[1.95rem] mob:text-[1.3rem] font-[700] leading-[2.5rem] text-[#252A34] text-left"
          >{{$t('regardingChats')}}</div>
          <div
            data-v-0391810e
            class="text-[0.9rem] leading-[1.2rem] text-[#555555] text-left"
          >{{$t('regardDesc')}}</div>
        </div>
        <div data-v-0391810e class="w-full flex flex-col items-start gap-[1rem] mob:mt-[1.5rem]">
          <div
            data-v-0391810e
            class="pc:text-[1.95rem] mob:text-[1.3rem] font-[700] leading-[2.5rem] text-[#252A34] text-left"
          >{{$t('deleteInformation')}}</div>
          <div
            data-v-0391810e
            class="text-[0.9rem] leading-[1.2rem] text-[#555555] text-left"
          >{{$t('deleteDesc')}}</div>
        </div>
        <div
          data-v-0391810e
          class="w-full flex justify-start items-start gap-[0.2rem] mob:mt-[1.5rem]"
        >
          <span
            data-v-0391810e
            class="text-[0.8rem] font-[400] leading-[1.2rem] text-[#000000] text-left"
          >{{$t('moreIntro')}}</span>
          <span
            data-v-0391810e
            class="text-[0.8rem] font-[400] leading-[1.2rem] text-[#178AFF] text-left cursor-pointer underline"
            @click="viewPrivacy"
          >{{$t('user')}}</span>
        </div>
      </div>
    </div>
    <zhPrivacy :dialogVisible="dialogVisible" v-if="language==='繁體中文'" @handleClose="handleClose"></zhPrivacy>
    <enPrivacy :dialogVisible="dialogVisible" v-if="language==='English'" @handleClose="handleClose"></enPrivacy>
    <tvPrivacy :dialogVisible="dialogVisible" v-if="language==='Tiếng Việt'" @handleClose="handleClose"></tvPrivacy>
  <phPrivacy :dialogVisible="dialogVisible" v-if="language==='Português'" @handleClose="handleClose"></phPrivacy>
  </div>
</template>
<script >
import enPrivacy from './enPrivacy.vue'
import zhPrivacy from './zhPrivacy.vue'
import tvPrivacy from './tvPrivacy.vue'
import phPrivacy from './phPrivacy.vue'
export default {
  props: {
    language: {
      type: String,
      default: "繁體中文"
    }
  },
  components:{enPrivacy,zhPrivacy,tvPrivacy,phPrivacy},
  data() {
    return {
      dialogVisible: false
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
    viewPrivacy() {
      this.dialogVisible = true;
    },
    handleClose(val){
      console.log("handleClose",val)
      this.dialogVisible = false
    }
  }
};
</script>

<style lang="scss" scoped >
@import "./privacy.scss";

.header-inner {
}
</style>