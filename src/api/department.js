import request from '@/utils/request'

class DepartmentApi {
  getDepartmentForSelectBox = () => {
    return request.get('/departments/select-box')
  };

  getAllDepartments = params => {
    return request.get('/departments', { params })
  }

  createDepartment = data => {
    return request.post('/departments', data)
  }

  updateDepartment = data => {
    return request.put(`/departments/${data.id}`, data)
  }

  softDeleteDepartment = id => {
    return request.delete(`/departments/soft-delete/${id}`)
  }
}

const departmentApi = new DepartmentApi()
export default departmentApi
