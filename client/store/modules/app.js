// import { load } from '../../utils'
import * as types from '../mutation-types'

const apiBase = {
  'production': '/api/v1',
  'development': 'http://localhost:3020/api/v1'
}

const getters = {
}

const state = {
  apiBase: apiBase[process.env.NODE_ENV],
  effect: {
    translate3d: true
  }
}

const mutations = {
  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  }
}

const actions = {
}

export default {
  state,
  actions,
  getters,
  mutations
}
