/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

/**
 * 获取频道列表
 */
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
/**
 * 删除文章
 */
export const delArticlesById = articlesId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articlesId}`
  })
}
/**
 * 获取文章详情
 */
export const getArticleById = articlesId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articlesId}`
  })
}
/**
 * 修改文章的评论状态
 */
export const updataArticleCommentStatus = (articleId, commentStatus) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/comments/status?article_id=${articleId}`,
    data: {
      allow_comment: commentStatus
    }
  })
}
