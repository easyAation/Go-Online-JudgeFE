import http from '../../http'
import { stat } from 'fs';

const userInfo = {
  namespaced: true,
  state: {
    info: null,
    solveProblems: [],
    adminList: [],
  },

  mutations: {
    ['UPDATED_INFO']: (state, info) => {
      state.info = inf
    },
    ['UPDATED_SOLVE_PROBLEMS']: (state, solves) => {
      state.solveProblems = solves
      ok = true
      console.log("->>>>>")
      console.log(state.solveProblems)
      console.log(solves)
      console.log("<<<<<<-")
    }
  },

  getters: {
    solves: state => {
      return state.solveProblems
    },
    adminList: state => state.adminList
  },

  actions: {
    getUserSolves(ctx) {
      http.get('user/solves').then(res => {
        console.log(res.data.data)
        ctx.commit("UPDATED_SOLVE_PROBLEMS", res.data.data)
      })
    },
    init(ctx) {
      ctx.commit("UPDATED_SOLVE_PROBLEMS", [])
      ctx.commit("UPDATE_INFO", null)
    }
  }
}

export default userInfo