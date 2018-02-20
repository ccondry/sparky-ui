// import { load } from '../../utils'
import * as types from '../mutation-types'

const state = {
  messages: [
    {
      type: 'right',
      text: 'Hello'
    },
    {
      type: 'left',
      text: 'Hello there!'
    },
    {
      type: 'right',
      text: 'bleep'
    },
    {
      type: 'left',
      text: `I'm sorry, there seems to be a little noise. Can you please say that again?`
    }
  ]
}

const getters = {
  messages: state => state.messages
}

const mutations = {
  [types.ADD_MESSAGE] (state, data) {
    state.messages.push(data)
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
