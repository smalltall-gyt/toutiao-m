import axios from './index'

// 关注
export async function follow (authorId) {
  return await axios({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: authorId
    }
  })
}
// 取消关注
export async function unfollow (authorId) {
  return await axios({
    url: `/app/v1_0/user/followings/${authorId}`,
    method: 'delete'
  })
}
// 收藏文章
export async function collectArticle (articleId) {
  return await axios({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消收藏
export async function deleteCollectArticle (articleId) {
  return await axios({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'DELETE'
  })
}
// 点赞
export async function onLikeArticle (articleId) {
  return await axios({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消点赞
export async function deleteLikeArticle (articleId) {
  return await axios({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'delete'
  })
}
