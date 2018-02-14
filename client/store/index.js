import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    pkg,
    loading: true
  },
  mutations: {
    [types.SET_LOADING] (state, data) {
      state.loading = data
    }
  }
})

export default store
