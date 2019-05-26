import Vue from "vue"
import Vuex from "vuex"
import session from './modules/session'
import problems from './modules/problems'
import userInfo from './modules/useInfo'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    session,
    problems,
    userInfo,
  }
})

export default store