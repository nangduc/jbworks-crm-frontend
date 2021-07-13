import request from '@/utils/request'

class NegotiationResultStatusApi {
  getNegotiationResultStatuses = () => {
    return request.get('/negotiation-result-statuses')
  };
}

const negotiationResultStatusApi = new NegotiationResultStatusApi()
export default negotiationResultStatusApi
