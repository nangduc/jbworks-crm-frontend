import dayjs from 'dayjs'
// import language
require('dayjs/locale/vi')
require('dayjs/locale/ja')

// LocalizedFormat extends dayjs().format API to supply localized format options.
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $dayjs: {
        get: function() {
          return dayjs
        }
      },
      $date: {
        get: function() {
          return dayjs
        }
      }
    })
    Vue.dayjs = dayjs
  }
}
