import commentApi from '@/api/comment'
import NProgress from '@/libs/nprogress'

export default {
  getCommentsByReportId({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      commentApi.getCommentsByReportId(params).then(response => {
        commit('SET_COMMENTS_OF_REPORT', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  saveComment({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      commentApi.saveComment(data).then(response => {
        dispatch('getCommentsByReportId', { length: 100, id: data.report_id })
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateComment({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      commentApi.updateComment(data).then(response => {
        dispatch('getCommentsByReportId', { length: 100, id: data.report_id })
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  deleteComment({ dispatch }, { id, reportId }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      commentApi.deleteComment(id).then(response => {
        dispatch('getCommentsByReportId', { length: 100, id: reportId })
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  }
}
