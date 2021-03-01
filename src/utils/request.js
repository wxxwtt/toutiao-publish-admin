// 请求模块
import JSONbig from 'json-bigint'
import axios from 'axios'
import router from '@/router/'
import { Message } from 'element-ui'
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
  const { status } = error.response
  // 任何超出 2xx 的响应码都会进入这里
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})
export default request
