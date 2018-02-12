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

export const sendCallData = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`sendCallData data`, data)
    const response = await post(getters, 'mc/call', {}, data)
    console.log(`sendCallData response`, response)
    // dispatch('successNotification', `Successfully sent call data`)
  } catch (error) {
    console.log(`error sending call data`, error)
    dispatch('errorNotification', {title: `Failed to send call data`, error})
  }
}

export const sendCallbackRequest = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`sendCallbackRequest data`, data)
    const response = await post(getters, 'sm/agent-request', {}, data)
    console.log(`sendCallbackRequest response`, response)
    // dispatch('successNotification', `Successfully sent call data`)
  } catch (error) {
    console.log(`error sending callback request`, error)
    dispatch('errorNotification', {title: `Failed to send callback request`, error})
  }
}

export const sendEmail = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`sendEmail data`, data)
    const response = await post(getters, 'email/ece', {}, data)
    console.log(`sendEmail response`, response)
    // dispatch('successNotification', `Successfully sent call data`)
  } catch (error) {
    console.log(`error sending email request`, error)
    dispatch('errorNotification', {title: `Failed to send email`, error})
  }
}

export const shortenUrl = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`shortenUrl data`, data)
    const response = await post(getters, 'link', {}, data)
    console.log(`shortenUrl response`, response)
    return response
    // dispatch('successNotification', `Successfully sent call data`)
  } catch (error) {
    console.log(`error getting short URL`, error)
    // dispatch('errorNotification', {title: `Failed to send email`, error})
  }
}

export const uploadImage = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`uploadImage data`, data)
    const response = await post(getters, 'mc/image', {}, data)
    console.log(`uploadImage response`, response)
    return response
    // dispatch('successNotification', `Successfully sent call data`)
  } catch (error) {
    console.log(`error uploading image`, error)
    // dispatch('errorNotification', {title: `Failed to send email`, error})
  }
}
