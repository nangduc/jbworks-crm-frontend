import request from '@/utils/request'

class CompanionApi {
  getCommentsByReportId = params => {
    const { id } = params
    delete params.id
    return request.get(`/comments/report/${id}`, { params })
  }

  saveComment = data => {
    return request.post('/comments', data)
  }

  updateComment = data => {
    return request.put(`/comments/${data.id}`, data)
  }

  deleteComment = id => {
    return request.delete(`/comments/${id}`)
  }
}

const companionApi = new CompanionApi()
export default companionApi
