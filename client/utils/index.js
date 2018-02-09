import axios from 'axios'

export const load = async function (getters, path, query) {
  try {
    const options = {
      params: query
    }
    if (getters.authEnabled === true) {
      const jwt = getters.jwt
      options.headers = {
        Authorization: 'Bearer ' + jwt
      }
    }
    return await axios.get(`${getters.apiBase}/${path}`, options)
  } catch (e) {
    throw e
  }
}

export const put = async function (getters, path, query, data) {
  try {
    const options = {
      params: query
    }
    if (getters.authEnabled === true) {
      const jwt = getters.jwt
      options.headers = {
        Authorization: 'Bearer ' + jwt
      }
    }
    return await axios.put(`${getters.apiBase}/${path}`, data, options)
  } catch (e) {
    throw e
  }
}

export const post = async function (getters, path, query, data) {
  try {
    const options = {
      params: query
    }
    if (getters.authEnabled === true) {
      const jwt = getters.jwt
      options.headers = {
        Authorization: 'Bearer ' + jwt
      }
    }
    return await axios.post(`${getters.apiBase}/${path}`, data, options)
  } catch (e) {
    throw e
  }
}
