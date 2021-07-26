import axios from './index'

// 获取频道
export async function getChannels () {
  return await axios.get('/app/v1_0/user/channels')
}
// 获取新闻推荐列表
export async function getArticles (data) {
  const res = await axios.get('/app/v1_1/articles', {
    params: {
      channel_id: data.channel_id,
      timestamp: data.timestamp,
      with_top: data.withtop
    }
  })
  return res
}
// 获取所有频道
export async function getAllChannels () {
  const res = await axios.get('/app/v1_0/channels')
  return res
}
// 添加频道
export async function addChannel (data) {
  return await axios({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
// 删除频道
export async function deleteChannel (id) {
  return await axios({
    url: `/app/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
