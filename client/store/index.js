import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    pkg,
    brand: {
      title: 'Cumulus Health'
    },
    requestTypes: {
      'schedule_appointment': 'Schedule an Appointment',
      'medical_advice': 'Need Advice',
      'emergency': 'Emergency',
      'find_physician': 'Find a Physician',
      'pay_bill': 'Pay Bill',
      'prescription_refill': 'Refill a Prescription'
    },
    contactMethods: {
      call: 'Call Us',
      callback: 'Receive a Call Back from Us',
      chat: 'Chat with Us',
      email: 'Email Us',
      text: 'Text Us',
      video: 'Live Video Assistance'
    }
  },
  mutations: {}
})

export default store
