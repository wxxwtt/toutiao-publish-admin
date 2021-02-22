/**
 * 发布文章相关模块
 *
 */
import request from '@/utils/request'

// 发布文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft // 是否存为草稿（true 为草稿）
    }
  })
}

// 编辑文章
export const updateArticle = (data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${data.id}`,
    data,
    params: {
      draft // 是否存为草稿（true 为草稿）
    }
  })
}
