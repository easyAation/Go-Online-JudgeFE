import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProblemEdit from '../views/Problem/ProblemEdit'
import ProblemList from '../views/Problem/ProblemList'
import FAQ from '../views/FAQ'
import NewsInfo from '../views/News/NewsInfo'
import Problem from '../views/Problem/Problem'
import ProblemSubmit from '../views/Problem/ProblemSubmit'
import ProblemInfo from '../views/Problem/ProblemInfo'
import UserInfo from '../views/UserInfo'
import Status from '../views/Status'
import ContestList from '../views/ContestList'
import Contest from '../views/Contest/Contest'
import ContestOverview from '../views/Contest/ContestOverview'
import ContestProblemSubmit from '../views/Contest/ContestSubmit'
import ContestProblemInfo from '../views/Contest/ContestProblemInfo'
import ContestStatus from '../views/Contest/ContestStatus'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home', isLogin: false }
    },
    {
      path: '/admin',
      name: 'Admin',
    },
    {
      name: 'newsInfo',
      path: '/news/detail/:nid',
      component: NewsInfo,
      meta: { title: 'News'}
    },
    {
      path: '/problems',
      name: 'problemList',
      component: ProblemList,
      meta: { title: 'Problem List' }
    },
    {
      path: '/problem/edit/:pid',
      name: 'problemEdit',
      component: ProblemEdit,
      meta: { title: 'Problem Edit' }
    },
    {
      path: '/problem/detail/:pid',
      component: Problem,
      children: [
        {
          path: '',
          name: 'problemInfo',
          component: ProblemInfo,
          meta: { title: 'Problem Info' }
        },
        {
          path: 'submit',
          name: 'problemSubmit',
          component: ProblemSubmit,
          meta: { title: 'Problem Submit' }
        }
      ]
    },
    {
      path: '/status',
      name: 'status',
      component: Status,
      meta: { title: 'Status' } 
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
      meta: { title: 'FAQ' }
    },
    {
      path: '/user/:uid',
      name: 'userInfo',
      component: UserInfo,
      meta: { title: 'User Info' }
    },
    {
      path: '/contests',
      name: 'contestList',
      component: ContestList,
      meta: { title:"Contest List" }
    },
    {
      path: '/contest/:cid',
      component: Contest,
      meta: { isLogin: true },
      children: [
        {
          path: '',
          component: ContestOverview,
          name: 'contestOverview',
          meta: { title: 'Contest Overview', isLogin: true }
        },
        {
          path: 'problem/:id/submit',
          component: ContestProblemSubmit,
          name: 'contestProblemSubmit',
          meta: { title: 'Problem Submit' }
        },
        {
          path: 'problem/:id',
          component: ContestProblemInfo,
          name: 'contestProblemInfo',
          meta: { title: 'Problem Info' }
        },
        {
          path: 'status',
          component: ContestStatus,
          name: 'contestStatus',
          meta: { title: 'Contest Status' }
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
