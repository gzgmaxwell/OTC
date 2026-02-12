<template>
  <div>
    <div style="max-width: 1024px; margin: 0 auto">
      <div data-v-207a772c class="w-full container_banner">
        <div
          data-v-207a772c
          class="pc:w-[40.5rem] mx-auto flex flex-col pc:gap-[1.8rem] mob:gap-[0.8rem] items-center mob:px-[0.8rem]"
        >
          <div
            data-v-207a772c
            class="pc:text-[2.8rem] font-[600] pc:leading-[3.9rem] mob:text-[1.35rem] mob:leading-[1.8rem] text-[#091133] text-center"
          >
            {{ $t("title") }}
          </div>
          <div
            data-v-207a772c
            class="pc:text-[1.2rem] font-[400] pc:leading-[1.8rem] mob:text-[0.7rem] mob:leading-[1.05rem] text-[#6F7CAA] text-center"
          >
            {{ $t("desc") }}
          </div>
        </div>
        <div class="banner">
          <img src="../../assets/img/banner.png" class="w-full pc:h-auto" />
        </div>
        <!-- <div data-v-207a772c class="w-full pc:px-[12.25rem] pc:pt-[2.8rem]">
        <div
          data-v-207a772c
          class="w-full grid grid-cols-5 pc:gap-[1rem] mob:gap-[0.5rem]"
        >
          <div data-v-207a772c class="w-full pc:pb-[7.8rem] mob:pb-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/1-zh-phone.png"
              alt
              v-if="language === '繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/1-en-phone.png"
              alt
              v-if="language === 'English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/1-vi-phone.png"
              alt
              v-if="language === 'Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/1-pt-phone.png"
              alt
              v-if="language === 'Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pc:pt-[7.8rem] mob:pt-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/2-zh-phone.png"
              alt
              v-if="language === '繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/2-en-phone.png"
              alt
              v-if="language === 'English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/2-vi-phone.png"
              alt
              v-if="language === 'Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/2-pt-phone.png"
              alt
              v-if="language === 'Português'"
            />
          </div>
          <div data-v-207a772c class="w-full py-[3.9rem] mob:py-[1.175rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/3-zh-phone.png"
              alt
              v-if="language === '繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/3-en-phone.png"
              alt
              v-if="language === 'English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/3-vi-phone.png"
              alt
              v-if="language === 'Tiếng Việt'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/3-pt-phone.png"
              alt
              v-if="language === 'Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pc:pt-[7.8rem] mob:pt-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/4-zh-phone.png"
              alt
              v-if="language === '繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/4-en-phone.png"
              alt
              v-if="language === 'English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/4-vi-phone.png"
              alt
              v-if="language === 'Tiếng Việt'"
            />

            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/4-pt-phone.png"
              alt
              v-if="language === 'Português'"
            />
          </div>
          <div data-v-207a772c class="w-full pb-[7.8rem] mob:pb-[2.35rem]">
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/zh/5-zh-phone.png"
              alt
              v-if="language === '繁體中文'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/en/5-en-phone.png"
              alt
              v-if="language === 'English'"
            />
            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/tv/5-vi-phone.png"
              alt
              v-if="language === 'Tiếng Việt'"
            />

            <img
              data-v-207a772c
              class="w-full pc:h-auto"
              src="../../assets/images/ph/5-pt-phone.png"
              alt
              v-if="language === 'Português'"
            />
          </div>
        </div>
      </div> -->
      </div>
      <div class="container_btn">
        <div class="container">
          <div class="flex-container">
            <button class="btn btn-download" @click="downLoadBtn">
              APP下载
            </button>
            <button class="btn btn-login" @click="funLink">网页版登录</button>
          </div>
        </div>
      </div>

      <div class="container_card">
        <div class="outer-frame">
          <div class="features-container">
            <!-- 简单 -->
            <div class="feature-box">
              <div class="feature-icon">
                <img src="../../assets/img/smile.png" class="cardIcon" />
              </div>
              <h3 class="feature-title">简单</h3>
              <p class="feature-description">
                遵从<span class="highlight">"极致简单"</span
                >的产品设计理念，小白用户也能快速上手！
              </p>
            </div>

            <!-- 安全 -->
            <div class="feature-box">
              <div class="feature-icon">
                <img src="../../assets/img/safety.png" class="cardIcon" />
              </div>
              <h3 class="feature-title">安全</h3>
              <p class="feature-description">
                多重保护技术保障您的数字资产安全，放心管理您的钱包
              </p>
            </div>

            <!-- 省心 -->
            <div class="feature-box">
              <div class="feature-icon">
                <img src="../../assets/img/shengxin.png" class="cardIcon" />
              </div>
              <h3 class="feature-title">省心</h3>
              <p class="feature-description">
                严格的风控和<span class="highlight">24小时人工服务</span
                >，为您打造无忧OTC交易环境
              </p>
            </div>

            <!-- 安全（重复） -->
            <div class="feature-box">
              <div class="feature-icon">
                <img src="../../assets/img/safe.png" class="cardIcon" />
              </div>
              <h3 class="feature-title">安全</h3>
              <p class="feature-description">
                多重保护技术保障您的数字资产安全，放心管理您的钱包
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container_gu">
        <header>
          <h1>关于GU币(888币)</h1>
          <p class="subtitle">
            使用888管理、世界通用的、恒定人民币汇率数字资产
          </p>
        </header>

        <main>
          <div class="cards-container">
            <!-- 卡片1 -->
            <div class="card">
              <div class="icon-container">
                <img src="../../assets/img/cheng.png" class="guIcon" />
              </div>
              <div class="content">
                <h2 class="card-title">恒定1:1人民币汇率</h2>
                <p class="card-text">
                  与其他数字货币不同，888币承诺永久无涨跌、也不加入任何第三方交易所。无论何时，都可以1:1在人民币和888币之间自由兑换。
                </p>
              </div>
            </div>

            <!-- 卡片2 -->
            <div class="card">
              <div class="icon-container">
                <img src="../../assets/img/dunpai.png" class="guIcon" />
              </div>
              <div class="content">
                <h2 class="card-title">稳定、安全、100%兑换</h2>
                <p class="card-text">
                  全球数十万人使用，秒级交易匹配。888官方联合全球多个跨国集团共同保底，无需担心持有的888币无法兑换。
                </p>
              </div>
            </div>

            <!-- 卡片3 -->
            <div class="card">
              <div class="icon-container">
                <img src="../../assets/img/global.png" class="guIcon" />
              </div>
              <div class="content">
                <h2 class="card-title">全球通用、自由度</h2>
                <p class="card-text">
                  888币使用区块链技术具有高度匿名的特性，交易无迹可寻。世界范围内已有上千家大型商户支持888币，全球支付无障碍。
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div class="container_erweima">
        <div class="container">
          <h1 class="title">安全交易，自由支付</h1>
          <p class="subtitle">请使用手机扫码下方二维码开始下载APP</p>

          <div class="qrcode-container">
            <img src="../../assets/img/www.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="container_footer">
      <div class="container">
        <!-- 主标题区域 -->
        <div class="main-title">
          <div class="title-888">
            <img src="../../assets/img/888.png" class="linkIcon" width="109" />
          </div>
          <div class="subtitle">
            使用808管理、世界通用的、恒定人民币汇率数字资产
          </div>
        </div>

        <!-- 联系我们区域 -->
        <div class="contact-section">
          <h2 class="section-title">联系我们</h2>
          <div class="email-container">
            <div class="email-icon">
              <img src="../../assets/img/email.png" width="14px" />
            </div>
            <div class="email-address">service@888pay.com</div>
          </div>
          <div class="social-icons">
            <div class="social-icon">
              <img src="../../assets/img/facebook.png" class="linkIcon" />
            </div>
            <div class="social-icon">
              <img src="../../assets/img/f.png" width="14" />
            </div>
            <div class="social-icon">
              <img src="../../assets/img/youtube.png" class="linkIcon" />
            </div>
            <div class="social-icon">
              <img src="../../assets/img/scile.png" class="linkIcon" />
            </div>
            <div class="social-icon">
              <img src="../../assets/img/in.png" class="linkIcon" />
            </div>
          </div>
        </div>

        <!-- 底部区域 -->
        <div class="bottom-section">
          <div class="terms-section">
            <div class="terms-title">服务条款</div>
            <div class="terms-links">
              <a href="#" class="term-link">服务条款</a>
              <a href="#" class="term-link">隐私条款</a>
            </div>
          </div>
          <div class="bottom-icons">
            <div class="bottom-icon" title="语言切换">
              <img src="../../assets/img/linkwith.png" width="24" />
            </div>
            <div class="bottom-icon" title="返回顶部">
              <img src="../../assets/img/backtop.png" width="24" />
            </div>
          </div>
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
      <p class="download-tip">{{ $t("codeTip") }}</p>
      <div style="display: flex; justify-content: space-around">
        <el-button
          @click="showQrcodeDialog = false"
          style="padding: 8px 16px"
          >{{ $t("close") }}</el-button
        >
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
      default: "繁體中文",
    },
  },
  data() {
    return {
      showQrcodeDialog: false,
      imgUrl: "",
    };
  },
  watch: {
    language(newVal, oldVal) {
      console.log("language changed:", newVal);
      // 这里写你语言变化后的逻辑
    },
  },
  mounted() {
    console.log("mounted language:", this.language);
  },
  methods: {
    funLink() {
      window.open("https://www.d-xilzd.com/h5/login", "_blank");
    },
    aboutBtn() {
      this.$router.push({ name: "about" });
    },
    device() {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);
      // 使用示例
      if (isIOS) {
        return "IOS";
      } else if (isAndroid) {
        return "Android";
      } else {
        return "PC";
      }
    },
    downLoadBtn() {
      // this.showQrcodeDialog = true;
      if (this.device() === "Android") {
        const url = "https://vip99tf.ekk.ghzyaw.com/eKYUIm";
        window.open(url, "_blank");
      } else if (this.device() === "IOS") {
        const url = "https://vip99tf.ekk.ghzyaw.com/eKYUIm";
        window.open(url, "_blank");
      } else {
        const url = "https://www.d-xilzd.com/h5/login";
        window.open(url, "_blank");
      }
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
              height: 300,
            },
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
    },
  },
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
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  background: white;
}

.download-tip {
  margin: 15px 0;
  color: #666;
  font-size: 14px;
  text-align: center;
}

.container_banner {
  background-image: url("../../assets/img/bg.png");
  background-size: cover;
  margin-top: 50px;
  .banner {
    max-width: 60%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    img {
      margin-top: 50px;
      max-height: 40%;
      height: auto;
      display: block; /* 去掉底部小空隙 */
    }
  }
}

/* 外部灰色圆角矩形框 */
.container_card {
  padding: 20px;
  .outer-frame {
    background-color: #f0f2f5;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    /* 标题样式 */
    .page-title {
      text-align: center;
      color: #1a1a1a;
      font-size: 32px;
      margin-bottom: 40px;
      font-weight: 600;
    }

    /* flex容器 */
    .features-container {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: center;
    }

    /* 每个特性方块 */
    .feature-box {
      flex: 1 1 calc(50% - 30px);
      min-width: 280px;
      max-width: 600px;
      background-color: white;
      border-radius: 16px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-box:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    /* 图标样式 */
    .feature-icon {
      font-size: 48px;
      color: #1890ff;
      margin-bottom: 15px;
    }

    /* 特性标题 */
    .feature-title {
      font-size: 24px;
      color: #1a1a1a;
      font-weight: 600;
      margin-bottom: 15px;
    }

    /* 特性描述 */
    .feature-description {
      font-size: 16px;
      color: #666;
      line-height: 1.6;
    }

    /* 响应式调整 */
    @media (max-width: 768px) {
      .features-container {
        flex-direction: column;
        align-items: center;
      }

      .feature-box {
        flex: 1 1 100%;
        width: 100%;
      }

      .outer-frame {
        padding: 25px;
      }

      .page-title {
        font-size: 26px;
      }
    }
  }
}

.container_gu {
  header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }

  h1 {
    color: #333;
    font-size: 2.2rem;
    margin-bottom: 10px;
  }

  .subtitle {
    color: #666;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  /* 卡片容器 */
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 50px;
    padding: 20px;
  }

  /* 单个卡片 */
  .card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 30px;
    display: flex;
    align-items: flex-start;
    gap: 25px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #d6d6d6;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  /* 图标区域 */
  .icon-container {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border-radius: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    font-size: 32px;
    color: white;
  }

  /* 内容区域 */
  .content {
    flex: 1;
  }

  .card-title {
    color: #1a5fb4;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .card-text {
    color: #333;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 25px 20px;
    }

    .content {
      text-align: center;
    }

    h1 {
      font-size: 1.8rem;
    }

    .card-title {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    body {
      padding: 15px;
    }

    .icon-container {
      width: 60px;
      height: 60px;
    }

    .icon {
      font-size: 28px;
    }
  }
}

.container_erweima {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .subtitle {
    font-size: 16px;
    color: #888888;
    margin-bottom: 40px;
    line-height: 1.5;
  }

  .qrcode-container {
    width: 280px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
  }

  .qrcode {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    /* 创建黑白二维码图案 */
    background-image: linear-gradient(
        90deg,
        transparent 25%,
        #fff 25%,
        #fff 75%,
        transparent 75%
      ),
      linear-gradient(
        180deg,
        transparent 25%,
        #fff 25%,
        #fff 75%,
        transparent 75%
      ),
      linear-gradient(
        90deg,
        transparent 35%,
        #fff 35%,
        #fff 65%,
        transparent 65%
      ),
      linear-gradient(
        180deg,
        transparent 35%,
        #fff 35%,
        #fff 65%,
        transparent 65%
      );
    background-size: 20% 20%, 20% 20%, 10% 10%, 10% 10%;
    background-position: 0 0, 0 0, 50% 50%, 50% 50%;
    background-repeat: repeat, repeat, repeat, repeat;
    position: relative;
  }

  /* 二维码定位点样式 */
  .qrcode::before,
  .qrcode::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    border: 8px solid #000;
  }

  .qrcode::before {
    top: 20px;
    left: 20px;
    background: linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%);
    background-size: 8px 8px;
    background-position: 0 0, 0 52px, 0 0, 52px 0;
    background-repeat: no-repeat;
  }

  .qrcode::after {
    top: 20px;
    right: 20px;
    background: linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%);
    background-size: 8px 8px;
    background-position: 0 0, 0 52px, 0 0, 52px 0;
    background-repeat: no-repeat;
  }

  .qrcode-corner {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 8px solid #000;
    bottom: 20px;
    left: 20px;
    background: linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(90deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%),
      linear-gradient(0deg, #000 50%, #fff 50%);
    background-size: 8px 8px;
    background-position: 0 0, 0 52px, 0 0, 52px 0;
    background-repeat: no-repeat;
  }
}
.container_footer {
  background-color: #0066ff;
  background-size: 400px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    z-index: 1;
    position: relative;
  }

  /* 主标题区域 */
  .main-title {
    text-align: center;
    margin-bottom: 60px;
  }

  .title-888 {
    font-family: "Arial Rounded MT Bold", "Arial", sans-serif;
    font-size: 120px;
    font-weight: 900;
    letter-spacing: 5px;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 15px;
    line-height: 1;
    display: flex;
    justify-content: center;
  }

  .subtitle {
    font-size: 22px;
    max-width: 700px;
    line-height: 1.4;
    opacity: 0.95;
    font-weight: 300;
  }

  /* 联系我们区域 */
  .contact-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
    text-align: center;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .email-container {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .email-icon {
    font-size: 24px;
    margin-right: 12px;
  }

  .email-address {
    font-size: 22px;
    font-weight: 300;
  }

  /* 社交媒体图标 */
  .social-icons {
    display: flex;
    gap: 25px;
    .linkIcon {
      width: 24px;
      height: auto;
    }
  }

  .social-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .social-icon:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }

  /* 底部区域 */
  .bottom-section {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;
  }

  .terms-section {
    display: flex;
    flex-direction: column;
  }

  .terms-title {
    font-size: 20px;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .terms-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .term-link {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
  }

  .term-link:hover {
    color: white;
  }

  .term-link::before {
    content: ">";
    margin-right: 8px;
    font-weight: bold;
  }

  /* 右下角图标 */
  .bottom-icons {
    display: flex;
    gap: 15px;
  }

  .bottom-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .bottom-icon:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .title-888 {
      font-size: 90px;
    }

    .subtitle {
      font-size: 18px;
      padding: 0 20px;
    }

    .section-title {
      font-size: 24px;
    }

    .email-address {
      font-size: 18px;
    }

    .bottom-section {
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    .terms-section {
      align-items: center;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .title-888 {
      font-size: 70px;
    }

    .subtitle {
      font-size: 16px;
    }

    .social-icons {
      gap: 15px;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      font-size: 18px;
    }
  }

  /* 添加一些动画效果 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .main-title,
  .contact-section,
  .bottom-section {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .contact-section {
    animation-delay: 0.2s;
  }

  .bottom-section {
    animation-delay: 0.4s;
  }
}
.container_btn {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  .container {
    align-items: stretch; /* 拉伸子元素以填满容器宽度 */
    gap: 20px; /* 按钮之间的间距 */
  }

  /* 通用按钮样式 */
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 20px;
    border: none;
    outline: none;
    position: relative;
    overflow: hidden;
    width: 230px;
  }

  /* 上方按钮：APP下载 */
  .btn-download {
    background: linear-gradient(135deg, #1a8cff 0%, #0066cc 100%);
    color: white;
    height: 60px;
    font-size: 18px;
    box-shadow: 0 5px 15px rgba(26, 140, 255, 0.3);
  }

  .btn-download:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(26, 140, 255, 0.4);
  }

  .btn-download:active {
    transform: translateY(0);
  }

  .btn-download::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  .btn-download:hover::after {
    left: 100%;
  }

  /* 下方按钮：网页版登录 */
  .btn-login {
    margin-top: 20px;
    background-color: white;
    color: #1a8cff;
    border: 2px solid #b3d9ff;
    height: 52px;
    font-size: 16px;
  }

  .btn-login:hover {
    background-color: #f0f8ff;
    border-color: #80c2ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(179, 217, 255, 0.3);
  }

  .btn-login:active {
    transform: translateY(0);
  }
}

.backTop {
  position: fixed;
  bottom: 40px;
  right: 30px;
  z-index: 99;
  div {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border: 20px;
  }
}
</style>