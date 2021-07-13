import negotiationResultStatusApi from '@/api/negotiation-result-status'
import NProgress from '@/libs/nprogress'

export default {
  getNegotiationResultStatuses({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      negotiationResultStatusApi.getNegotiationResultStatuses().then(response => {
        commit('SET_NEGOTIATION_RESULT_STATUSES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
