export default {
  SET_USERS: (state, users) => {
    state.users = users
  },
  SET_USER: (state, data) => {
    state.user = data
  },
  SET_USERS_SELECT_BOX: (state, users) => {
    state.usersSelectBox = users
  }
}
