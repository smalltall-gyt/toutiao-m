import { set, get } from '@/utils/localStorage'

const USER_KEY = 'toutiao-user'
export default {
  namespaced: true,
  state: {
    user: get(USER_KEY)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      set(USER_KEY, payload)
    }
  },
  actions: {}
}
