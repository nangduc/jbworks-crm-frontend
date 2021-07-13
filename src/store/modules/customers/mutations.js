export default {
  SET_CUSTOMERS_SELECT_BOX: (state, customers) => {
    state.customersSelectBox = customers
  },
  SET_CUSTOMERS: (state, customers) => {
    state.customers = customers
  },
  SET_CUSTOMER: (state, customer) => {
    state.customer = customer
  }
}
