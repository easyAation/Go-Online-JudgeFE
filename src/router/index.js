import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProblemList from '../views/Problem/ProblemList'
import FAQ from '../views/FAQ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' }
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
