import * as types from './mutation-types'
import { load, put, post } from '../utils'

export const switchEffect = ({ commit }, data) => {
  if (data) {
    commit(types.SWITCH_EFFECT, data)
  }
}

export const loadToState = async function ({getters, commit, dispatch}, options) {
  try {
    const response = await load(getters, options.path, options.query)
    console.log(`GET ${options.name}`, response)
    let data
    if (typeof options.transform === 'function') {
      data = options.transform(response)
    } else {
      data = response.data
    }
    commit(options.mutation, data)
    if (options.showNotification) {
      dispatch('successNotification', `Successful GET ${options.name}`)
    }
  } catch (e) {
    console.error(`error during GET ${options.name}`, e)
    dispatch('errorNotification', {title: `Failed to GET ${options.name}`, error: e})
  }
}

export const putData = async function ({getters, commit, dispatch}, options) {
  try {
    console.log(`putData ${options.path}`, options.data)
    const response = await put(getters, options.path, options.query, options.data)
    console.log(`put ${options.name}`, response)
    if (options.showNotification) {
      dispatch('successNotification', `Successful PUT ${options.name}`)
    }
  } catch (e) {
    console.log(`error during PUT ${options.name}`, e)
    dispatch('errorNotification', {title: `Failed to PUT ${options.name}`, error: e})
  }
}

export const postData = async function ({getters, commit, dispatch}, options) {
  try {
    console.log(`postData ${options.path}`, options.data)
    const response = await post(getters, options.path, options.query, options.data)
    console.log(`post ${options.name}`, response)
    if (options.showNotification) {
      dispatch('successNotification', `Successful POST ${options.name}`)
    }
  } catch (e) {
    console.log(`error during POST ${options.name}`, e)
    dispatch('errorNotification', {title: `Failed to POST ${options.name}`, error: e})
  }
}
