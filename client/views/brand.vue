<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>

      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <div v-if="loading">
            <center><i class="fa fa-spin fa-spinner"></i></center>
          </div>
          <div v-if="!loading">
            <h1 class="title">{{ tr.title }}</h1>

            <p class="subtitle">{{ tr.subtitle }}</p>

            <div id="question-type">
              <h2 class="title nomargin">{{ tr.type_of_question }}</h2>
              <hr>
              <div class="select is-fullwidth">
                <select v-model="requestType">
                  <option selected disabled value="">{{ tr.o_select_category }}</option>
                  <option v-for="requestType in requestTypes" :value="requestType.name">{{ requestType.title }}</option>
                </select>
              </div>
            </div>

            <br>
            <br>
            <div v-show="requestType">
              <div>
                <h3 class="title nomargin" id="description">{{ tr.description_of_problem }}</h3>
                <hr>
                <textarea class="input" v-model="description" style="min-height: 3em; width:100%;" :placeholder="tr.placeholder_description"></textarea>
              </div>

              <br>
              <br>

              <div>
                <h3 class="title nomargin">{{ tr.attach_a_photo }}</h3>
                <hr>
                <input type="file" ref="fileElem" @change="changeFileInput" accept="image/*" style="display: none" name="image">
                <button class="button is-info is-fullwidth" @click="clickAddPhoto"><i class="fa fa-camera pull-left"></i> {{ tr.add_photo }}</button>
                <img :src="photoSrc" v-if="photoSrc.length" />
              </div>

              <br>
              <br>

              <div>
                <h3 class="title nomargin">{{ tr.add_a_location }}</h3>
                <hr>
                <p class="control has-addons">
                  <a class="button" :class="locationType === 'street' ? 'is-primary' : ''" @click.prevent="locationType = 'street'">
                    <span class="icon is-small">
                      <i class="fa fa-road"></i>
                    </span>
                    <span class="is-hidden-mobile">{{ tr.s_street }}</span> <span>{{ tr.s_address }}</span>
                  </a>
                  <a class="button" :class="locationType === 'intersection' ? 'is-primary' : ''" @click.prevent="locationType = 'intersection'">
                    <span class="icon is-small">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span>{{ tr.s_intersection }}</span>
                  </a>
                  <a class="button" :class="gpsButtonClass" @click.prevent="locationType = 'gps'; getLocation()">
                    <span class="icon is-small">
                      <i class="fa" :class="locationLoading ? 'fa-spin fa-spinner' : 'fa-map-marker'"></i>
                    </span>
                    <span class="is-hidden-mobile">{{ locationLoading ? tr.s_finding_current_location : tr.s_use_current_location }}</span>
                    <span class="is-hidden-tablet">{{ locationLoading ? tr.s_mobile_finding_current_location : tr.s_mobile_use_current_location }}</span>
                  </a>
                </p>
                <div v-show="locationType === 'street'">
                  <input class="input" v-model="streetAddress" :placeholder="tr.placeholder_street_address">
                </div>
                <div v-show="locationType === 'intersection'">
                  <input class="input" v-model="intersection1" :placeholder="tr.placeholder_intersection_1">
                  <input class="input" v-model="intersection2" :placeholder="tr.placeholder_intersection_2">
                </div>
              </div>

              <br>

              <div>
                <h3 class="title nomargin">{{ tr.h_contact }}</h3>
                <hr>
                <div class="select is-fullwidth">
                  <select v-model="contactMethod">
                    <option selected disabled value="">{{ tr.o_select_contact_method }}</option>
                    <option v-for="(method, key) in contactMethods" :value="key">{{ method.text }}</option>
                  </select>
                </div>
                <div v-if="contactMethod">
                  <div v-show="!['sms'].includes(contactMethod)">
                    {{ tr.enter_your_name }}
                    <input class="input" v-model="name" :placeholder="tr.placeholder_caller_name">
                  </div>
                  <div v-show="!['sms', 'email'].includes(contactMethod)">
                    {{ tr.enter_your_phone }}
                    <input class="input" v-model="phone" :placeholder="tr.placeholder_caller_number">
                  </div>
                  <div v-show="['chat', 'email'].includes(contactMethod)">
                    {{ tr.enter_your_email }}
                    <input class="input" v-model="email" :placeholder="tr.placeholder_caller_email">
                  </div>
                  <br>
                  <button class="button is-success is-fullwidth" :class="working ? 'is-loading' : ''" @click="submit" :disabled="working || !submitIsEnabled"><i class="pull-left" :class="contactMethods[contactMethod].icon"></i> {{ contactMethods[contactMethod].text }}</button>
                </div>
              </div>

            </div>
          </div>
        </article>
      </div>

      <div class="tile is-parent is-3 is-hidden-mobile"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

function randomString (length, chars) {
  let mask = ''
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.indexOf('#') > -1) mask += '0123456789'
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  let result = ''
  for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)]
  return result
}

export default {
  data () {
    return {
      requestType: '',
      description: '',
      contactMethod: '',
      name: '',
      phone: '',
      email: '',
      locationType: 'gps',
      latitude: '',
      longitude: '',
      intersection1: '',
      intersection2: '',
      streetAddress: '',
      photoSrc: '',
      locationLoading: false,
      dnis: '9194745516',
      working: false,
      feedId: '100020',
      imgUrl: null,
      randomId: ''
      // requestTypesLoading: false
    }
  },
  mounted () {
    // this.getRequestTypes()
    // this.getBrand(this.email)
    this.getLocation()
    // generate random ID for this session, if phone number is not used
    this.randomId = randomString(10, '#')
    // load localStorage data for pre-filling form
    if (window.localStorage.name) this.name = window.localStorage.name
    if (window.localStorage.phone) this.phone = window.localStorage.phone
    if (window.localStorage.email) this.email = window.localStorage.email
  },
  computed: {
    ...mapGetters([
      'pkg',
      'brands',
      // 'requestTypes',
      // 'contactMethods',
      'language',
      'localizations',
      'loading'
    ]),
    requestTypes () {
      try {
        return this.brands.find(v => v.name === this.brand && v.data.language === this.language).data.requestTypes
      } catch (e) {
        return []
      }
    },
    ani () {
      // use the phone number if available, or else use the randomly generated ID
      if (this.phone.length && this.validatePhone) {
        return this.phone
      } else {
        return this.randomId
      }
    },
    submitIsEnabled () {
      switch (this.contactMethod) {
        case 'call': return this.validatePhone
        case 'callback': return this.validatePhone
        case 'sms': return true
        case 'chat': return this.validatePhone && this.validateEmail
        case 'email': return this.validateEmail
        case 'video': return this.validatePhone
      }
    },
    validatePhone () {
      // numbers only
      const searchRegex = new RegExp(/^\d+$/)
      return searchRegex.test(this.phone) && this.phone.length
    },
    validateEmail () {
      // email address
      const searchRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      return searchRegex.test(this.email)
    },
    gpsButtonClass () {
      let c = ''
      if (this.locationType === 'gps') {
        c += 'is-primary '
      }
      // if (this.locationLoading) {
      //   c += 'is-loading'
      // }
      return c
    },
    contactMethods () {
      return {
        call: {
          text: this.tr.o_call_us,
          icon: 'fa fa-phone'
        },
        callback: {
          text: this.tr.o_callback,
          icon: 'fa fa-phone'
        },
        chat: {
          text: this.tr.o_chat,
          icon: 'fa fa-comment'
        },
        email: {
          text: this.tr.o_email,
          icon: 'fa fa-envelope'
        },
        sms: {
          text: this.tr.o_sms,
          icon: 'fa fa-comments'
          // },
          // video: {
          //   text: this.tr.o_video,
          //   icon: 'fa fa-video-camera'
        }
      }
    },
    tr () {
      return this.localization.data || {}
    },
    localization () {
      return this.localizations.find(v => v.name === this.language) || {}
    },
    language () {
      return this.$route.params.language
    },
    brand () {
      return this.$route.params.brand
    },
    callbackFormData () {
      return {
        feedId: this.feedId,
        contact: {
          name: this.name,
          title: this.requestTypes[this.requestType] || this.tr.title || 'Mobile Connect',
          description: this.description,
          mediaAddress: this.ani,
          tags: this.tags,
          variables: this.variables
        }
      }
    },
    variables: function () {
      // add call variables
      let v = []
      for (let i = 0; i < 10; i++) {
        if (this.cvs[i].length) {
          v.push({
            name: 'cv_' + (i + 1),
            value: this.cvs[i]
          })
        }
      }
      // add call variable layout setting
      v.push({
        name: 'user_user.Layout',
        value: 'Mobile Connect'
      })
      return v
    },
    cvs () {
      return [
        this.name, // cv1
        `${this.latitude}, ${this.longitude}`, // cv2
        this.language, // cv3
        '', // cv4
        '', // cv5
        this.email, // cv6
        this.brand, // cv7
        'Mobile Connect', // cv8
        this.requestType, // cv9
        '' // cv10
      ]
    }
  },
  watch: {
    // brand (val, oldVal) {
    //   // brand was changed - reload the request types
    //   this.getRequestTypes()
    // },
    requestType (val, oldVal) {
      // scroll to description (using question-type div) when request type is
      // first selected
      console.log('request type changed')
      if (oldVal === '') {
        this.$nextTick(function () {
          this.$scrollTo('#question-type', 1000)
        })
      }
    },
    contactMethod (val, oldVal) {
      // scroll to bottom of page when contact method changes
      console.log('contact method changed')
      this.$nextTick(function () {
        this.$scrollTo('#footer', 1000)
      })
    },
    photoSrc (val, oldVal) {
      // scroll to bottom of page when photo is attached
      console.log('photo src changed')
      this.$nextTick(function () {
        this.$scrollTo('#footer', 1000)
      })
    }
  },
  methods: {
    ...mapActions([
      'sendCallData',
      'notification',
      'sendCallbackRequest',
      'sendEmail',
      'shortenUrl',
      'uploadImage',
      'openChat'
      // 'loadRequestTypes'
    ]),
    // async getRequestTypes () {
    //   this.requestTypesLoading = true
    //   try {
    //     await this.loadRequestTypes({brand: this.brand, showNotification: false})
    //   } catch (e) {
    //     // continue
    //   } finally {
    //     this.requestTypesLoading = false
    //   }
    // },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
        this.locationLoading = true
      } else {
        this.notification({
          title: 'GPS location not available',
          message: 'Geolocation is not supported by this browser',
          type: 'danger',
          duration: 8000
        })
      }
    },
    clickAddPhoto (event) {
      console.log('clickAddPhoto')
      this.$refs.fileElem.click()
    },
    changeFileInput (event) {
      console.log('addPhoto', event)
      if (event.target.files && event.target.files[0]) {
        const reader = new window.FileReader()

        reader.onload = (e) => {
          console.log('reader onload', e)
          // set src of attach photo
          this.photoSrc = e.currentTarget.result
          // $('#attach-photo').attr('src', /)
          // show photo
          // $('#attach-photo').show()
          // $("#btn-remove-photo").css('display','table-cell')
        }

        reader.readAsDataURL(event.target.files[0])
      }
    },
    showPosition (pos) {
      this.locationLoading = false
      this.latitude = pos.coords.latitude
      this.longitude = pos.coords.longitude
      // this.accuracy = pos.coords.accuracy
      console.log('Your current position is:')
      console.log(`Latitude : ${this.latitude}`)
      console.log(`Longitude: ${this.longitude}`)
      console.log(`More or less ${pos.coords.accuracy} meters.`)
    },
    async submit () {
      this.working = true
      // store/update localStorate data with form data, if set
      if (this.name.length) window.localStorage.name = this.name
      if (this.phone.length) window.localStorage.phone = this.phone
      if (this.email.length) window.localStorage.email = this.email
      // upload call data
      const p1 = this.sendCallData({
        requestType: this.requestType,
        description: this.description,
        contactMethod: this.contactMethod,
        name: this.name,
        ani: this.ani,
        email: this.email,
        locationType: this.locationType,
        latitude: this.latitude + '',
        longitude: this.longitude + '',
        intersection1: this.intersection1,
        intersection2: this.intersection2,
        streetAddress: this.streetAddress,
        language: this.language,
        brand: this.brand
      })
      // upload image
      const p2 = this.uploadImage({
        ani: this.ani,
        image: this.photoSrc
      })
      // wait for uploads to resolve
      try {
        await Promise.all([p1, p2])
        // save image long URL
        // this.imgUrl = `https://link.cxdemo.net/`
        this.imgUrl = `https://toolbox-dev.cxdemo.net/api/v5/mc/image/${this.ani}`
        this.working = false
        switch (this.contactMethod) {
          case 'call': this.startCall(); break
          case 'callback': this.startCallback(); break
          case 'sms': this.startSms(); break
          case 'chat': this.startChat(); break
          case 'email': this.startEmail(); break
        }
      } catch (e) {
        this.working = false
        this.notification({
          title: 'Failed to send your information',
          message: e,
          type: 'danger'
        })
      }
    },
    startCall () {
      console.log('start call')
      window.location = 'tel:' + this.dnis
    },
    startCallback () {
      console.log('start callback')
      this.sendCallbackRequest(this.callbackFormData)
    },
    async startSms () {
      console.log('start sms')
      const message = await this.getMessage()
      console.log('opening sms')
      // open native SMS application
      const encodedBody = encodeURIComponent(message)
      window.location = `sms:${this.smsDnis}&body=${encodedBody}`
    },
    async startChat () {
      console.log('start chat')
      const message = await this.getMessage()
      console.log('opening the chat window', message)
      this.openChat({
        name: this.name,
        email: this.email,
        ani: this.ani,
        message
      })
    },
    async startEmail () {
      console.log('start email')
      // const message = await this.getMessage()
      const htmlMessage = await this.getHtmlMessage()
      const mailOptions = {
        name: this.name,
        email: this.email,
        subject: this.requestTypes[this.requestType], // Subject line
        // text: message, // plain text body
        html: htmlMessage // html body
      }
      try {
        await this.sendEmail(mailOptions)
        this.notification({
          title: 'Email sent',
          message: 'An agent will respond to your email in 10-20 minutes.',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        this.notification({
          title: 'Failed to send email',
          message: 'Sorry, we failed to send your email to an agent. Please try again later.',
          type: 'danger'
        })
      }
    },
    async getMessage () {
      let rt = this.requestTypes[this.requestType] || this.tr.title || 'Mobile Connect'
      console.log('rt', rt)
      let message = `${rt} at ${this.latitude}, ${this.longitude}`
      try {
        if (this.imgUrl) {
          const response = await this.shortenUrl(this.imgUrl)
          const shortUrl = response.data.link
          console.log('got short URL:', shortUrl)
          // add image to message, if one was set and a valid short URL returned
          if (shortUrl) {
            message += `\r\nimage: ${shortUrl}`
          }
        }
      } catch (error) {
        console.log(error)
      }
      // add description to message
      message += `\r\n${this.description}`
      console.log('message', message)
      return message
    },
    async getHtmlMessage () {
      let message = `Request: ${this.requestTypes[this.requestType]}`
      // add location to message
      let link = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}`
      message += `<br>Location: <a href="${link}">${this.latitude}, ${this.longitude}</a>`
      // add description to message
      message += `<br>Description: ${this.description}`
      // try to add shortened URL for image
      try {
        if (this.imgUrl) {
          const response = await this.shortenUrl(this.imgUrl)
          const shortUrl = response.data.link
          console.log('got short URL:', shortUrl)
          // add image to message, if one was set and a valid short URL returned
          if (shortUrl) {
            message += `<br><img src="${shortUrl}">`
          }
        }
      } catch (error) {
        console.log(error)
      }
      return message
    }
  }
}
</script>
<style lang="scss">
hr {
  margin: 0.5rem 0;
}
.nomargin {
  margin: 0 !important;
}
</style>
