import request from '@/utils/request'

class CustomerApi {
  getAllCustomers = params => {
    return request.get('/customers', { params })
  }

  getCustomersForSelectBox = params => {
    return request.get('/customers/select-box', { params })
  }

  createCustomer = data => {
    return request.post('/customers', data)
  }

  softDeleteCustomer = ids => {
    return request.delete('/customers/soft-delete', { data: { ids }})
  }

  getCustomer = id => {
    return request.get(`/customers/${id}`)
  }

  updateCustomer= (data, id) => {
    return request.post(`/customers/${id}`, data)
  }
}

const customerApi = new CustomerApi()
export default customerApi
