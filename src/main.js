import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import fullscreen from 'vue-fullscreen'
import LiquorTree from 'liquor-tree'
import TreeTable from 'tree-table-vue'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import GAuth from 'vue-google-oauth2'
import VCalendar from 'v-calendar'
import VJstree from 'vue-jstree'
import ElementUI from 'element-ui'

// adminify scripts
import './libs/adminifyScripts'
import './libs'
import './permission' // permission control
import BaseLayout from './layouts/BaseLayout'
import i18n from './lang' // i18n
import GlobalComponents from './globalComponents' //global components
import Date from './libs/date'

Vue.component('base-layout', BaseLayout)
Vue.use(BootstrapVue)
Vue.use(VueBreadcrumbs)
Vue.use(fullscreen)
Vue.use(GlobalComponents)
Vue.use(LiquorTree)
Vue.use(TreeTable)
Vue.use(Notifications, { velocity })
Vue.use(Date)
Vue.use(VCalendar)
Vue.use(VJstree)
Vue.use(ElementUI)

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'email',
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
