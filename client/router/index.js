import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      name: 'Home',
      path: '/',
      component: require('../views/home')
    }
  ]
})
