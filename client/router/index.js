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
    },
    {
      name: 'Brand Select',
      path: '/:language',
      component: require('../views/brand-select')
    },
    {
      name: 'Brand',
      path: '/:language/:brand',
      component: require('../views/brand')
    }
  ]
})
