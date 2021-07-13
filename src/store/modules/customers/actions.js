import customerApi from '@/api/customer'
import NProgress from '@/libs/nprogress'

export default {
  getCustomersForSelectBox({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      customerApi.getCustomersForSelectBox(params).then(response => {
        commit('SET_CUSTOMERS_SELECT_BOX', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getAllCustomers({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      customerApi.getAllCustomers(params).then(response => {
        commit('SET_CUSTOMERS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getCustomer({ commit }, id) {
    return new Promise((resolve, reject) => {
      customerApi.getCustomer(id).then(response => {
        commit('SET_CUSTOMER', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createCustomer({ dispatch }, data) {
    console.log('createCompanion', data)
    NProgress.start()
    return new Promise((resolve, reject) => {
      customerApi.createCustomer(data).then(response => {
        dispatch('getAllCustomers')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteCustomer({ dispatch }, ids) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      customerApi.softDeleteCustomer(ids).then(response => {
        dispatch('getAllCustomers')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  updateCustomer({ dispatch }, { data, id }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      customerApi.updateCustomer(data, id).then(response => {
        dispatch('getAllCustomers')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  }
}
