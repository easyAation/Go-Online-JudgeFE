import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProblemList from '../views/Problem/ProblemList'
import FAQ from '../views/FAQ'
import NewsInfo from '../views/News/NewsInfo'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' }
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
      path: '/faq',
      name: 'faq',
      component: FAQ,
      meta: { title: 'FAQ' }
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