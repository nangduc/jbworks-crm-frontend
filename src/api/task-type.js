import request from '@/utils/request'

class TaskTypeApi {
  getTaskTypesForSelectBox = () => {
    return request.get('/task-types/select-box')
  };

  getAllTaskTypes = () => {
    return request.get('/task-types')
  }

  createTaskType = data => {
    return request.post('/task-types', data)
  }

  updateTaskType= data => {
    console.log('data 123', data)
    return request.put(`/task-types/${data.id}`, data)
  }

  deleteTaskType = id => {
    return request.delete(`/task-types/${id}`)
  }
}

const taskTypeApi = new TaskTypeApi()
export default taskTypeApi
