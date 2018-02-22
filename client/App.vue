<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <navbar :show="true" :logo="logo"></navbar>
    <app-main v-if="emailValid"></app-main>
    <div v-if="!emailValid">
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
                    <input class="input" v-model="form.firstName">
                  </div>
                  <div class="block">
                    <label class="label">Last Name</label>
                    <input class="input" v-model="form.lastName">
                  </div>
                  <div class="block">
                    <label class="label">Phone Number</label>
                    <input class="input" v-model="form.phone">
                  </div>
                  <div class="block">
                    <label class="label">Email Address</label>
                    <input class="input" v-model="form.email">
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
    window.document.title = 'Universal Insurance'
  },
  data () {
    return {
      logo: 'https://cxdemo.net/users/lchilds/citi/logo.jpg',
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
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

    // fill out form with query data
    this.form.firstName = this.firstName
    this.form.lastName = this.lastName
    this.form.email = this.email
    this.form.phone = this.phone
  },
  methods: {
    ...mapActions(['getSession', 'setLoading', 'setSessionBody']),
    startSession () {
      this.setSessionBody({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
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
      // set cache with form data
      this.firstName = this.form.firstName
      this.lastName = this.form.lastName
      this.phone = this.form.phone
      this.email = this.form.email
    }
  },
  computed: {
    ...mapGetters(['loading', 'sessionBody']),
    emailValid () {
      return this.email && this.email.length > 0
    }
  },
  watch: {
    sessionBody (val, oldVal) {
      // get session when the session body has changed
      this.getSession()
    },
    email (val, oldVal) {
      // if email changes and is valid, start session
      if (val && val.length > 0) {
        // start chat session
        this.startSession()
      }
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
