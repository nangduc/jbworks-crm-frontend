import departmentApi from '@/api/department'
import NProgress from '@/libs/nprogress'

export default {
  getDepartmentForSelectBox({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentApi.getDepartmentForSelectBox().then(response => {
        commit('SET_DEPARTMENT_SELECT_BOX', response.data)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getAllDepartments({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentApi.getAllDepartments(params).then(response => {
        commit('SET_DEPARTMENTS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  createDepartment({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentApi.createDepartment(data).then(response => {
        dispatch('getAllDepartments')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  updateDepartment({ dispatch }, data) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentApi.updateDepartment(data).then(response => {
        dispatch('getAllDepartments')
        NProgress.done()
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  softDeleteDepartment({ dispatch }, id) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentApi.softDeleteDepartment(id).then(response => {
        dispatch('getAllDepartments')
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
