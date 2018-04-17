<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <navbar :show="true" :logo="logo"></navbar>
    <app-main v-if="connecting"></app-main>
    <div v-if="!connecting">
      <section class="app-main">
        <div class="container is-fluid is-marginless app-content">
          <div class="tile is-ancestor">
            <!-- left section -->
            <div class="tile is-parent is-4 is-hidden-mobile"></div>
            <!-- center section -->
            <div class="tile is-parent is-4">
              <article class="tile is-child box">
                <form @submit.enter="submit">
                  <div class="block">
                    <label class="label">First Name</label>
                    <input class="input" v-model="firstName">
                  </div>
                  <div class="block">
                    <label class="label">Last Name</label>
                    <input class="input" v-model="lastName">
                  </div>
                  <div class="block">
                    <label class="label">Phone Number</label>
                    <input class="input" v-model="phone">
                  </div>
                  <div class="block">
                    <label class="label">Email Address</label>
                    <input class="input" v-model="email">
                  </div>
                  <div class="block">
                    <button class="button is-success" @click.prevent="submit">Start Chat</button>
                  </div>
                </form>
              </article>
            </div>
            <!-- right section -->
            <div class="tile is-parent is-4 is-hidden-mobile"></div>
          </div>
        </div>
      </section>
    </div>
    <!-- <footer-bar></footer-bar> -->
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, AppMain, FooterBar } from 'components/layout/'
import { mapActions, mapGetters } from 'vuex'

export default {
  created () {
    window.document.title = 'Cumulus Travel'
  },
  data () {
    return {
      logo: 'https://cxdemo.net/users/ccondry/altocloud/logo.png',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      connecting: false
    }
  },
  components: {
    Navbar,
    AppMain,
    FooterBar,
    NprogressContainer
  },
  async mounted () {
    // try to get customer info from URL params
    this.firstName = this.$route.query.firstName
    this.lastName = this.$route.query.lastName
    this.email = this.$route.query.email
    this.phone = this.$route.query.phone

    // check that form is filled
    if (this.firstName.length && this.lastName.length && this.email.length && this.phone.length) {
      // start the session
      this.startSession()
    }
  },
  methods: {
    ...mapActions(['getSession', 'setLoading', 'setSessionBody']),
    startSession () {
      this.setSessionBody({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        dcloudSession: this.$route.query.session,
        dcloudDatacenter: this.$route.query.datacenter,
        entryPointId: this.$route.query.entryPointId,
        // title: this.$route.query.title,
        // logo: this.$route.query.logo,
        apiAiToken: this.$route.query.apiAiToken,
        bot: this.$route.query.bot,
        visitId: this.$route.query.visitId
      })
    },
    submit () {
      console.log('submit form')
      this.startSession()
    }
  },
  computed: {
    ...mapGetters(['loading', 'sessionBody'])
  },
  watch: {
    sessionBody (val, oldVal) {
      // get session when the session body has changed
      this.getSession()
      // hide input form and go to main UI
      this.connecting = true
    }
  }
}
</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}

@import '~bulma';

@import '~wysiwyg.css/wysiwyg.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
