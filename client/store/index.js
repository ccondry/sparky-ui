import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

let loc = window.location
let wsAddress
if (loc.protocol === 'https:') {
  wsAddress = 'wss:'
} else {
  wsAddress = 'ws:'
}
if (process.env.NODE_ENV === 'production') {
  // production
  wsAddress += '//' + loc.host + '/api/v1'
} else {
  // dev
  wsAddress += '//localhost:3020/api/v1'
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    pkg,
    loading: true,
    wsAddress,
    socket: null,
    socketOpen: false
  },
  mutations
})

export default store
