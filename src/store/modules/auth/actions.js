import authApi from '@/api/auth'
import { setToken, removeToken } from '@/utils/auth'

export default {
  /**
   * Login
   */
  login({ commit }, credentials) {
    console.log('credentials', credentials)
    return new Promise((resolve, reject) => {
      authApi.login(credentials).then(response => {
        console.log('result', response)
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve(response)
      }).catch(error => {
        console.log('error', error.response)
        reject(error.response)
      })
    })
  },

  loginWithGoogle({ commit }, access_token) {
    return new Promise((resolve, reject) => {
      authApi.loginWithGoogle({ access_token }).then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  // Get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      authApi.getInfo().then(response => {
        if (!response) {
          reject('Verification failed, please Login again!')
        }

        const { user, roles, permissions } = response

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('The account has not been assigned a role!')
        }

        commit('SET_USER_INFO', user)
        commit('SET_ROLES_VIA_USER', roles)
        commit('SET_PERMISSION_VIA_ROLES', permissions)
        resolve(response)
      }).catch(error => {
        reject(error.response.data.message)
      })
    })
  },

  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      authApi.logout().then(response => {
        dispatch('resetToken')
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {})
      commit('SET_ROLES_VIA_USER', [])
      commit('SET_PERMISSION_VIA_ROLES', [])
      removeToken()
      resolve()
    })
  }

}
