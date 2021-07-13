import taskTypeApi from '@/api/task-type'
import NProgress from '@/libs/nprogress'

export default {
  getTaskTypesForSelectBox({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskTypeApi.getTaskTypesForSelectBox().then(response => {
        commit('SET_TASK_TYPE_SELECT_BOX', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getAllTaskTypes({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskTypeApi.getAllTaskTypes().then(response => {
        commit('SET_TASK_TYPES', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createTaskType({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskTypeApi.createTaskType(data).then(response => {
        dispatch('getAllTaskTypes')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateTaskType({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskTypeApi.updateTaskType(data).then(response => {
        dispatch('getAllTaskTypes')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  deleteTaskType({ dispatch }, id) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskTypeApi.deleteTaskType(id).then(response => {
        dispatch('getAllTaskTypes')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
