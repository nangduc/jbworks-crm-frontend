import store from './store'
import router from './router'
import { getToken } from '@/utils/auth'
import NProgress from '@/libs/nprogress'
import Vue from 'vue'
import i18n from '@/lang'

const publicRoutes = ['/login', '/home'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/dashboard' }) // if is logged in, redirect to the dashboard page
      NProgress.done()
    } else {
      try {
        await store.dispatch('auth/getInfo')
        next()
      } catch (error) {
        await store.dispatch('auth/resetToken')
        Vue.notify({
          group: 'notify',
          type: 'error',
          duration: 5000,
          title: i18n.t('message.error'),
          text: error
        })
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (publicRoutes.indexOf(to.path) !== -1) {
      // in the free login, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
