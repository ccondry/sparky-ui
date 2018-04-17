// import { load } from '../../utils'
import * as types from '../mutation-types'
import request from 'superagent'

const state = {
  messages: [],
  sessionId: null,
  sessionBody: {}
}

const getters = {
  messages: state => state.messages,
  sessionId: state => state.sessionId,
  sessionBody: state => state.sessionBody
}

const mutations = {
  [types.ADD_MESSAGE] (state, data) {
    state.messages.push(data)
  },
  [types.SET_MESSAGES] (state, data) {
    // only update the state if there are a different number of messages
    if (data.length !== state.messages.length) {
      state.messages = data
    }
  },
  [types.SET_SESSION_ID] (state, data) {
    state.sessionId = data
  },
  [types.SET_SESSION_BODY] (state, data) {
    state.sessionBody = data
  }
}

const actions = {
  setSessionBody ({commit}, body) {
    // store body
    commit(types.SET_SESSION_BODY, body)
  },
  async getSession ({dispatch, commit, getters}) {
    try {
      const uri = `${getters.apiBase}/sparky/session`
      // const body = {
      //   entryPointId,
      //   phone,
      //   email,
      //   firstName,
      //   lastName,
      //   apiAiToken,
      //   bot
      // }
      console.log('getters.sessionBody', getters.sessionBody)
      // get session from server
      const response = await request.post(uri).send(getters.sessionBody)
      console.log('get session response', response)
      commit(types.SET_SESSION_ID, response.body.sessionId)
    } catch (e) {
      console.log(e)
    }
  },
  async getMessages ({dispatch, commit, getters}) {
    try {
      const uri = `${getters.apiBase}/sparky/messages`
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
      const uri = `${getters.apiBase}/sparky/messages`
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
