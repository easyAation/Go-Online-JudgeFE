import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProblemList from '../views/Problem/ProblemList'
import FAQ from '../views/FAQ'
import NewsInfo from '../views/News/NewsInfo'
import Problem from '../views/Problem/Problem'
import ProblemSubmit from '../views/Problem/ProblemSubmit'
import ProblemInfo from '../views/Problem/problemInfo'
import UserInfo from '../views/UserInfo'
import Status from '../views/Status'
import ContestList from '../views/ContestList'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home', isLogin: false }
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
      path: '/contest',
      name: 'Contest',
      meta: { title: 'Contest' }
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router