<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <navbar :show="true" :logo="logo"></navbar>
    <app-main></app-main>
    <!-- <footer-bar></footer-bar> -->
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, AppMain, FooterBar } from 'components/layout/'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      logo: 'https://cxdemo.net/users/lchilds/citi/logo.jpg'
    }
  },
  components: {
    Navbar,
    AppMain,
    FooterBar,
    NprogressContainer
  },
  async mounted () {
    console.log('set loading = true')
    this.setLoading(true)
    // await this.loadBrands()
    // await this.loadLocalizations()
    console.log('this.route: ', this.$route)
    this.setSessionBody({
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName,
      email: this.$route.query.email,
      phone: this.$route.query.phone,
      entryPointId: this.$route.query.entryPointId,
      // title: this.$route.query.title,
      // logo: this.$route.query.logo,
      apiAiToken: this.$route.query.apiAiToken,
      bot: this.$route.query.bot
    })
    console.log('set loading = false')
    this.setLoading(false)
  },
  methods: {
    ...mapActions(['getSession', 'setLoading', 'setSessionBody'])
  },
  computed: {
    ...mapGetters(['loading', 'sessionBody'])
  },
  watch: {
    sessionBody (val, oldVal) {
      // get session when the session body has changed
      this.getSession()
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
