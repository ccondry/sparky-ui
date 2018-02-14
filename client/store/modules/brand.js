import * as types from '../mutation-types'

const state = {
  brands: []
}

const getters = {
  brands: state => state.brands
}

const mutations = {
  [types.SET_BRANDS] (state, data) {
    state.brands = data
  }
}

const actions = {
  async loadBrands ({dispatch}, showNotification = true) {
    await dispatch('loadToState', {
      name: 'brands',
      path: 'mc/brands',
      mutation: types.SET_BRANDS,
      showNotification
    })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
