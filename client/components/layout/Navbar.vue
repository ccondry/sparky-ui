<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left hero-brand">
          <router-link class="nav-item hero-brand" to="Home">
            <!-- <img src="~assets/logo.svg" :alt="pkginfo.description"> -->
            Cumulus Health
          </router-link>
        </div>
        <div class="nav-center">

        </div>
        <div class="nav-right is-flex">
          <div class="nav-item">
            Log In
          </div>
          <div class="nav-item">
            Sign Up
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import { mapGetters } from 'vuex'

export default {

  components: {
    Tooltip
  },

  props: {
    show: Boolean
  },

  computed: {
    ...mapGetters({
      pkginfo: 'pkg'
    })
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

:root {
  --bg-color: rgba(79, 208, 220, 1);
  --text-color: white;
}

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    background-color: var(--bg-color);
  }
}
//
// .hero-head {
//   font-size: 19px;
//   background-color: var(--bg-color)
// }

.nav-item {
  color: var(--text-color) !important;
}

.hero-brand {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-color) !important;
  background-color: var(--bg-color);
  .vue {
    margin-left: 10px;
    color: #36AC70;
  }
  .admin {
    color: #28374B;
  }
}
</style>
