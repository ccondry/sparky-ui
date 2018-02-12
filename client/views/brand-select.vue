<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h1 class="title">{{ tr.choose_demo }}</h1>
          <div class="wysiwyg">
            <p>
            </p>
            <ul>
              <li v-for="brand of localizedBrands">
                <router-link :to="{ name: 'Brand', params: { language, brand: brand.id } }">{{ brand.title }}</router-link>
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
    ...mapGetters(['localizations', 'brands']),
    tr () {
      return this.localizations[this.language] || {}
    },
    language () {
      return this.$route.params.language
    },
    localizedBrands () {
      return this.brands.filter(v => {
        return v.language === this.language
      })
    }
  }
}
</script>
