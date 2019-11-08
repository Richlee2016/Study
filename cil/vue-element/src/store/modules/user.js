import { getCache, setCache } from '@/utils'
export default {
  namespaced: true,
  state: {
    Token: getCache('Admin-Token'),
    UserInfo: getCache('Admin-Info')
  },
  mutations: {
    SET_USERINFO (state, { Token, Info }) {
      state.Token = Token
      state.UserInfo = Info
      setCache('Admin-Token', Token, 1, 'd')
      setCache('Admin-Info', Info, 1, 'd')
    }
  },
  actions: {
    async Login ({ commit }, { router }) {
      const Token = '123456'
      const Info = { roles: ['Property_MerchantOperator'] }
      commit('SET_USERINFO', { Token, Info })
      router.push({ path: '/' })
    }
  }
}
