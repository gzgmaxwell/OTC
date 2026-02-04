<template>
  <div>
    <div class="pc:block mob:hidden">
      <div class="w-full relative flex justify-center items-center relative">
        <img class="w-full h-auto" src="../../assets/images/about-bg.png" alt />
        <div
          class="w-full flex flex-col items-center pc:gap-[2.1rem] mob:gap-[0.8rem] absolute mob:mt-[-12rem]"
        >
          <div
            class="pc:text-[2.8rem] mob:text-[1.6rem] font-[600] pc:leading-[3.9rem] mob:leading-[1.8rem] text-[#ffffff]"
          >{{$t('aboutUs')}}</div>
          <div
            class="pc:text-[1.6rem] mob:text-[0.8rem] font-[300] pc:leading-[2.4rem] mob:leading-[1.05rem] text-[#ffffff] text-center"
          >{{$t('aTitle')}}</div>
        </div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgB7Y3BDYAwCEX/qG5SN9ANyqZI1EPT1LYgeuIlnID3gCBwg5kTX2wwIr/5dqTWsiRDSSE/aR2QNVLLhf3pUB1pyGn0MB1RyzURs3wm8lrei7jJOxE/+SBC8KSKEL5AxIvMiiD4lQNwYWesNOxaQQAAAABJRU5ErkJggg=="
          class="absolute bottom-6 left-1/2 w-[1.2rem] h-[1.2rem]"
        />
      </div>
    </div>
    <div class="pc:hidden mob:block">
      <div class="w-full relative flex justify-center items-center relative">
        <img class="w-full h-auto" src="../../assets/images/about-bg-mob.png" alt />
        <div
          class="w-full flex flex-col items-center pc:gap-[2.1rem] mob:gap-[0.8rem] absolute mob:mt-[-12rem]"
        >
          <div
            class="pc:text-[2.8rem] mob:text-[1.6rem] font-[600] pc:leading-[3.9rem] mob:leading-[1.8rem] text-[#ffffff]"
          >{{$t('aboutUs')}}</div>
          <div
            class="pc:text-[1.6rem] mob:text-[0.8rem] font-[300] pc:leading-[2.4rem] mob:leading-[1.05rem] text-[#ffffff] text-center"
          >{{$t('aTitle')}}</div>
        </div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgB7Y3BDYAwCEX/qG5SN9ANyqZI1EPT1LYgeuIlnID3gCBwg5kTX2wwIr/5dqTWsiRDSSE/aR2QNVLLhf3pUB1pyGn0MB1RyzURs3wm8lrei7jJOxE/+SBC8KSKEL5AxIvMiiD4lQNwYWesNOxaQQAAAABJRU5ErkJggg=="
          class="absolute bottom-6 left-1/2 w-[1.2rem] h-[1.2rem]"
        />
      </div>
    </div>
    <div class="w-full bg-[#ffffff]">
      <div
        class="w-full h-[21.45rem] pc:my-[12.45rem] pc:px-[8rem] mob:mt-[10.8rem] mob:px-[1rem] flex flex-col items-center gap-[2.8rem]"
      >
        <div class="flex flex-col items-center gap-[1.2rem]">
          <div
            class="pc:text-[3.5rem] mob:text-[1.3rem] font-[700] pc:leading-[3.5rem] mob:leading-[1.45rem] text-[#091133] text-center"
          >{{$t('aTitleSecond')}}</div>
        </div>
        <div
          class="pc:text-[1.2rem] mob:text-[0.7rem] pc:leading-[1.8rem] mob:leading-[1.05rem] text-[#141516] text-center"
        >{{$t('atsDesc')}}</div>
        <div class="flex flex-col items-center gap-[0.8rem]">
          <div class="flex justify-center items-center gap-[0.8rem]">
            <div class="h-[2.8rem] relative">
              <div
                class="py-1.2rem px-[1.8rem] h-[2.8rem] flex items-center justify-center rounded-[2.2rem] bg-[#178AFF] hover:bg-[#178AFF99] cursor-pointer"
              >
                <span
                  class="text-[0.9rem] font-[700] leading-[0.9rem] text-[#ffffff] text-center"
                >{{$t('imPhoneDown')}}</span>
              </div>
              <div class="absolute right-[-5.5rem] bottom-[0.5rem]">
                <div class="w-[5.35rem] h-[2.6rem] relative">
                  <div
                    class="pc:w-[2.8rem] text-[0.7rem] font-[700] leading-[1.05rem] text-[#6F7CAA] rotate-[13.32deg] absolute right-[0.1rem] top-[0.25rem] text-center"
                  >{{$t('freeDown')}}</div>
                  <img
                    class="w-[3.55rem] h-[1.1rem] absolute left-[0px] bottom-[0px]"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAYCAYAAACoaOA9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANtSURBVHgB7ZhNUhNBFMff624sy425gfEE4gkYbhAXIpQLws6FmFlaEopJCZQ7BrTcElYIsSrhBIQTEE/AcINYpW6Y7ud7DcGEhIIoKMT8qlKT7pmeTv71Pvo9hCFdhK83s86ovIEhXTitY0R4hDCkA7EaMvoAUJUVDOmARkxBrqiPSkO3asNbjaMcKFWOo4lkaDltOGOmASErViPjvsV5WdwMZt9s5mHAEKtBorzEmjiaSmTOFIrb+0D8DaHJn4Ss+woKm+0LEfEBEGX4uVEeZUFjMwzXa3E804QBwWkVYZvVCBxzWAikgPXZAwfjqPV9L0Qb5OCQFeLncI8QVrX+Vh4kYUL2BEKcRqBSy2oE4xB2FEGgwEbx0lQd/jN8EEa9IF4Tv30Wtd9TWpuydyfSK63JQnGrOohxpRd8plnnMJJBbcfP3lNx9KSJZGdYoNHZuU/hyXRWKb1emNtagQHmVbGywJcAne1wpxanJ+TC/OcqB5cAU/s4fjeVhMWtiAAXOAgnaO24zMEAIcJwjIl8nFnsdKcWp6mcAzFbDz9qzLqMZQECm5rypndwovJAcBlhhI7aiq0lx9ZSdc7OvF+eKvu5iCvU1MiLpsWKHNlS695tpDBfWeFsHF4kjNBVeBaKlV1enF1dmnjYPh9G26NkgV0PsjysW7ClD4u3J7v5rKR1VWLrZYQRusQJ+QRMoHfFpeIefz6c387zmWjhNok0O18J+bgi6ZqPdG6GhaldZl23OFE1QzY9IGs31pYnw/MWnhWJXXHjprmblDoatM9IcshVxuZ7ZaXz6NnPYdfaJ6LDtaWJHFxAh0gck3iqztmt9C+zm4iiSOW57JmWk71P1UuTMfRJT3EkCMu1H5XDYiVwAHkfuAWCBiHtpC6tfVx+3oBrhmu9jL13N8fnM9k/8KKQWwXzI46j3yt1rrwT6IW1OnAkQsGYnxSLQmo453YsuMZVifWC9xo5wpxC5H1UwBtlrkKUFtfaJv0lFAaINHYSn45hy2LBEnbJL+RcQsq7JKTm+NqOSXmdpQwqxW0FrpwVdwlABV4MeRVJYQw1BViLF5/W4Yr4qz1kL1Y6MurABTzk9gdk+Ac86ucdYhkSD/lLQzmqw52ROpdACVwDN6LBzhmSRUuzxyPMgHMdLRMuDBMwxC7yPflTV+mHn6o3qMh7dueOAAAAAElFTkSuQmCC"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-[0.7rem] font-[500] leading-[1.05rem] text-[#178AFF] text-center"
          >Learn more</div>
        </div>
      </div>
      <div
        class="flex pc:justify-center pc:w-[60rem] mx-auto pc:flex-row mob:flex-col items-center pc:gap-[3.2rem] mob:gap-[1.2rem] pc:py-[3.2rem] mob:py-[1.2rem] mob:px-[0.8rem]"
      >
        <img
          class="w-[17.15rem] h-[19.4rem] pc:hidden mob:block"
          src="../../assets/images/about-life-CJKLpoao.png"
          alt
        />
        <div
          class="pc:w-[32rem] mob:w-full pc:h-[16rem] flex flex-col items-start pc:gap-[2rem] mob:gap-[1.2rem]"
        >
          <div class="flex justify-start items-center gap-[0.3rem] text-left">
            <span class="text-[0.9rem] font-[600] leading-[1.4rem] text-[#252A34]">CEO</span>
            <div class="w-[3rem] h-[0.05rem] bg-[#00000040]"></div>
          </div>
          <div
            class="pc:text-[3.2rem] mob:text-[1.3rem] font-[700] pc:leading-[3.5rem] mob:leading-[1.45rem]"
          >
            <span class="text-[#2D3748]">{{$t('inforFlood')}}</span>
            <br />
            <span class="text-[#178AFF]">{{$t('inforFloodTwo')}}</span>
          </div>
          <div
            class="pc:text-[1.2rem] mob:text-[0.7rem] pc:leading-[1.8rem] mob:leading-[1.05rem] text-[#141516]"
          >{{$t('ifDesc')}}</div>
        </div>
        <img
          class="w-[30rem] h-[33.9rem] pc:block mob:hidden"
          src="../../assets/images/about-life-CJKLpoao.png"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script >
export default {
  props: {
    language: {
      type: String,
      default: "繁體中文"
    }
  },
  data() {
    return {};
  },
  watch: {
    language(newVal, oldVal) {
      console.log("language changed:", newVal);
      // 这里写你语言变化后的逻辑
    }
  },
  mounted() {
    console.log("mounted language:", this.language);
  }
};
</script>

<style lang="scss" scoped >
@import "./about.scss";

.header-inner {
}
</style>