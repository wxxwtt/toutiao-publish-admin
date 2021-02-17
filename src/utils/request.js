// 请求模块
import axios from 'axios'

const request = axios.create({
  // http://api-toutiao-web.itheima.net/
  baseURL: 'http://api-toutiao-web.itheima.net/' // 请求的(根)基础路径
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default request
