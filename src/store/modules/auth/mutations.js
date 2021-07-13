export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_ROLES_VIA_USER: (state, roles) => {
    state.rolesViaUser = roles
  },
  SET_PERMISSION_VIA_ROLES: (state, permissions) => {
    state.permissionsViaRoles = permissions
  }
}
