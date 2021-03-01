/**
 * 用户相关模块
 *
 */
import request from '@/utils/request'

// 用户登录
export const login = params => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: params
  })
}

// 获取用户信息
export const getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    params
  })
}
// 编辑用户信息
export const updataInfo = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
// 编辑用户头像
export const updataAvator = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
