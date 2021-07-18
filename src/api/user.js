import axios from './index'

export function getCurrentUser () {
  const res = axios.get('/app/v1_0/user')
  return res
}
