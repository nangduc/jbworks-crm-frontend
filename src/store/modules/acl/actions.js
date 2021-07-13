import aclApi from '@/api/acl'
import NProgress from '@/libs/nprogress'

export default {
  getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      aclApi.getRoles().then(response => {
        commit('SET_ROLES', response)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getRoleById({ commit }, id) {
    const role = aclApi.getRoleById(id)
    const permissions = aclApi.getPermissions()
    Promise.all([role, permissions]).then(response => {
      commit('SET_ROLE', response[0].data)
      commit('SET_PERMISSIONS', response[1].data)
    })
  },
  getPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      aclApi.getPermissions().then(response => {
        commit('SET_PERMISSIONS', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createRole({ commit }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      aclApi.createRole(data).then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateRole({ commit }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      aclApi.updateRole(data).then(response => {
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  deleteRole({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      aclApi.deleteRole(data).then(response => {
        dispatch('getRoles')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getRolesForSelectBox({ commit }) {
    return new Promise((resolve, reject) => {
      aclApi.getRolesForSelectBox().then(response => {
        commit('SET_ROLES_SELECT_BOX', response)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
