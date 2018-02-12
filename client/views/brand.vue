<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>

      <div class="tile is-parent is-6">
        <article class="tile is-child box">

          <h1 class="title">{{ tr.title }}</h1>

          <p class="subtitle">{{ tr.subtitle }}</p>

          <div>
            <h2 class="title nomargin">{{ tr.type_of_question }}</h2>
            <hr>
            <div class="select is-fullwidth">
              <select v-model="requestType">
                <option selected disabled value="">{{ tr.o_select_category }}</option>
                <option v-for="(requestType, key) in requestTypes" :value="key">{{ requestType }}</option>
              </select>
            </div>
          </div>

          <br>
          <br>

          <div>
            <h3 class="title nomargin">{{ tr.description_of_problem }}</h3>
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
                <span>{{ tr.s_street }} {{ tr.s_address }}</span>
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
                <span>{{ locationLoading ? 'Locating you now...' : tr.s_use_current_location }}</span>
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
              <div v-show="!['email', 'sms'].includes(contactMethod)">
                {{ tr.enter_your_name }}
                <input class="input" v-model="name" :placeholder="tr.placeholder_caller_name">
              </div>
              <div v-show="!['email', 'sms'].includes(contactMethod)">
                {{ tr.enter_your_phone }}
                <input class="input" v-model="ani" :placeholder="tr.placeholder_caller_number">
              </div>
              <div v-show="['chat'].includes(contactMethod)">
                {{ tr.enter_your_email }}
                <input class="input" v-model="email" :placeholder="tr.placeholder_caller_email">
              </div>
              <br>
              <button class="button is-success is-fullwidth" :class="working ? 'is-loading' : ''" @click="submit" :disabled="working"><i class="pull-left" :class="contactMethods[contactMethod].icon"></i> {{ contactMethods[contactMethod].text }}</button>
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

export default {
  data () {
    return {
      requestType: '',
      description: '',
      contactMethod: '',
      name: '',
      ani: '',
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
      feedId: '100020'
    }
  },
  mounted () {
    // this.getBrand(this.email)
    this.getLocation()
  },
  computed: {
    ...mapGetters([
      'pkg',
      'brands',
      'requestTypes',
      // 'contactMethods',
      'language',
      'localizations'
    ]),
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
        },
        video: {
          text: this.tr.o_video,
          icon: 'fa fa-video-camera'
        }
      }
    },
    // email () {
    //   return this.$route.params.email
    // },
    tr () {
      return this.localizations[this.language] || {}
    },
    language () {
      return this.$route.params.language
    },
    brand () {
      return this.$route.params.brand
    }
  },
  watch: {
    // locationType (val, oldVal) {
    //   if (val === 'gps') {
    //     this.getLocation()
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'sendCallData',
      'notification',
      'sendCallbackRequest',
      'sendEmail',
      'shortenUrl',
      'uploadImage'
    ]),
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
    async startCallback () {
      console.log('start callback')
      let params = {
        // TODO fix format
        // instance: config.instance,
        feedId: this.feedId,
        mediaAddress: this.ani,
        name: this.name,
        title: this.title,
        description: this.description,
        // cv1: ani,
        cv2: this.name,
        cv5: this.requestType,
        cv6: this.brand,
        cv9: this.language,
        cv10: `${this.latitude}, ${this.longitude}`
        // userid: QueryString.uui
      }
      try {
        await this.sendCallbackRequest(params)
        this.notification({
          title: 'Callback Request Scheduled',
          message: 'An agent will be calling you in approximately 2 minutes.',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
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
      console.log('opening the chat window')
      this.openChat(this.name, this.email, this.ani, message)
    },
    async startEmail () {
      console.log('start email')
      const message = await this.getMessage()
      const mailOptions = {
        from: `"${this.name || ''}" <${this.email}>`, // sender address
        // to: req.body.to ? `${req.body.to}@dcloud.cisco.com` : process.env.email_to_egain, // list of receivers
        subject: this.requestTypes[this.requestType], // Subject line
        text: message // plain text body
        // html: req.body.html || '' // html body
      }
      try {
        await this.sendEmail({mailOptions})
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
      let message = `${this.requestTypes[this.requestType]} at ${this.latitude}, ${this.longitude}`
      try {
        const shortUrl = await this.shortenUrl(this.imgUrl)
        console.log('got short URL:', shortUrl)
        // add image to message, if one was set and a valid short URL returned
        if (shortUrl) {
          message += `\r\nimage: ${shortUrl}`
        }
      } catch (error) {
        console.log(error)
      }
      // add description to message
      message += `\r\n${this.description}`
      return message
    }
  }
}
</script>
<style>
hr {
  margin: 0.5rem 0;
}
.nomargin {
  margin: 0 !important;
}
</style>
