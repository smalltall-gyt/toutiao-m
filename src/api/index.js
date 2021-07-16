import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
instance.interceptors.request.use((config) => config, (error) => {
  console.log(error)
})
instance.interceptors.response.use((res) => res.data)
export default instance
