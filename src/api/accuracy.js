import request from '@/utils/request'

class AccuracyApi {
  getAccuracies = () => {
    return request.get('/accuracies')
  };
}

const accuracyApi = new AccuracyApi()
export default accuracyApi
