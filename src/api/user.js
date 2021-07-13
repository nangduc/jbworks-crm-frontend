import request from '@/utils/request'

class UserApi {
  getAllUsers = params => {
    return request.get('/users', { params })
  }

  getUser = id => {
    return request.get('/users/' + id)
  }

  createUser = data => {
    return request.post('/users', data)
  }

  updateUser = data => {
    data._method = 'PATCH'
    return request.post(`/users/${data.id}`, data)
  }

  softDeleteUser = ids => {
    return request.delete('/users/soft-delete', { data: { ids }})
  }

  getUsersForSelectBox = params => {
    return request.get('/users/select-box', { params })
  }

  getUsersByDepartmentId = params => {
    const { departmentId } = params
    delete params.departmentId
    return request.get(`/departments/${departmentId}/users`, { params })
  }

  importUsers = data => {
    return request.post('/users/import', data)
  }

  downloadTemplate = () => {
    request.interceptors.request.use(
      async config => {
        config.responseType = 'blob'
        return config
      }
    )
    return request.get('/users/template')
  }
}

const userApi = new UserApi()
export default userApi
