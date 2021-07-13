import accuracyApi from '@/api/accuracy'
import NProgress from '@/libs/nprogress'

export default {
  getAccuracies({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      accuracyApi.getAccuracies().then(response => {
        commit('SET_ACCURACIES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
