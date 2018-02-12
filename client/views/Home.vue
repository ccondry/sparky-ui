<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h1 class="title">Choose Your Language</h1>
          <div class="wysiwyg">
            <!-- <p>
              Welcome to Mobile Connect version {{ pkg.version }}.
            </p> -->
            <!-- <router-link :to="{ name: 'Report', params: { brand: 'health' } }">Cumulus Health</router-link> -->
            <ul>
              <li v-for="(language, code) in languages">
                <router-link :to="{ name: 'Brand Select', params: { language: code } }">{{ language }}</router-link>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-3 is-hidden-mobile"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'languages'
    ])
  }
}
</script>
