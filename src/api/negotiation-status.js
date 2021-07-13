import request from '@/utils/request'

class NegotiationStatusApi {
  getNegotiationStatuses = () => {
    return request.get('/negotiation-statuses')
  };
}

const negotiationStatusApi = new NegotiationStatusApi()
export default negotiationStatusApi
