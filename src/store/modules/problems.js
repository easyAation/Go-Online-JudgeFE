import http from '../../http'


const problems = {
  namespaced: true,
  state: {
    problems: [],
  },

  mutations: {
    ['UPDATE_PROBLEMS']: (state, payload) => {
      state.problems = payload
    },
    ['GET_PROBLEM_DEAL']: (state, pid) => {
      for (let i = 0; i < state.problems.length; i++) {
        if (state.problems[i].id == pid)
          return state.problems[i]
      }
    },
  },

  getters: {
    problems: state => {
      return state.problems
    },
    problemCount: state => {
      return state.problems.length
    }
  },

  actions: {
    getProblemList(ctx, data) {
      return http.get('problem/list').then(res => {
        ctx.commit('UPDATE_PROBLEMS', res.data.list)
      })
    },
    getProblemDetail(ctx, id) {
      let pro = state.problems.find(pro => pro.id == id)
      if (pro != undefined)
        return pro

    }
  }
}

export default problems