import negotiationStatusApi from '@/api/negotiation-status'
import NProgress from '@/libs/nprogress'

export default {
  getNegotiationStatuses({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      negotiationStatusApi.getNegotiationStatuses().then(response => {
        commit('SET_NEGOTIATION_STATUSES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
