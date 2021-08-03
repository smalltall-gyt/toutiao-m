import axios from './index'

export function getCurrentUser () {
  const res = axios.get('/app/v1_0/user')
  return res
}
// 获取用户个人信息
export async function getUserProfile () {
  return await axios({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}
// 修改用户个人资料
export async function updateUserProfile (data) {
  return await axios({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
// 修改头像
export async function updateAvatar (data) {
  return await axios({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
