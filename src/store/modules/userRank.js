import http from "../../http";

const userRank = {
  namespaced: true,
  state: {
    list: [],
    total: 0
  },
  getters: {
    list: state => state.list,
    sum: state => state.sum
  },
  mutations: {
    ["UPDATE_RANKLIST"]: (state, payload) => {
      state.list = payload
    },
    ["UPDATE_TOTAL"]: (state, payload) => {
      state.total = payload
    }
  },
  actions: {
    getUserRank(ctx, data) {
      return http.get("userRank").then(res => {
        ctx.commit("UPDATE_RANKLIST", res.data.data)
        ctx.commit("UPDATE_TOTAL", res.total)
      })
    }
  }
}

export default userRank