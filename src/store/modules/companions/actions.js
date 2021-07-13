import companionApi from '@/api/companion'
import NProgress from '@/libs/nprogress'

export default {
  getCompanionsForSelectBox({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      companionApi.getCompanionsForSelectBox(params).then(response => {
        commit('SET_COMPANIONS_SELECT_BOX', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getAllCompanions({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      companionApi.getAllCompanions(params).then(response => {
        commit('SET_COMPANIONS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createCompanion({ dispatch }, data) {
    console.log('createCompanion', data)
    NProgress.start()
    return new Promise((resolve, reject) => {
      companionApi.createCompanion(data).then(response => {
        dispatch('getAllCompanions')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateCompanion({ dispatch }, { data, id }) {
    NProgress.start()
    console.log('update', data)
    return new Promise((resolve, reject) => {
      companionApi.updateCompanion(data, id).then(response => {
        dispatch('getAllCompanions')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteCompanion({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      companionApi.softDeleteCompanion(data).then(response => {
        dispatch('getAllCompanions')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
