import userApi from '@/api/user'
import NProgress from '@/libs/nprogress'

export default {
  getUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      userApi.getUser(id).then(response => {
        commit('SET_USER', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getAllUsers({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.getAllUsers(params).then(response => {
        commit('SET_USERS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createUser({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.createUser(data).then(response => {
        dispatch('getAllUsers')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateUser({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.updateUser(data).then(response => {
        console.log('response', response)
        dispatch('getAllUsers')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteUser({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.softDeleteUser(data).then(response => {
        dispatch('getAllUsers')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getUsersForSelectBox({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.getUsersForSelectBox(params).then(response => {
        console.log('response', response)
        commit('SET_USERS_SELECT_BOX', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getUsersByDepartmentId({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.getUsersByDepartmentId(params).then(response => {
        commit('SET_USERS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  importUsers({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.importUsers(data).then(response => {
        dispatch('getAllUsers')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  downloadTemplate({ dispatch }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      userApi.downloadTemplate().then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  }

}
