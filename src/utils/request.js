// 请求模块
import JSONbig from 'json-bigint'
import axios from 'axios'
const baseURL = 'http://api-toutiao-web.itheima.net/'
// const baseURL = 'http://47.99.172.18:8001/'
// const baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL, // 请求的(根)基础路径
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      // 处理数字过大无法正常显示
      return JSONbig.parse(data)
    } catch (error) {
      console.log(error)
      return data
    }
  }]
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
