import axios from 'axios'
import store from '@/store/user.js'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
instance.interceptors.request.use((config) => {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, (error) => {
  console.log(error)
})
instance.interceptors.response.use((res) => res.data)
export default instance
