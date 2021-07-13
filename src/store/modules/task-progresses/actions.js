import taskProgressApi from '@/api/task-progress'
import NProgress from '@/libs/nprogress'

export default {
  getTaskProgressesByTaskId({ commit }, params) {
    console.log('paramsss', params)
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskProgressApi.getTaskProgressesByTaskId(params).then(response => {
        console.log('response', response)
        commit('SET_TASK_PROGRESSES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createTaskProgress({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskProgressApi.createTaskProgress(data).then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateTaskProgress({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskProgressApi.updateTaskProgress(data).then(response => {
        console.log('update', response)
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteTaskProgress({ dispatch }, ids) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskProgressApi.softDeleteTaskProgress(ids).then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
