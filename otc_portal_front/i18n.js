import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './src/locales/en'
import zh from './src/locales/zh'
import tv from './src/locales/tv' //越南
import ph from './src/locales/ph' //菲律宾

Vue.use(VueI18n)

// 定义中英文语言包
const messages = {
  en,
  zh,
  tv,
  ph,
}

// 创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages
})

export default i18n