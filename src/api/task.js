import request from '@/utils/request'

class TaskApi {
  getAllTasks = params => {
    return request.get('/tasks', { params })
  }

  getTasksByUserId = params => {
    const { userId } = params
    delete params.userId
    return request.get(`/users/${userId}/tasks`, { params })
  }

  getTasksByCustomerId = params => {
    const { customerId } = params
    delete params.customerId
    return request.get(`/customers/${customerId}/tasks`, { params })
  }

  createTask = data => {
    return request.post('/tasks', data)
  }

  updateTask = data => {
    return request.put(`/tasks/${data.id}`, data)
  }

  softDeleteTask = data => {
    const { ids } = data
    return request.delete('/tasks/soft-delete', { data: { ids }})
  }

  getTask = id => {
    return request.get(`/tasks/${id}`)
  }
}

const taskApi = new TaskApi()
export default taskApi
