import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
import * as types from './mutation-types'

Vue.use(Vuex)

let loc = window.location
let wsAddress
if (loc.protocol === 'https:') {
  wsAddress = 'wss:'
} else {
  wsAddress = 'ws:'
}
wsAddress += '//' + loc.host + '/api/v1'

// Create a socket instance
const socket = new window.WebSocket(wsAddress)

// Open the socket
socket.onopen = function (event) {
  console.log('websocket open to', wsAddress)
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    pkg,
    loading: true,
    socket
  },
  mutations: {
    [types.SET_LOADING] (state, data) {
      state.loading = data
    }
  }
})

// Listen for messages
socket.onmessage = function (event) {
  console.log('websocket received a message:', event.data)
  // dispatch message to store it in state
  store.dispatch('addWsMessage', JSON.parse(event.data))
}

// Listen for socket close
socket.onclose = function (event) {
  console.log('websocket closed:', event)
  store.dispatch('addWsMessage', {
    text: 'Your chat session has ended.',
    type: 'system'
  })
}

export default store
