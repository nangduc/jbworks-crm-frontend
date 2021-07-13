import taskApi from '@/api/task'
import NProgress from '@/libs/nprogress'

export default {
  getAllTasks({ commit }, payload) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.getAllTasks(payload).then(response => {
        commit('SET_TASKS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getTasksByUserId({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.getTasksByUserId(params).then(response => {
        commit('SET_TASKS_OF_USER', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getTasksByCustomerId({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.getTasksByCustomerId(params).then(response => {
        commit('SET_TASKS_OF_CUSTOMER', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createTask({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.createTask(data).then(response => {
        dispatch('getTasksByUserId', { userId: data.user_id })
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateTask({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.updateTask(data).then(response => {
        dispatch('getTasksByUserId', { userId: data.user_id })
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteTask({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskApi.softDeleteTask(data).then(response => {
        dispatch('getTasksByUserId', { userId: data.user.id })
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
