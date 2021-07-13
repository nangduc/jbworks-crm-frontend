import axios from 'axios'
import queryString from 'query-string'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import i18n from '@/lang'
import NProgress from '@/libs/nprogress'

// create an axios instance
const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': null,
    'X-Requested-With': null,
    'Access-Control-Allow-Origin': '*'
  },
  paramsSerializer: params => queryString.stringify(params)
})

// request interceptor
axiosClient.interceptors.request.use(
  async config => {
    if (store.state.auth.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  error => {
    console.log('error123', error.response)
    if (error.response) {
      Vue.notify({
        group: 'notify',
        type: 'error',
        duration: 5000,
        title: i18n.t('message.error'),
        text: error.response.data && error.response.data.message ? error.response.data.message : 'Has Error!'
      })
    } else {
      Vue.notify({
        group: 'notify',
        type: 'error',
        duration: 5000,
        title: i18n.t('message.error'),
        text: 'Error: Network Error'
      })
    }
    NProgress.done()
    return Promise.reject(error)
  }
)

export default axiosClient
