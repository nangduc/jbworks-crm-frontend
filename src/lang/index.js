import Vue from 'vue'
import VueI18n from 'vue-i18n'
import viLocale from './vi/index.js'
import jaLocale from './ja/index.js'

Vue.use(VueI18n)

const messages = {
  vi: {
    ...viLocale
  },
  ja: {
    ...jaLocale
  }
}

const getLanguage = () => {
  const chooseLanguage = JSON.parse(localStorage.getItem('language'))
  if (chooseLanguage) return chooseLanguage.locale

  // const language = (navigator.language || navigator.browserLanguage)
  //   .toLowerCase()
  //   .substring(0, 2)

  // const locales = Object.keys(messages)

  // for (const locale of locales) {
  //   if (language.indexOf(locale) > -1) {
  //     return locale
  //   }
  // }

  return 'ja'
}

const i18n = new VueI18n({
  locale: getLanguage(), // options: vi, ja
  messages
})

export default i18n
