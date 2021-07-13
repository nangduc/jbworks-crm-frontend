import request from '@/utils/request'

class AuthApi {
  login = params => {
    return request.post('/login', params)
  };

  loginWithGoogle = accessToken => {
    console.log('access', accessToken)
    return request.post('/auth/google', accessToken)
  }

  getInfo = () => {
    return request.get('/me')
  };

  logout = () => {
    return request.post('/logout')
  }
}

const authApi = new AuthApi()
export default authApi
