import http from "../../http";

const contest = {
  namespaced: true,
  state: {
    list: [],
    sum: 0,
    contest: {},
    overview: [],
    totalProblems: 0,
    submission: [],
    submissionTotal: 0,
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
    },
    submission: state => state.submission,
    submissionTotal: state => state.submissionTotal,
  },
  mutations: {
    ["UPDATE_CONSTLIST"]: (state, payload) => {
      state.list = payload
    },
    ["UPDATE_RANK_LIST"]: (state, payload) => {
      state.ranklist = payload
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
    },
    ["UPDATE_SUBMISSION"]: (state, payload) => {
      state.submission = payload
    },
    ["UPDATE_SUBMISSION_TOTAL"]: (state, payload) => {
      state.submissionTotal = payload
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
    getSubmission(ctx, data) {
      return http.get("contest/submission").then(res => {
        ctx.commit("UPDATE_SUBMISSION", res.data.list.reverse())
        ctx.commit("UPDATE_SUBMISSION_TOTAL", res.data.total)
      })
    },
    getRank({ commit, getters }, data) {
      return http.get("contest/rank", {
        params: {
          cid: data,
        }
      }).then(res => {
        console.log(res.data)
        let ranList = normalize(res.data.ranList, getters.contest)
        commit("UPDATE_RANK_LIST", ranList)
      })
    }
  }
}

function normalize(ranklist, contest) {
  const list = Object.values(ranklist).map(row => { // 每一行，也就是每一个用户的成绩
    let solved = 0 // 记录 ac 几道题
    let penalty = 0 // 罚时，尽在 ac 时计算
    console.log(row)
    for (const pid of contest.list) {
      if (row[pid] == null) continue // 这道题没有交过
      const submission = row[pid]
      if (submission.wa >= 0) { // ac 了
        solved++
        penalty += submission.create - contest.start + submission.wa * 20 * 60 * 1000
      }
    }
    row.solved = solved
    row.penalty = penalty
    return row
  })

  // 排序, 先按照 solved, 在按照 penalty
  list.sort((x, y) => {
    if (x.solved !== y.solved) {
      return -(x.solved - y.solved)
    }
    return x.penalty - y.penalty
  })

  // 接下来计算 primes
  const quickest = {} // 每到题最早提交的 ac 时间
  for (const pid of contest.list) {
    quickest[pid] = Infinity // init
  }
  list.forEach(row => {
    for (const pid of contest.list) {
      if (row[pid] != null && row[pid].wa >= 0) {
        quickest[pid] = Math.min(quickest[pid], row[pid].create)
      }
    }
  })
  list.forEach(row => {
    for (const pid of contest.list) {
      if (row[pid] == null || row[pid].wa < 0) continue
      if (quickest[pid] === row[pid].create) { // 这就是最早提交的那个
        row[pid].prime = true // 打上标记
      }
    }
  })
  return list
}

function normalize2(ranklist, contest) {
  const list = Object.values(ranklist).map(row => { // 每一行，也就是每一个用户的成绩
    let solved = 0 // 记录 ac 几道题
    let penalty = 0 // 罚时，尽在 ac 时计算
    for (const pid of contest.list) {
      if (row[pid] == null) continue // 这道题没有交过
      const submission = row[pid]
      if (submission.wa >= 0) { // ac 了
        solved++
        penalty += submission.create - contest.start + submission.wa * 20 * 60 * 1000
      }
    }
    row.solved = solved
    row.penalty = penalty
    return row
  })

  // 排序, 先按照 solved, 在按照 penalty
  list.sort((x, y) => {
    if (x.solved !== y.solved) {
      return -(x.solved - y.solved)
    }
    return x.penalty - y.penalty
  })

  // 接下来计算 primes
  const quickest = {} // 每到题最早提交的 ac 时间
  for (const pid of contest.list) {
    quickest[pid] = Infinity // init
  }
  list.forEach(row => {
    for (const pid of contest.list) {
      if (row[pid] != null && row[pid].wa >= 0) {
        quickest[pid] = Math.min(quickest[pid], row[pid].create)
      }
    }
  })
  list.forEach(row => {
    for (const pid of contest.list) {
      if (row[pid] == null || row[pid].wa < 0) continue
      if (quickest[pid] === row[pid].create) { // 这就是最早提交的那个
        row[pid].prime = true // 打上标记
      }
    }
  })
  return list
}

export default contest