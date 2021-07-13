import request from '@/utils/request'

class AclApi {
  getRoles = () => {
    return request.get('/acl/roles')
  };

  getRoleById = id => {
    return request.get('/acl/roles/' + id)
  }

  getPermissions = () => {
    return request.get('/acl/permissions')
  }

  createRole = data => {
    return request.post('/acl/roles', data)
  }

  updateRole = data => {
    const { id, name, description, permissions } = data
    return request.put('/acl/roles/' + id, { name, description, permissions })
  }

  deleteRole = data => {
    const { ids } = data
    return request.delete('/acl/roles', { data: { ids }})
  }

  getRolesForSelectBox = () => {
    return request.get('/acl/roles/select-box')
  }
}

const aclApi = new AclApi()
export default aclApi
