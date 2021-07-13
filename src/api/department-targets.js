import request from '@/utils/request'

class DepartmentTargetsApi {
  getAllDepartmentTargets = params => {
    return request.get('/department-targets', { params })
  }
  getDepartmentTargetsByDepartmentId = params => {
    const { departmentId } = params
    delete params.departmentId
    return request.get(`/department-targets/${departmentId}`, { params })
  }
}
const departmentTargetsApi = new DepartmentTargetsApi()
export default departmentTargetsApi
