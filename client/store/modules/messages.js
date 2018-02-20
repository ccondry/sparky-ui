// import { load } from '../../utils'
import * as types from '../mutation-types'
import request from 'superagent'

const state = {
  messages: []
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
  async addMessage ({dispatch, commit}, data) {
    // add the message to the state
    commit(types.ADD_MESSAGE, data)
    // if this is input from the user, send the request to AI engine
    if (data.type === 'customer') {
      const uri = `https://api.api.ai/v1/query`
      const query = {
        v: '20170910'
      }
      const body = {
        q: data.text,
        lang: 'en',
        sessionId: '346d2f0c-60b9-470c-a7ed-6ca53c5cd7d4'
      }
      const accessToken = '1c4d3b458b3f4109bec0b38f792cfc46'
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Accept': `application/json`,
        'Content-Type': `application/json; charset=utf-8`
      }
      // const options = {
      //   method: 'POST',
      //   query,
      //   uri,
      //   body,
      //   json: true,
      //   headers
      // }

      try {
        // const response = await request(options)
        const response = await request
        .post(uri)
        .query(query)
        .send(body)
        .set(headers)

        console.log(response)
        dispatch('addMessage', {
          text: response.body.result.fulfillment.speech,
          type: 'bot'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
