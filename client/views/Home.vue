<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Welcome</h1>
          <div class="wysiwyg">
            <p>
              Welcome to Mobile Connect version {{ pkg.version }}.
            </p>
            <router-link :to="{ name: 'Report', params: { brand: 'health' } }">Cumulus Health</router-link>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'pkg'
    ])
  }
}
</script>
