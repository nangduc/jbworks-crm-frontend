import request from '@/utils/request'

class TaskGroupApi {
  getTaskGroups = () => {
    return request.get('/task-groups')
  }

  getTaskGroupsForSelectBox = () => {
    return request.get('/task-groups/select-box')
  }
}

const taskGroupApi = new TaskGroupApi()
export default taskGroupApi
