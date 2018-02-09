<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h1 class="title">Card</h1>
          <a class="button is-primary is-large modal-button" @click="openModalCard('7800')">Launch modal card 7800</a>
          <a class="button is-primary is-large modal-button" @click="openModalCard('6020')">Launch modal card 6020</a>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CardModal from '../components/modals/SelectDemo'

const CardModalComponent = Vue.extend(CardModal)

const openCardModal = (propsData = {
  visible: true
}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
  },

  data () {
    return {
    }
  },

  methods: {
    openModalCard (dnis) {
      const cardModal = openCardModal({
        title: 'Choose Demo',
        url: this.$store.state.pkg.homepage,
        dnis
      })
      cardModal.$children[0].active()
    }
  }
}
</script>

<style>
</style>
