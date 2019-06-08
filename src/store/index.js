import Vue from "vue"
import Vuex from "vuex"
import session from './modules/session'
import problems from './modules/problems'
import userInfo from './modules/useInfo'
import userRank from './modules/userRank'
import contest from './modules/contest'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentTime: Date.now(),
  },
  getters: {
    encrypt: state => ({
      Public: 1,
      Private: 2,
      Password: 3
    }),
    currentTime: state => state.currentTime
  },
  modules: {
    session,
    problems,
    userInfo,
    userRank,
    contest,
  }
})

export default store