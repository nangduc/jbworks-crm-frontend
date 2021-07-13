import taskApi from '@/api/task'
// import NProgress from '@/libs/nprogress'

export default {
  getTask({ commit }, id) {
    return new Promise((resolve, reject) => {
      taskApi.getTask(id).then(response => {
        commit('SET_TASK', response.data)
        resolve(response)
      }).catch(error => reject(error.response))
    })
  }
}
