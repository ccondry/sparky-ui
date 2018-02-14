// import { load } from '../../utils'
import * as types from '../mutation-types'

const state = {
  language: '',
  languages: [
    {
      code: 'en',
      language: 'English'
    },
    {
      code: 'es',
      language: 'Español'
    },
    {
      code: 'pt-br',
      language: 'Brazilian Portuguese'
    }
  ],
  localizations: []
  // localizations: {
  //   'en': {
  //     'loading': 'Loading...',
  //     'title': 'Contact Us',
  //     'subtitle': 'How Can We Help?',
  //     'choose_demo': 'Choose Your Demo Brand',
  //     'a_help': 'Help',
  //     'a_log_in': 'Log In',
  //     'a_sign_up': 'Sign Up',
  //     'main_heading': 'Online Help Center',
  //     'report_a_problem': 'Report a Problem',
  //     'ask_a_question': 'Ask a Question',
  //     'type_of_question': 'Type of Question',
  //     'o_select_category': 'Select Category',
  //     'description_of_problem': 'Description of Problem',
  //     'placeholder_description': 'Add details so our agents can best serve you...',
  //     'attach_a_photo': 'Attach a Photo',
  //     'add_photo': 'Add Photo',
  //     'remove_photo': 'Remove Photo',
  //     'add_a_location': 'Add a Location',
  //     's_street': 'Street',
  //     's_address': 'Address',
  //     's_intersection': 'Intersection',
  //     's_use_current_location': 'Use Current Location',
  //     's_mobile_use_current_location': 'Use Location',
  //     's_finding_current_location': 'Locating you now...',
  //     's_mobile_finding_current_location': 'Locating...',
  //     'placeholder_street_address': 'Enter location...',
  //     'placeholder_intersection_1': '10th St',
  //     'placeholder_intersection_2': 'Oak St',
  //     's_search': 'Search',
  //     'h_contact': 'Contact',
  //     'how_to_contact_us': 'How would you prefer to contact us?',
  //     'o_select_contact_method': 'Select Contact Method',
  //     'o_call_us': 'Call Us',
  //     'o_callback': 'Receive a Call Back from Us',
  //     'o_chat': 'Chat with Us',
  //     'o_email': 'Email Us',
  //     'o_sms': 'Text Us',
  //     'o_video': 'Live Video Assistance',
  //     'enter_your_name': 'Enter your name:',
  //     'placeholder_caller_name': 'Your Name',
  //     'enter_your_email': 'Enter your email address:',
  //     'placeholder_caller_email': 'Your Email Address',
  //     'enter_your_phone': 'Enter your phone number:',
  //     'placeholder_caller_number': 'Your Phone Number',
  //     'button_submit': 'Submit',
  //     's_call_us': 'Call Us',
  //     's_chat_with_us': 'Chat with Us',
  //     's_email_us': 'Email Us',
  //     's_call_me': 'Call Me',
  //     's_text_us': 'Text Us',
  //     's_video_us': 'Live Video Assistance'
  //   },
  //   'es': {
  //     'loading': 'Cargando...',
  //     'title': 'Contáctenos',
  //     'subtitle': '¿Cómo podemos ayudarle?',
  //     'choose_demo': 'Elija su marca de demostración',
  //     'a_help': 'Ayuda',
  //     'a_log_in': 'Iniciar Sesión',
  //     'a_sign_up': 'Regístrate',
  //     'main_heading': 'Centro de atención en Línea',
  //     'report_a_problem': 'Reportar un Problema',
  //     'ask_a_question': 'Hacer una pregunta',
  //     'type_of_question': 'Tipo de solicitud',
  //     'o_select_category': 'Seleccione la categoría',
  //     'description_of_problem': 'Descripción del problema',
  //     'placeholder_description': 'Por favor Agrege mas detalles sobre su solicitud para brindarle una mejor atención...',
  //     'attach_a_photo': 'Adjuntar una fotografía',
  //     'add_photo': 'Agregar Foto',
  //     'remove_photo': 'Eliminar Foto',
  //     'add_a_location': 'Agregar Ubicación',
  //     's_street': 'Dirección',
  //     's_address': 'de Calle',
  //     's_intersection': 'Intersección',
  //     's_use_current_location': 'Usar su ubicación actual',
  //     's_mobile_use_current_location': 'Usar ubicación',
  //     's_finding_current_location': 'Localizarte ahora...',
  //     's_mobile_finding_current_location': 'Ubicando...',
  //     'placeholder_street_address': 'Ingresar ubicación..',
  //     'placeholder_intersection_1': 'Calle 10',
  //     'placeholder_intersection_2': 'Calle 4',
  //     's_search': 'Buscar',
  //     'h_contact': 'Contacto',
  //     'how_to_contact_us': '¿Cómo le gustaría que nos pusieramos en contacto con Ud.?',
  //     'o_select_contact_method': 'Seleccione el método de contacto',
  //     'o_call_us': 'Llamarnos',
  //     'o_callback': 'Recibir una llamada de nosotros',
  //     'o_chat': 'Chat',
  //     'o_email': 'Correo Electrónico',
  //     'o_sms': 'Mensaje de Texto',
  //     'o_video': 'Atención por video',
  //     'enter_your_name': 'Nombre:',
  //     'placeholder_caller_name': 'Nombre',
  //     'enter_your_email': 'Correo Electrónico:',
  //     'placeholder_caller_email': 'Cuenta de correo',
  //     'enter_your_phone': 'Teléfono de contacto:',
  //     'placeholder_caller_number': 'Teléfono',
  //     'button_submit': 'Enviar',
  //     's_call_us': 'Llamarnos',
  //     's_chat_with_us': 'Chat',
  //     's_email_us': 'Correo electronico',
  //     's_call_me': 'Llamarme',
  //     's_text_us': 'Enviar SMS',
  //     's_video_us': 'Asistencia en vivo con video'
  //   }
  // }
}

const getters = {
  localizations: state => state.localizations,
  language: state => state.language,
  languages: state => state.languages
}

const mutations = {
  [types.SET_LANGUAGE] (state, data) {
    state.language = data
  },
  [types.SET_LOCALIZATIONS] (state, data) {
    state.localizations = data
  }
}

const actions = {
  async loadLocalizations ({dispatch}, showNotification = true) {
    await dispatch('loadToState', {
      name: 'localizations',
      path: 'mc/localizations',
      mutation: types.SET_LOCALIZATIONS,
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
