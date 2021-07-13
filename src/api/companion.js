import request from '@/utils/request'

class CompanionApi {
  getCompanionsForSelectBox = (params) => {
    return request.get('/companions/select-box', { params })
  }

  getAllCompanions = params => {
    return request.get('/companions', { params })
  }

  createCompanion = data => {
    return request.post('/companions', data)
  }

  updateCompanion = (data, id) => {
    return request.post(`/companions/${id}`, data)
  }

  softDeleteCompanion = data => {
    const { ids } = data
    return request.delete('/companions/soft-delete', { data: { ids }})
  }
}

const companionApi = new CompanionApi()
export default companionApi
