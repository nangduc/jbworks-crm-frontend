import taskGroupApi from '@/api/task-group'
import NProgress from '@/libs/nprogress'

export default {
  getTaskGroups({ commit }, params) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskGroupApi.getTaskGroups(params).then(response => {
        commit('SET_TASK_GROUPS', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  },
  getTaskGroupsForSelectBox({ commit }) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      taskGroupApi.getTaskGroupsForSelectBox().then(response => {
        commit('SET_TASK_GROUPS_SELECT_BOX', response)
        NProgress.done()
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
