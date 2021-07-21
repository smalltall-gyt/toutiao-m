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
