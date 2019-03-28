import * as types from './mutation-types'
import { load, put, post } from '../utils'

export const connectWebSocket = ({ commit, dispatch, rootState, getters }) => {
  // Create a socket instance
  const socket = new window.WebSocket(getters.wsAddress)

  // Open the socket
  socket.onopen = function (event) {
    console.log('websocket open to', getters.wsAddress)
    // set open in state
    commit(types.SET_WEB_SOCKET_OPEN, true)
  }

  // Listen for messages
  socket.onmessage = function (event) {
    console.log('websocket received a message:', event.data)
    // dispatch message to store it in state
    dispatch('addWsMessage', JSON.parse(event.data))
  }

  // Listen for socket close
  socket.onclose = function (event) {
    console.log('websocket closed:', event)
    // mark socket closed
    commit(types.SET_WEB_SOCKET_OPEN, false)
    if (event.code === 1005) {
      // don't reconnect
      dispatch('addWsMessage', {
        text: 'Your chat session has ended.',
        type: 'system'
      })
    } else if (event.code === 1006) {
      // reconnect the web socket
      dispatch('connectWebSocket')
    }
  }
  commit(types.SET_WEB_SOCKET, socket)
}

export const switchEffect = ({ commit }, data) => {
  if (data) {
    commit(types.SWITCH_EFFECT, data)
  }
}

export const loadToState = async function ({getters, commit, dispatch}, options) {
  if (!options.mutation) {
    const message = 'error during loadToState ' + options.name + ' - options.mutation was undefined. Verify that the mutation type constant is in mutation-types.js'
    console.log(message)
    return
    // throw Error(message)
  }
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
    dispatch('notification', {
      title: 'Callback Request Scheduled',
      message: 'An agent will be calling you in approximately 2 minutes.',
      type: 'success'
    })
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

export const setLoading = async function ({commit}, data) {
  commit(types.SET_LOADING, data)
}

export const shortenUrl = async function ({getters, commit, dispatch}, data) {
  try {
    console.log(`shortenUrl data`, data)
    const response = await post(getters, 'link', {}, {longUrl: data})
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

// export const openChat = function ({getters, commit, dispatch}, data) {
//   try {
//     console.log(`open chat`, data)
//     // data.name
//     // data.email
//     // data.ani
//     // data.message
//     // https://ece2.cxdemo.net/system/templates/chat/kiwi/chat.html?subActivity=Chat&entryPointId=1006&templateName=kiwi_alto&languageCode=en&countryCode=US&ver=v11
//     const template = 'aqua'
//     const entryPointId = '1002'
//     const locale = 'en-US'
//     let url = `https://ece2.cxdemo.net/system/templates/chat/${template}/chat.html`
//     url += `?subActivity=Chat&entryPointId=${entryPointId}&templateName=${template}&languageCode=${locale.split('-')[0]}&countryCode=${locale.split('-')[1]}&ver=v11`
//     url += `&fieldname1=${encodeURIComponent(data.name)}&fieldname2=${data.email}&fieldname3=${data.ani}&fieldname4=${data.message}`
//     // window.location = url
//     window.open(url, '_blank', 'width=400,height=600')
//   } catch (error) {
//     console.log(`error opening chat`, error)
//     // dispatch('errorNotification', {title: `Failed to send email`, error})
//   }
// }

export const openChat = function ({commit, state, getters, rootState, dispatch}, data) {
  const egainChat = {
    /* eGain Chat server */
    serverURL: 'https://ece2.cxdemo.net/system',
    /* eGain Chat Entry Point */
    EntryPointId: '1001',
    /* eGain Chat Locale */
    Locale: 'en-US',
    /* eGain template name */
    Template: 'aqua',
    /* Set to true to enable posting attributes to templates */
    PostChatAttributes: true,
    CustomerContextParameters: {},
    /* To be called by client website. All the parameters specified in
    application-chat-defaults must be set here. */
    SetCustomerParameters: function (egainAttributeName, attributeValue) {
      egainChat.CustomerContextParameters[egainAttributeName] = attributeValue
    },
    /* main chat start function */
    openHelp: function () {
      var domainRegex = /^((?:https?:\/\/)?(?:www\.)?([^/]+))/i
      try {
        if (egainChat.eglvchathandle !== null && egainChat.eglvchathandle.closed === false) {
          egainChat.eglvchathandle.focus()
          return
        }
      } catch (err) {
      }
      // send form data to fill the form after the window pops open
      egainChat.SetCustomerParameters('fieldname_1', data.name)
      egainChat.SetCustomerParameters('fieldname_2', data.email)
      egainChat.SetCustomerParameters('fieldname_3', data.ani)
      egainChat.SetCustomerParameters('fieldname_4', data.message)
      // egainChat.SetCustomerParameters('fieldname_5', true)

      var refererName = ''
      refererName = encodeURIComponent(refererName)
      var refererurl = encodeURIComponent(document.location.href)
      var hashIndex = refererurl.lastIndexOf('#')
      if (hashIndex !== -1) {
        refererurl = refererurl.substring(0, hashIndex)
      }
      var eglvcaseid = (/eglvcaseid=[0-9]*/gi).exec(window.location.search)
      var vhtIds = ''
      if (typeof window.EGAINCLOUD !== 'undefined' && window.EGAINCLOUD.Account.getAllIds) {
        var ids = window.EGAINCLOUD.Account.getAllIds()
        vhtIds = '&aId=' + ids.a + '&sId=' + ids.s + '&uId=' + ids.u
      }
      var EG_CALL_Q = window.EG_CALL_Q || []
      EG_CALL_Q.push(['enableTracker', true])
      var eGainChatUrl = egainChat.serverURL + '/templates/chat/' + egainChat.Template + '/index.html?entryPointId=' + egainChat.EntryPointId

      eGainChatUrl += '' + '&templateName=' + egainChat.Template + '&locale=' + egainChat.Locale + '&ver=v11'
      eGainChatUrl += '&postChatAttributes=' + egainChat.PostChatAttributes + '&eglvrefname=' + refererName + '&' + eglvcaseid + vhtIds

      var domain = domainRegex.exec(eGainChatUrl)[0]

      if ((eGainChatUrl + refererurl).length <= 2000) {
        eGainChatUrl += '&referer=' + refererurl
      }
      var params = 'height=650,width=450,resizable=yes,scrollbars=yes,toolbar=no'

      if (egainChat.PostChatAttributes) {
        window.addEventListener('message', function (event) {
          try {
            var message = JSON.parse(event.data)
            if (event.origin === domain && message.Caller.indexOf('EGLV_DOCK') !== -1) {
              if (message.Key === 'EgainChatParameter') {
                var response = {
                  value: egainChat.CustomerContextParameters,
                  caller: message.Caller
                }
                event.source.postMessage(JSON.stringify(response), event.origin)
              }
            }
          } catch (e) {
          }
        })
      }
      egainChat.eglvchathandle = window.open(eGainChatUrl, '', params)
    }
  }
  egainChat.openHelp()
}
