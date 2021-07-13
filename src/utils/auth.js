import Cookies from 'js-cookie'

const tokenKey = 'access_token'

export const getToken = () => {
  return Cookies.get(tokenKey)
}

export const setToken = token => {
  return Cookies.set(tokenKey, token, { expires: 30 })
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
