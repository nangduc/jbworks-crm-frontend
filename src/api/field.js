import request from '@/utils/request'

class TaskApi {
  getAllFields = () => {
    return request.get('/fields')
  }
}

const taskApi = new TaskApi()
export default taskApi
