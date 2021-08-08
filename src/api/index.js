import axios from 'axios'
import store from '@/store/user.js'
import $store from '@/store'
import { Toast } from 'vant'
// import JSONbig from 'json-bigint'
import router from '@/router'

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
const refreshTokenReq = axios.create({
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
instance.interceptors.response.use((res) => res.data, async (error) => {
  const status = error.response.status
  if (status === 400) {
    Toast.fail('客户端参数异常')
  } else if (status === 401) {
    const { user } = store.state
    if (!user || !user.token) {
      // 跳转到登录页面
      return redirectLogin()
    }
    try {
      const res = await refreshTokenReq({
        url: '/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = res.data.data.token
      $store.commit('user/setUser', user)
      return instance(error.config)
    } catch (error) {
      // 刷新token失败
      redirectLogin()
    }
  } else if (status === 403) {
    Toast.fail('没有访问权限')
  } else if (status >= 500) {
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default instance
