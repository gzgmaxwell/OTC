<template>
  <div>
    <img
      data-v-207a772c
      src="data:image/png;base64,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"
      class="fixed right-8 top-[85%] z-10 cursor-pointer w-[3rem] h-[3rem]"
    />
    <div data-v-207a772c class="w-full bg-white-box py-[3.75em]">
      <div
        data-v-207a772c
        class="pc:w-[40.5rem] mx-auto flex flex-col pc:gap-[1.8rem] mob:gap-[0.8rem] items-center mob:px-[0.8rem]"
      >
        <img
          data-v-207a772c
          class="pc:w-[6.4rem] pc:h-[6.4rem] mob:w-[3rem] mob:min-h-[3rem] sm:w-[3.5rem] sm:h-[3.5rem]"
          src="../../assets/images/logo-CtPFg1YT.png"
          alt
        />
        <div
          data-v-207a772c
          class="pc:text-[2.8rem] font-[600] pc:leading-[3.9rem] mob:text-[1.35rem] mob:leading-[1.8rem] text-[#091133] text-center"
        >{{$t('title')}}</div>
        <div
          data-v-207a772c
          class="pc:text-[1.2rem] font-[400] pc:leading-[1.8rem] mob:text-[0.7rem] mob:leading-[1.05rem] text-[#6F7CAA] text-center"
        >{{$t('desc')}}</div>
      </div>
      <div data-v-207a772c class="w-full pc:px-[12.25rem] pc:pt-[2.8rem]">
        <div data-v-207a772c class="w-full grid grid-cols-5 pc:gap-[1rem] mob:gap-[0.5rem]">
          <div data-v-207a772c class="w-full pc:pb-[7.8rem] mob:pb-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/1-zh-phone.png"
              alt
              v-if="language==='繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/1-en-phone.png"
              alt
              v-if="language==='English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/1-vi-phone.png"
              alt
              v-if="language==='Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/1-pt-phone.png"
              alt
              v-if="language==='Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pc:pt-[7.8rem] mob:pt-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/2-zh-phone.png"
              alt
              v-if="language==='繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/2-en-phone.png"
              alt
              v-if="language==='English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/2-vi-phone.png"
              alt
              v-if="language==='Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/2-pt-phone.png"
              alt
              v-if="language==='Português'"
            />
          </div>
          <div data-v-207a772c class="w-full py-[3.9rem] mob:py-[1.175rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/3-zh-phone.png"
              alt
              v-if="language==='繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/3-en-phone.png"
              alt
              v-if="language==='English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/3-vi-phone.png"
              alt
              v-if="language==='Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/3-pt-phone.png"
              alt
              v-if="language==='Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pc:pt-[7.8rem] mob:pt-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/4-zh-phone.png"
              alt
              v-if="language==='繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/4-en-phone.png"
              alt
              v-if="language==='English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/4-vi-phone.png"
              alt
              v-if="language==='Tiếng Việt'"
            />

            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/4-pt-phone.png"
              alt
              v-if="language==='Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pb-[7.8rem] mob:pb-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/5-zh-phone.png"
              alt
              v-if="language==='繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/5-en-phone.png"
              alt
              v-if="language==='English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/5-vi-phone.png"
              alt
              v-if="language==='Tiếng Việt'"
            />

            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/5-pt-phone.png"
              alt
              v-if="language==='Português'"
            />
          </div>
        </div>
      </div>
    </div>
    <div data-v-207a772c class="w-full bg-blue-box flex flex-col">
      <!---->
      <div
        data-v-207a772c
        class="min-h-[17rem] pc:my-[4.6rem] pc:w-[66rem] mx-auto mob:py-[1.6rem] mob:px-[0.8rem] grid grid-cols-1 pc:gap-[0.8rem] mob:gap-[1.6rem]"
      >
        <div
          data-v-207a772c
          class="p-[1.6rem] flex flex-col items-center gap-[3.6rem] border-x-[0.05rem] border-[#2C95FF]"
        >
          <div data-v-207a772c class="w-full flex flex-col gap-[0.8rem] items-center">
            <img
              data-v-207a772c
              class="w-[3rem] h-[3rem]"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA8CAYAAADVPrJMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANtSURBVHgB7Zuvd9swEMfPeSUNbAbTwQ4ucBlcB1eawZVutHSwf0NHM7jSBK6DDW1hQxuasTkwu68j+dmOLVu27MhyP+/dc59/NP7qrPNZOnlUI9vtdsibU2EnbK/Zjtn6kdN8trXYrtieYZ7nragmPDIMCz3jzZhtRHFxuqAhntgeuQEeyCBGRLNQiPvAdk7VhGaBBrhnW3ADrKkilUQ3IDaNO1gV8aVFs2CIvaDmxEaB4BkLX1AJtEWz2AFvvrC9ocODR36u63Ut0SJIXbINyB4g+EYn2hcWzYIRkS/JXn6x8D9FTiwkmgV/ol3/tR3083neSb28E1okGFyIAKvkSHWQ/wESjDKCZXZlArwdhhrnf+b73qgie6boSJTWBdF0RgYRjf9V45IJX7PMiuoqT19RuXfwfdYBcfOTlEO/afdkjPlGfyYPIg3la3G8qMdx31d8zTVf6ycPHmXcHPpxqddSzjsTHxOzjP0btkfFtf9ID9w/dNwmD+yJFo91LYFLNIgqi6qcVyc4Zz0P/LvL6M606K3Td9rAngNjokUCckpucSYyyZCkp8fkJjFvh6JFa9jwEVEHMW9HPf2e3GYk/4iKfktuMxaDHjvRwvWHGAxokjCdlZ4eUTcIdErROgl9mwmCmRTtatROEqTWPe7PriUjKvpIs+HpY+oWQ4i2aZCvCfpdFD3IHSNzkRfRXQGiTY9W2M4aojfULQLRz9Qt/J4YrPOpI2CiTwayv9QNglFRKfqJukHQlaVoo4UsFhPolKIxZeJ6v/bloH8gWsz3lKrfaBHh09xL2+kooVND0cL1S3KTZXQ+K5l7G51XtojY9HFMtKPeXiWrEtK+slzz9k1yx55o4e1CpUlpyFkES0gtrMv6noa3y35yviPDiEKBV6THOqv2xcv5oe9Uvu7E1Hc6fh8zEzpjecg7rrNKQZTFcy2oEszih6pGXDlcJKLeLbWLeV5RfO4YGf8D1Ffnlh5aQqEaNp2CWBSyT8hepkXrv3VLnzG7+Y3sK32eJsumVJQtckfhig1FORA6rbXIPYqI7BB/CK/jlTQX8UabqgtXIPgj7RavNAHEIlu8S6v5LIqpJUoQj+okeL8OzxsRK6ljMRqyJxhKHao0AMThfbvQCVJFMC46SmLZIQwp5QntLzvELAtGKtfUwLLD/w9uEf250ikQAAAAAElFTkSuQmCC"
              alt
            />
            <div data-v-207a772c class="flex flex-col gap-[0.4rem] items-center">
              <span
                data-v-207a772c
                class="text-[1.3rem] font-[700] leading-[2.1rem] text-[#B0D7FF] text-center pc:h-[70px]"
              >{{$t('phoneDown')}}</span>
              <span
                data-v-207a772c
                class="text-[0.7rem] font-[300] leading-[1.1rem] text-[#B0D7FF] text-center"
              >{{$t('pdDesc')}}</span>
            </div>
          </div>
          <div
            data-v-207a772c
            class="py-[0.9rem] px-[1.8rem] h-[2.8rem] flex items-center justify-center rounded-[2.2rem] bg-[#ffffff] hover:bg-[#FFFFFF99] cursor-pointer"
            @click="downLoadBtn"
          >
            <a
             
             
              class="text-[0.9rem] font-[700] leading-[0.9rem] text-[#178AFF] text-center"
            >{{$t('imPhoneDown')}}</a>
          </div>
        </div>
      </div>
      <div data-v-207a772c class="w-full pc:px-[9.1rem] mob:px-[0px] mob:mt-[0.8rem]">
        <img
          data-v-207a772c
          class="w-full pc:h-auto mob:h-auto"
          src="../../assets/images/zh/zh-laptop.png"
          alt
          v-if="language==='繁體中文'"
        />
        <img
          data-v-207a772c
          class="w-full pc:h-auto mob:h-auto"
          src="../../assets/images/en/en-laptop.png"
          alt
          v-if="language==='English'"
        />
        <img
          data-v-207a772c
          class="w-full pc:h-auto mob:h-auto"
          src="../../assets/images/tv/vi-laptop.png"
          alt
          v-if="language==='Tiếng Việt'"
        />
        <img
          data-v-207a772c
          class="w-full pc:h-auto mob:h-auto"
          src="../../assets/images/ph/pt-laptop.png"
          alt
          v-if="language==='Português'"
        />
      </div>
    </div>
    <div
      data-v-207a772c
      class="w-full bg-[#F5F5F7] flex flex-col items-center pc:gap-[3.6rem] pc:py-[3.6rem] mob:py-[3.2rem] mob:gap-[3.2rem]"
    >
      <!---->
      <div data-v-207a772c class="w-full flex flex-col items-center gap-[2rem]">
        <div
          data-v-207a772c
          class="w-full pc:w-[51rem] mx-auto mob:px-[0.55rem] text-center flex flex-col items-center gap-[0.7rem]"
        >
          <!---->
          <div
            data-v-207a772c
            class="pc:text-[2.4rem] font-[700] pc:leading-[2.95rem] mob:text-[1.3rem] mob:leading-[1.6rem] text-[#141516]"
          >{{$t('titleSecond')}}</div>
          <div
            data-v-207a772c
            class="text-[0.8rem] font-[400] leading-[1.2rem] text-[#141516]"
          >{{$t('descSecond')}}</div>
        </div>
        <div
          data-v-207a772c
          class="w-full pc:w-[61rem] mx-auto mob:px-[1rem] grid pc:grid-cols-3 mob:grid-cols-1 pc:gap-[8rem] mob:gap-[1.2rem]"
        >
          <div
            data-v-207a772c
            class="w-full flex flex-col pc:items-center gap-[0.7rem] mob:bg-white mob:rounded-lg mob:p-4 mob:shadow-sm"
          >
            <div data-v-207a772c class="flex pc:flex-row items-center justify-center gap-[0.4rem]">
              <img
                data-v-207a772c
                class="w-[1rem] h-[1rem]"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF1SURBVHgBrZRRUsIwEIb/REYf7Q3sEbiBeAO8gT44I32CEwgnAF+QN+sJwBMgJ1BPQI9QH3Ec1j9J0dahTUF2Zidpsvtl50+6QB3rSoBbCeuEam/EjTTxiSUU5nWgqnLXADReOQvstyChX2CiEuxcoYPNM1iaHR/6KtUeWIg1rjl+0BP6wAfVXthExT97Y9X3QXUpTNArwGpC9R+8g5mEBzVCmeWhGtP8VqMQKLi3YxUsD+1Iir0skoS+rBPqf9g72sGBDeoQczylbpf4j3Vkykt6NxWecdKyDWBfM09Hoc1ZS3OygPm9VoRWW/mN6ix3jVjjGJsnMiytUtBlUm/rnsu5yw58cYuR9OlCHYbY1Yx2JtcwkG9fkZg21aTHLH1Q1aKsOd0erf6C2eZSVaH0lQ1oZysxA5/xxS5zlNPP6XVON3EBY55wQklGKi0Cfyu9gtMkRLUtCBuxsll+sbxjR2z9wmqU7TxBFp3arq0o/li9bUv7BtE4imuVilL4AAAAAElFTkSuQmCC"
                alt
              />
              <span
                data-v-207a772c
                class="w-full text-[0.9rem] mob:text-[1rem] font-[700] leading-[1.1rem] text-[#141516]"
              >{{$t('powerfulRead')}}</span>
            </div>
            <div
              data-v-207a772c
              class="text-[0.8rem] mob:text-[0.9rem] font-[400] leading-[1.2rem] text-[#141516] pc:text-center"
            >{{$t('prDesc')}}</div>
          </div>
          <div
            data-v-207a772c
            class="flex flex-col pc:items-center gap-[0.7rem] mob:bg-white mob:rounded-lg mob:p-4 mob:shadow-sm"
          >
            <div
              data-v-207a772c
              class="flex pc:flex-row items-center pc:justify-center gap-[0.4rem]"
            >
              <img
                data-v-207a772c
                class="w-[1.2rem] h-[1.2rem]"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI4SURBVHgB7VXbTRtBFD2zSUg+3UG2A5wKMB2QCnA+kLC/kgpsVwCWothKPlgqCKkAu4JsB3E64AcJIbHDuXeGx65ndheQkJA40vWM7Zl75r6BV7x0GDwUX20H50jxBh39/gE5Ds1Z2+vtCfdtj6dHlN7afxYrSsbdMeZmhScR7tuUp47uES0pOeXGqi5lk5Iq8RWm+GkOH0e4Z7t4h1PuxH1TbGAcdd/Q9vk5UuKC5+Zm8jBCsSzBX90X+EYFGZrg7vyGWB0hTaKXE2+ZxaQVmUDit4Ft7la8P9a4tyJ07kkpGWaVeIgSsSQGcXmBL7o36uIWhBa7uhZYj4NYnuAfSUeIYW4W1LHQRKs8LkzoMnJZm+LisoEV4n5Ex7Ffd8rXqhjart/liENKY0JlHWo48sRp6URBCx3hZj1h4TvIXZ2F8cOMefaTPswgVTfv3T42igSPhWsIB3CFL5jil8mbrr0N/Lby68f4NbrJ1ah4Y6nx/M5EKSP16//7P65b6BJFDu1oow5D6vOM8pmu7QXIJHZ9z7CoJ3TIVOlFOcM8ppCEec/4zcxJ8LZz95b21spjwq1NLLtkEggkMRomwBoGNqPmXW0AlS4VtlC6hdWi72hvrOssVUhDEDKxLtAS41nqWpqQdqngtJFUvDKwB5pAbj5uh441z8OhHQO+J1qcUP5w5uWc+Dd1KjUosZZ26LK2YMJEwtBu4ruxk3G3VXPKhWEWH77tCcvEPYib7W1HEmvzYGm84jlwDdEdutLNfUXBAAAAAElFTkSuQmCC"
                alt
              />
              <span
                data-v-207a772c
                class="text-[0.9rem] mob:text-[1rem] font-[700] leading-[1.1rem] text-[#141516]"
              >{{$t('voiceChat')}}</span>
            </div>
            <div
              data-v-207a772c
              class="text-[0.8rem] mob:text-[0.9rem] font-[400] leading-[1.2rem] text-[#141516] pc:text-center"
            >{{$t('vcDesc')}}</div>
          </div>
          <div
            data-v-207a772c
            class="flex flex-col pc:items-center gap-[0.7rem] mob:bg-white mob:rounded-lg mob:p-4 mob:shadow-sm"
          >
            <div
              data-v-207a772c
              class="flex pc:flex-row items-center pc:justify-center gap-[0.4rem]"
            >
              <img
                data-v-207a772c
                class="w-[1.2rem] h-[1.2rem]"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJOSURBVHgB7VZdThpRFP7ORPvSF5YwS2AHxRXUrgBe2mDTRLoCYAVq0lCTPgg7qCsQV+C4A5bAi4kSM9fzc+/M3IHgKPGNL5kBLofzfed3APbY40Px3bWxKwauhb5L68fJRuMT18Uh7vh1gF2wwg2IrxrxOqkYEKZwWPD1H7sgxwX7En9X20kTVgYsmfAIl7TQs5+up6lqAilL33X0/SVN+T5m0g5+lFmLScU5WJljw0B44s74foUndNAEhxip8EA8oRHfMxxgGITXIz3VtP6l80IEQRRe8FmzVOdqv9CUhuzk+M33FgvvxaRW7DYbzysuhiriE6tvCsmQYxKp5QoDfzaHlAz4GpMmPn0JZl6EfE4hUZ7TEm+BZUV+0y3OHK5ZSDsmhR1w7jN99QZ4jiKHF5Ry6u/4cr7mmzBT0WUDil+d26SixL4MUZFGCfyjbM0dabrb/v2gaJoqpCyCB++HsPRBpZuXQ1VEk1E5wJtQkgYlcTpKpbGgEdvfw+o2xh9tlDosE599xPB+nrCsajSSRzWes+OMHcvcHRffBdgMb9/NhC/6u7IJzZ7LVUaa+4ZJlMTa3OnZaeNtFBCWjKzBEiLi1iiq6o2kW5DIZpKOW+EMTWHzbvNtazCIaLGIaUwqIG3zVm2oRW2vuju3wnZ3yqP2rXIaiYhJJzQtUhoeRxMSsjFbZmiGGdseFaPWd0OEfV7EVoeQJfwsdbUnzXsgz2PS0tyy+E44Xp9TIcn97uRVgfdC+kIIJa25LfrXIVtm178sv9zxpr8re3woXgAIft0DAuhlWQAAAABJRU5ErkJggg=="
                alt
              />
              <span
                data-v-207a772c
                class="text-[0.9rem] mob:text-[1rem] font-[700] leading-[1.1rem] text-[#141516]"
              >{{$t('richChannels')}}</span>
            </div>
            <div
              data-v-207a772c
              class="text-[0.8rem] mob:text-[0.9rem] font-[400] leading-[1.2rem] text-[#141516] pc:text-center"
            >{{$t('rcDesc')}}</div>
          </div>
        </div>
      </div>
      <div data-v-207a772c class="w-full px-[8rem]">
        <img
          data-v-207a772c
          class="w-full h-auto rounded-[1.6rem]"
          src="../../assets/images/zh/zh-life.jpg"
          alt
          v-if="language==='繁體中文'"
        />
        <img
          data-v-207a772c
          class="w-full h-auto rounded-[1.6rem]"
          src="../../assets/images/zh/zh-life.jpg"
          alt
          v-if="language==='English'"
        />
        <img
          data-v-207a772c
          class="w-full h-auto rounded-[1.6rem]"
          src="../../assets/images/zh/zh-life.jpg"
          alt
          v-if="language==='Tiếng Việt'"
        />
        <img
          data-v-207a772c
          class="w-full h-auto rounded-[1.6rem]"
          src="../../assets/images/zh/zh-life.jpg"
          alt
          v-if="language==='Português'"
        />
      </div>
    </div>
    <div
      data-v-207a772c
      class="w-full bg-[#ffffff] pc:w-[57.5rem] mx-auto mob:px-[0.8rem] pc:py-[0rem] mob:py-[2rem] flex pc:flex-row mob:flex-col justify-between items-center pc:gap-[4rem] mob:gap-[2rem]"
    >
      <!---->
      <div
        data-v-207a772c
        class="pc:w-2/5 mob:w-full flex flex-col pc:items-start mob:items-center gap-[2rem]"
      >
        <div
          data-v-207a772c
          class="pc:text-[2.4rem] font-[700] pc:leading-[3.6rem] mob:text-[1.3rem] mob:leading-[1.95rem] text-[#141516] pc:text-left mob:text-center break-words"
        >{{$t('encryptionPrivacy')}}</div>
        <div
          data-v-207a772c
          class="text-[0.8rem] font-[400] pc:leading-[1.3rem] mob:leading-[1.2rem] text-[#141516] pc:text-left mob:text-center break-words"
        >{{$t('epDesc')}}</div>
      </div>
      <div data-v-207a772c class="slide-left pc:w-3/5 mob:w-full">
        <img
          data-v-207a772c
          class="w-auto h-auto mob:mx-auto object-cover"
          src="../../assets/images/zh/zh-privacidade.png"
          alt
          v-if="language==='繁體中文'"
        />
        <img
          data-v-207a772c
          class="w-auto h-auto mob:mx-auto object-cover"
          src="../../assets/images/en/en-privacidade.png"
          alt
          v-if="language==='English'"
        />
        <img
          data-v-207a772c
          class="w-auto h-auto mob:mx-auto object-cover"
          src="../../assets/images/tv/vi-privacidade.png"
          alt
          v-if="language==='Tiếng Việt'"
        />
        <img
          data-v-207a772c
          class="w-auto h-auto mob:mx-auto object-cover"
          src="../../assets/images/ph/pt-privacidade.png"
          alt
          v-if="language==='Português'"
        />
      </div>
    </div>
    <div data-v-207a772c class="bg-[#F8F8FA]">
      <div
        data-v-207a772c
        class="w-full pc:min-h-auto pc:w-[61rem] mx-auto mob:px-[0.8rem] pc:pt-[4.5rem] pc:py-[0rem] mob:py-[2.4rem] flex pc:flex-row mob:flex-col justify-between items-center pc:gap-[3.2rem] mob:gap-[2.4rem]"
      >
        <!---->
        <div data-v-207a772c class="slide-right pc:w-3/5">
          <img
            data-v-207a772c
            class="w-auto h-auto object-cover"
            src="../../assets/images/zh/zh-media.png"
            alt
            v-if="language==='繁體中文'"
          />
          <img
            data-v-207a772c
            class="w-auto h-auto object-cover"
            src="../../assets/images/en/en-media.png"
            alt
            v-if="language==='English'"
          />
          <img
            data-v-207a772c
            class="w-auto h-auto object-cover"
            src="../../assets/images/tv/vi-media.png"
            alt
            v-if="language==='Tiếng Việt'"
          />
          <img
            data-v-207a772c
            class="w-auto h-auto object-cover"
            src="../../assets/images/ph/pt-media.png"
            alt
            v-if="language==='Português'"
          />
        </div>
        <div
          data-v-207a772c
          class="pc:w-2/5 mob:w-full flex flex-col pc:items-start mob:items-center gap-[1.1rem]"
        >
          <div
            data-v-207a772c
            class="pc:text-[2.4rem] font-[700] pc:leading-[2.8rem] mob:text-[1.3rem] mob:leading-[1.95rem] text-[#1B1C20] text-left"
          >{{$t('multimediaSupport')}}</div>
          <div
            data-v-207a772c
            class="text-[0.8rem] font-[400] pc:leading-[1.3rem] mob:leading-[1.2rem] text-[#141516] text-left"
          >{{$t('msDesc')}}</div>
        </div>
        <!---->
      </div>
    </div>
    <div
      data-v-207a772c
      class="w-full pc:min-h-auto mob:py-[2rem] mob:px-[0.8rem] bg-[#178AFF] relative"
    >
      <!---->
      <img
        data-v-207a772c
        class="w-[28.8rem] h-[18.65rem] absolute left-[0px] top-[0px]"
        src="../../assets/images/shapes-BCLroMYv.png"
        alt
      />
      <div
        data-v-207a772c
        class="w-full flex pc:pt-[6rem] pc:w-[56rem] mx-auto pc:flex-row mob:flex-col justify-center items-center pc:gap-[3.2rem] mob:gap-[2.4rem]"
      >
        <div data-v-207a772c class="pc:w-1/2">
          <div
            data-v-207a772c
            class="w-full flex flex-col pc:items-start mob:items-center gap-[2rem]"
          >
            <div
              data-v-207a772c
              class="pc:text-[2.4rem] font-[700] pc:leading-[2.8rem] mob:text-[1.3rem] mob:leading-[1.95rem] text-[#ffffff] text-left"
            >{{$t('freeCommunication')}}</div>
            <div
              data-v-207a772c
              class="text-[0.8rem] font-[400] pc:leading-[1.3rem] mob:leading-[1.2rem] text-[#ffffff] text-left"
            >{{$t('fcDesc')}}</div>
          </div>
        </div>
        <div data-v-207a772c class="slide-left pc:w-1/2">
          <img
            data-v-207a772c
            class="pc:w-auto mob:w-full h-auto"
            src="../../assets/images/zh/zh-free.png"
            alt
            v-if="language==='繁體中文'"
          />
          <img
            data-v-207a772c
            class="pc:w-auto mob:w-full h-auto"
            src="../../assets/images/en/en-free.png"
            alt
            v-if="language==='English'"
          />
          <img
            data-v-207a772c
            class="pc:w-auto mob:w-full h-auto"
            src="../../assets/images/tv/vi-free.png"
            alt
            v-if="language==='Tiếng Việt'"
          />
          <img
            data-v-207a772c
            class="pc:w-auto mob:w-full h-auto"
            src="../../assets/images/ph/pt-free.png"
            alt
            v-if="language==='Português'"
          />
        </div>
      </div>
    </div>
    <div data-v-207a772c class="w-full pc:pt-[6rem] mob:pt-[2rem] bg-[#ffffff]">
      <!---->
      <div
        data-v-207a772c
        class="w-full pc:px-[8rem] mob:px-[0.8rem] flex flex-col pc:gap-[6rem] mob:gap-[3.2rem]"
      >
        <div
          data-v-207a772c
          class="w-full flex pc:px-[5rem] mob:px-[0rem] pc:flex-row mob:flex-col justify-center items-center pc:gap-[11.7rem] mob:gap-[3.2rem]"
        >
          <div data-v-207a772c class="pc:w-1/2 mob:w-full flex flex-col items-center gap-[1.6rem]">
            <div
              data-v-207a772c
              class="pc:w-full mob:w-full pc:py-[1.65rem] pc:px-[2.45rem] mob:p-[0.8rem] rounded-[0.8rem] bg-[#EEF3F8] relative"
            >
              <span
                data-v-207a772c
                class="text-[0.9rem] font-[400] pc:leading-[1.3rem] mob:leading-[1.4rem] text-[#383A47] text-left"
              >{{$t('oneStu')}}</span>
              <div
                data-v-207a772c
                class="absolute left-[calc(50%-1.35rem)] bottom-[-2.6rem]"
                style="width: 0px; height: 0px; border-style: solid; border-width: 1.35rem; border-color: rgb(238, 243, 248) transparent transparent;"
              ></div>
            </div>
            <div
              data-v-207a772c
              class="pc:w-[12.3rem] mob:w-full flex justify-center items-center gap-[0.9rem]"
            >
              <img
                data-v-207a772c
                class="w-[3.1rem] h-[3.1rem]"
                src="../../assets/images/photo1-Cporbk88.png"
                alt
              />
              <div data-v-207a772c class="flex flex-col items-start">
                <span
                  data-v-207a772c
                  class="text-[0.9rem] font-[400] leading-[1.5rem] text-[#1B1C20]"
                >Alex De</span>
                <span
                  data-v-207a772c
                  class="text-[0.7rem] font-[400] leading-[1.2rem] text-[#1B1C20]"
                >{{$t('stu')}}</span>
              </div>
            </div>
          </div>
          <div data-v-207a772c class="pc:w-1/2 mob:w-full flex flex-col items-center gap-[1.6rem]">
            <div
              data-v-207a772c
              class="pc:w-full pc:py-[1.65rem] pc:px-[2.45rem] mob:p-[0.8rem] rounded-[0.8rem] bg-[#EEF3F8] relative"
            >
              <span
                data-v-207a772c
                class="text-[0.9rem] font-[400] leading-[1.3rem] text-[#383A47] text-left"
              >{{$t('scDesc')}}</span>
              <div
                data-v-207a772c
                class="absolute left-[calc(50%-1.35rem)] bottom-[-2.6rem]"
                style="width: 0px; height: 0px; border-style: solid; border-width: 1.35rem; border-color: rgb(238, 243, 248) transparent transparent;"
              ></div>
            </div>
            <div
              data-v-207a772c
              class="pc:w-[12.3rem] mob:w-full flex justify-center items-center gap-[0.9rem]"
            >
              <img
                data-v-207a772c
                class="w-[3.1rem] h-[3.1rem]"
                src="../../assets/images/photo2-BZQ4YrtX.png"
                alt
              />
              <div data-v-207a772c class="flex flex-col items-start">
                <span
                  data-v-207a772c
                  class="text-[0.9rem] font-[400] leading-[1.5rem] text-[#1B1C20]"
                >Jenny Li</span>
                <span
                  data-v-207a772c
                  class="text-[0.7rem] font-[400] leading-[1.2rem] text-[#1B1C20]"
                >{{$t('salesCompany')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          data-v-207a772c
          class="w-full rounded-[1.6rem] flex pc:flex-row mob:flex-col items-center justify-between"
          style="background: linear-gradient(0deg, rgb(31, 31, 31), rgb(31, 31, 31)), linear-gradient(0deg, rgb(37, 40, 46), rgb(37, 40, 46));"
        >
          <div
            data-v-207a772c
            class="pc:w-1/2 mob:w-full pc:mx-[4rem] pc:py-[2.6rem] mob:px-[0.8rem] mob:py-[1.6rem] flex flex-col items-start gap-[1.6rem]"
          >
            <img
              data-v-207a772c
              class="w-[6.4rem] h-[6.4rem]"
              src="../../assets/images/logo-CtPFg1YT.png"
              alt
            />
            <div
              data-v-207a772c
              class="pc:text-[1.6rem] font-[700] pc:leading-[1.85rem] mob:text-[1.3rem] mob:leading-[1.5rem] text-[#ffffff] text-left"
            >{{$t('footTitle')}}</div>
            <div
              data-v-207a772c
              class="text-[0.8rem] leading-[0.9rem] text-[#ffffff] text-left"
            >{{$t('footDesc')}}</div>
            <div
              data-v-207a772c
              class="py-[0.9rem] px-[1.8rem] h-[2.8rem] flex items-center justify-center rounded-[2.2rem] bg-[#178AFF] hover:bg-[#178AFF99] cursor-pointer"
              @click="aboutBtn"
            >
              <span
                data-v-207a772c
                class="text-[0.9rem] font-[500] leading-[0.9rem] text-[#ffffff] text-center"
              >{{$t('aboutUs')}}</span>
            </div>
          </div>
          <!-- <div data-v-207a772c=""><img data-v-207a772c="" class="w-full h-full" src="/assets/union-CNH6Sd_k.png" alt=""></div> -->
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('codeTitle')"
      :visible.sync="showQrcodeDialog"
      width="400px"
      center
      class="qrcode-dialog"
    >
      <div class="qrcode-container">
        <!-- 这里使用一个示例二维码图片，实际项目中应替换为真实二维码 -->
        <img src="../../assets/images/code.png" class="qrcode-image" />
      </div>
      <p class="download-tip">{{$t('codeTip')}}</p>
      <div style="display: flex; justify-content: space-around;">
        <el-button @click="showQrcodeDialog = false" style="padding: 8px 16px;">{{$t('close')}}</el-button>
        <!-- <el-button type="primary" @click="downloadFile" style="padding: 8px 16px;">{{$t('downLoadIndex')}}</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
  
  <script >
import axios from "axios";
export default {
  props: {
    language: {
      type: String,
      default: "繁體中文"
    }
  },
  data() {
    return {
      showQrcodeDialog: false,
      imgUrl: ""
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
    aboutBtn() {
      this.$router.push({ name: "about" });
    },
    downLoadBtn() {
      this.showQrcodeDialog = true;
      // this.downloadFile()
    },
    async downloadFile() {
      try {
        // 假设这是一个创建用户的API
        const response = await axios.get(
          "https://www.jingchat.com.cn/jing_chat_api/api/v1/third_party/group_qr_code",
          {
            params: {
              content: "https://apps.apple.com/app/id6453470960",
              width: 300,
              height: 300
            }
          }
        );
        this.imgUrl = response.data;
        console.log("用户创建成功:", response.data);
        // alert('用户创建成功！');

        // // 可以选择更新用户列表或清空表单
        // this.users.push(response.data); // 简单地添加到现有列表
        // this.newUser.name = '';
        // this.newUser.email = '';
      } catch (err) {
        console.error("创建用户失败:", err);
        // alert('创建用户失败: ' + (err.response?.data?.message || err.message || '未知错误'));
      } finally {
        this.creatingUser = false;
      }

      this.loading = false; // 停止加载
      // this.resetForm("deactivateForm"); // 重置表单
    }
  }
};
</script>
  
  <style lang="scss" scoped >
@import "../index.scss";
.app-container {
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.download-title {
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.qrcode-dialog {
  text-align: center;
}

.qrcode-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  padding: 10px;
  background: white;
}

.download-tip {
  margin: 15px 0;
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>