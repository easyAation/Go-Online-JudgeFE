import http from '../../http'

const session = {
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {
    isLogined: state => state.profile != null && state.profile.token !== '',
    sessionInfo: state => state.profile,
  },
  mutations: {
    ["UPDATE_ACCOUNT_INFO"]: (state, payload) => {
      state.profile = payload
    },
  },
  actions: {
    signin(ctx, data) {
      return http.post("signin", JSON.stringify(data)).then(res => {
        ctx.commit("UPDATE_ACCOUNT_INFO", res.data)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("name", res.data.name)
      })
    },
    register(ctx, data) {
      return http.post("account/register", JSON.stringify(data)).then(res => {
        ctx.commit("UPDATE_ACCOUNT_INFO", res.data)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("name", res.data.name)
      })
    },
    logout(ctx) {
      ctx.commit("UPDATE_ACCOUNT_INFO", {
        uid: '',
        token: '',
        name: '',
      })
      localStorage.removeItem("token")
      localStorage.removeItem("name")
    },
    init(ctx) {
      let token = localStorage.getItem("token")
      let name = localStorage.getItem("name")

      if (name != null && token != null) {
        ctx.commit("UPDATE_ACCOUNT_INFO", {
          "token": token,
          "name": name
        })
      }
    }
  }
}

export default session