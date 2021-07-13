export default {
  SET_TASKS: (state, data) => {
    state.tasks = data
  },
  SET_TASKS_OF_USER: (state, data) => {
    state.tasksOfUser = data
  },
  SET_TASKS_OF_CUSTOMER: (state, tasks) => {
    state.tasksOfCustomer = tasks
  }
}
