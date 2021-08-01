import axios from './index'

// 获取评论
export async function getComments (params) {
  return await axios({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}
// 给评论点赞
export async function commentLiking (commentId) {
  return await axios({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}
// 取消评论点赞
export async function deleteCommentLiking (commentId) {
  return await axios({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}
// 发布评论
export async function postComment (data) {
  return await axios({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
