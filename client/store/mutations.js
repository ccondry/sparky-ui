import * as types from './mutation-types'

const mutations = {
  [types.SET_WEB_SOCKET] (state, data) {
    state.socket = data
  },
  [types.SET_LOADING] (state, data) {
    state.loading = data
  }
}

export default mutations
