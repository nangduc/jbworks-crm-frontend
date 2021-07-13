import request from '@/utils/request'

class ReportApi {
  getAllReports = params => {
    return request.get('/reports', { params })
  };

  getReport= id => {
    return request.get(`/reports/${id}`)
  }

  getLastReport = () => {
    return request.get('/reports/last')
  }

  createReport = data => {
    console.log('data', data)
    return request.post('/reports', data)
  }
}

const reportApi = new ReportApi()
export default reportApi
