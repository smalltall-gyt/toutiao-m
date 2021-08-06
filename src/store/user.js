import { set, get } from '@/utils/localStorage'

const USER_KEY = 'toutiao-user'
export default {
  namespaced: true,
  state: {
    user: get(USER_KEY),
    cachePages: ['LayOutIndex'] // 缓存的页面
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      set(USER_KEY, payload)
    },
    // 添加缓存页面
    addCachePages (state, payload) {
      if (!state.cachePages.includes(payload)) {
        state.cachePages.push(payload)
      }
    },
    // 删除缓存页面
    removeCachePages (state, payload) {
      const index = state.cachePages.indexOf(payload)
      state.cachePages.splice(index, 1)
    }
  },
  actions: {}
}
