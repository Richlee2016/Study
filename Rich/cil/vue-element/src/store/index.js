import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  getters: {
    Token: state => state.user.Token,
    Info: state => state.user.UserInfo,
    NavBar: state => state.app.navBar.filter(b => !b.hidden)
  }
})
