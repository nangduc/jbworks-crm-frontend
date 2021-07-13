import fieldApi from '@/api/field'
import NProgress from '@/libs/nprogress'

export default {
  getAllFields({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      fieldApi.getAllFields().then(response => {
        commit('SET_FIELDS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
