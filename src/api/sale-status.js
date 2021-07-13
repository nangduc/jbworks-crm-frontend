import request from '@/utils/request'

class SaleStatusApi {
  getSaleStatuses = () => {
    return request.get('/sale-statuses')
  };
}

const saleStatusApi = new SaleStatusApi()
export default saleStatusApi
