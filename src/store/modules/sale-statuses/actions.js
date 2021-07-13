import saleStatusApi from '@/api/sale-status'
import NProgress from '@/libs/nprogress'

export default {
  getSaleStatuses({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      saleStatusApi.getSaleStatuses().then(response => {
        commit('SET_SALE_STATUSES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
