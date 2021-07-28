import axios from 'axios'
import store from '@/store/user.js'
// import JSONbig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
  // transformRequest: [function (data) {
  //   try {
  //     return JSONbig.parse(data)
  //   } catch (error) {
  //     return data
  //   }
  // }]
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
