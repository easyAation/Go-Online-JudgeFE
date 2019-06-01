// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { formate, timePretty, timeContest, timeagoPretty }from './utils/formate.js'

Vue.use(router);
Vue.use(iView);  

Vue.filter('formate', formate)
Vue.filter('timePretty', timePretty)
Vue.filter('timeContest', timeContest)
Vue.filter('timeagoPretty', timeagoPretty)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
