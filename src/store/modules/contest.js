import http from "../../http";

const contest = {
  namespaced: true,
  state: {
    list: [],
    sum: 0,
    contest: {},
    overview: [],
    totalProblems: 0,
    problems: [],
    ranklist: [],
    solved: [],
  },
  getters: {
    list: state => state.list,
    sum: state => state.sum,
    contest: state => state.contest,
    overview: state => state.overview,
    totalProblems: state => state.totalProblems,
    problems: state => state.problems,
    ranklist: state => state.ranklist,
    solved: state => state.solved,
    oneProblem: state => (position) => {
      if (state.problems.length() > position) {
        return state.problems[position]
      }
      return null
    }
  },
  mutations: {
    ["UPDATE_CONSTLIST"]: (state, payload) => {
      state.list = payload
    },
    ["UPDATE_SUM_CONTEST"]: (state, payload) => {
      state.sum = payload
    },
    ["UPDATE_CONTEST"]: (state, payload) => {
      state.contest = payload
    },
    ["UPDATE_PROBLEMS"]: (state, payload) => {
      state.problems = payload
    },
    ["GET_CONTEST_OVERVIEW"]: (state, payload) => {
      state.overview = payload
    },
    ["GET_CONTEST_SOLVED"]: (state, payload) => {
      state.solved = payload
    },
    ["UPDATE_CONTEST_TOTAL_PRO"]: (state, payload) => {
      state.totalProblems = payload
    },
    ["GET_CONTEST_RANK"]: (state, payload) => {
      state.ranklist = payload
    },
    ["DELETE_CONTEST"]: (state, { cid }) => {
      state.list = state.list.filter((p) => p.cid !== cid)
    }
  },
  actions: {
    create(ctx, data) {
      return http.post("contest/create", JSON.stringify(data)).then(res => res.data.cid)
    },
    findOne(ctx, data) {
      return http.get("contest", {
        params: {
          cid: data,
        },
      }).then(res => {
        let start = new Date(res.data.contest.start_at).getTime()
        let end = new Date(res.data.contest.end_at).getTime()
        res.data.contest.start_at = start
        res.data.contest.end_at = end
        ctx.commit("UPDATE_CONTEST", res.data.contest)
        ctx.commit("UPDATE_PROBLEMS", res.data.list)
        ctx.commit("UPDATE_CONTEST_TOTAL_PRO", res.data.total)

      })
    },
    // findOneProblem(ctx, pid) {
    //   let pro = state.problems.find(p => p.id == pid)
    //   if (pro == undefined) {

    //   }
    // }
  }

}

export default contest