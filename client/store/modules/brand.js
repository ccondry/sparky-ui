// import { load } from '../../utils'
import * as types from '../mutation-types'

const state = {
  brands: [
    {
      id: 'health',
      title: 'Cumulus Health',
      language: 'en'
    },
    {
      id: 'travel',
      title: 'Cumulus Travel',
      language: 'en'
    },
    {
      id: 'finance',
      title: 'Cumulus Finance',
      language: 'en'
    },
    {
      id: 'health',
      title: 'Cumulus Salud',
      language: 'es'
    }
  ],
  requestTypes: {
    'schedule_appointment': 'Schedule an Appointment',
    'medical_advice': 'Need Advice',
    'emergency': 'Emergency',
    'find_physician': 'Find a Physician',
    'pay_bill': 'Pay Bill',
    'prescription_refill': 'Refill a Prescription'
  }
}

const getters = {
  brands: state => state.brands,
  requestTypes: state => state.requestTypes
}

const mutations = {
  [types.SET_BRANDS] (state, data) {
    state.brands = data
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
