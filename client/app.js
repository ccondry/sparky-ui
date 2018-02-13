import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
// import { TOGGLE_SIDEBAR, FORWARD_TO } from 'vuex-store/mutation-types'

Vue.router = router
Vue.use(NProgress)
// moment.js filters
Vue.use(require('vue-moment'))
// smooth scrolling
Vue.use(require('vue-scrollto'), {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

// const { state } = store

// router filters
router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)
  next()
})

// load all filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
