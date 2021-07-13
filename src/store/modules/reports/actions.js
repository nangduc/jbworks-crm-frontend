import reportApi from '@/api/report'
import NProgress from '@/libs/nprogress'

export default {
  getAllReports({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      reportApi.getAllReports(params).then(response => {
        commit('SET_REPORTS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getReport({ commit }, id) {
    return new Promise((resolve, reject) => {
      reportApi.getReport(id).then(response => {
        commit('SET_REPORT', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getLastReport({ commit }) {
    return new Promise((resolve, reject) => {
      reportApi.getLastReport().then(response => {
        commit('SET_REPORT', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createReport({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      reportApi.createReport(data).then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  }
}
