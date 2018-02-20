// import { load } from '../../utils'
import * as types from '../mutation-types'
import request from 'superagent'

const state = {
  messages: [],
  sessionId: null
}

const getters = {
  messages: state => state.messages,
  sessionId: state => state.sessionId
}

const mutations = {
  [types.ADD_MESSAGE] (state, data) {
    state.messages.push(data)
  },
  [types.SET_MESSAGES] (state, data) {
    state.messages = data
  },
  [types.SET_SESSION_ID] (state, data) {
    state.sessionId = data
  }
}

const actions = {
  async getSession ({dispatch, commit}) {
    try {
      const uri = `http://localhost:3020/api/v1/session`
      const response = await request.get(uri)
      console.log('get session response', response)
      commit(types.SET_SESSION_ID, response.body.sessionId)
    } catch (e) {
      console.log(e)
    }
  },
  async getMessages ({dispatch, commit, getters}) {
    try {
      const uri = `http://localhost:3020/api/v1/messages`
      const query = {
        sessionId: getters.sessionId
      }
      const response = await request
      .get(uri)
      .query(query)

      // console.log('get messages response', response)
      commit(types.SET_MESSAGES, response.body)
      // dispatch('addMessage', {
      //   text: response.body.result.fulfillment.speech,
      //   type: 'bot'
      // })
    } catch (e) {
      console.error(e)
      console.log('e.status', e.status)
      // invalid session - get new session
      if (e.status === 400) {
        dispatch('getSession')
      }
    }
  },
  async addMessage ({commit, getters}, data) {
    try {
      const uri = `http://localhost:3020/api/v1/messages`
      const response = await request
      .post(uri)
      .send({
        text: data.text,
        sessionId: getters.sessionId
      })

      console.log('add message response', response)
      // add the message to the local store so that it shows immediately
      commit(types.ADD_MESSAGE, {
        text: data.text,
        type: 'customer'
      })
      // dispatch('addMessage', {
      //   text: response.body.result.fulfillment.speech,
      //   type: 'bot'
      // })
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
