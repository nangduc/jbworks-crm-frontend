export default {
  SET_ROLES: (state, data) => {
    state.roles = data
  },
  SET_ROLE: (state, data) => {
    state.role = data
  },
  SET_PERMISSIONS: (state, data) => {
    state.permissions = data
  },
  SET_ROLES_SELECT_BOX: (state, roles) => {
    state.rolesSelectBox = roles
  }
}
