import request from '@/utils/request'

class TaskProgressApi {
  getTaskProgressesByTaskId = params => {
    const { taskId } = params
    delete params.taskId
    return request.get(`/tasks/${taskId}/task-progresses`, { params })
  }

  createTaskProgress = data => {
    delete data.id
    console.log('data', data)
    return request.post('/task-progresses', data)
  }

  updateTaskProgress = data => {
    console.log('data aaa', data)
    return request.put(`/task-progresses/${data.id}`, data)
  }

  softDeleteTaskProgress = ids => {
    return request.delete('/task-progresses/soft-delete', { data: { ids }})
  }
}

const taskProgressApi = new TaskProgressApi()
export default taskProgressApi
