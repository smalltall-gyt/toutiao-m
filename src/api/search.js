import axios from './index'

// 获取联想建议
export async function searchSuggestion (searchValue) {
  return await axios.get(`/app/v1_0/suggestion?q=${searchValue}`)
}
// 获取搜索结果
export async function searchResults (params) {
  return await axios.get('/app/v1_0/search', {
    params
  })
}
// 获取搜索历史记录
export async function searchHistories () {
  return await axios.get('/app/v1_0/search/histories')
}
// 删除全部历史记录
export async function deleteAllHistories () {
  return await axios({
    url: '/app/v1_0/search/histories',
    method: 'DELETE'
  })
}
