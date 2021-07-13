import { getToken } from '@/utils/auth'

export default {
  token: getToken(),
  userInfo: {},
  rolesViaUser: [],
  permissionsViaRoles: []
}
