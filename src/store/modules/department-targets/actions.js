import departmentTargetApi from '@/api/department-targets'
import NProgress from '@/libs/nprogress'

export default {
  getAllDepartmentTargets({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      departmentTargetApi.getAllDepartmentTargets(params).then(response => {
        commit('SET_DEPARTMENT_TARGETS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
