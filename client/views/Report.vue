<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>

      <div class="tile is-parent is-6">
        <article class="tile is-child box">

          <h1 class="title">Contact Us</h1>

          <p class="subtitle">How can we help?</p>

          <div>
            <h2 class="title nomargin">Type of Question</h2>
            <hr>
            <div class="select is-fullwidth">
              <select v-model="requestType">
                <option selected disabled value="">Select Category</option>
                <option v-for="(requestType, key) in requestTypes" :value="key">{{ requestType }}</option>
              </select>
            </div>
          </div>

          <br>
          <br>

          <div>
            <h3 class="title nomargin">Description of Problem</h3>
            <hr>
            <textarea class="input" v-model="description" style="min-height: 3em; width:100%;" placeholder="Add details so our agents can best serve you..."></textarea>
          </div>

          <br>
          <br>

          <div>
            <h3 class="title nomargin">Attach a Photo</h3>
            <hr>
            <button class="button is-info is-fullwidth"><i class="fa fa-camera pull-left"></i> Add Photo</button>
          </div>

          <br>
          <br>

          <div>
            <h3 class="title nomargin">Add a Location</h3>
            <hr>
            <p class="control has-addons">
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-road"></i>
                </span>
                <span>Street Address</span>
              </a>
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
                <span>Intersection</span>
              </a>
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-map-marker"></i>
                </span>
                <span>Use Current Location</span>
              </a>
            </p>
          </div>

          <br>
          <br>

          <div>
            <h3 class="title nomargin">Contact</h3>
            <hr>
            <div class="select is-fullwidth">
              <select v-model="contactMethod">
                <option selected disabled value="">Select Contact Method</option>
                <option v-for="(method, key) in contactMethods" :value="key">{{ method }}</option>
              </select>
            </div>
            <div v-if="contactMethod">
              Enter your name:
              <input class="input" v-model="name" placeholder="Your Name">
              Enter your phone number:
              <input class="input" v-model="phone" placeholder="Your Phone Number">
              <br>
              <br>
              <button class="button is-success is-fullwidth"><i class="fa fa-phone pull-left"></i> {{ contactMethods[contactMethod] }}</button>
            </div>
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
  data () {
    return {
      requestType: '',
      description: '',
      contactMethod: '',
      name: '',
      phone: ''
    }
  },
  mounted () {
    // this.getBrand(this.email)
  },
  computed: {
    ...mapGetters([
      'pkg',
      'brand',
      'requestTypes',
      'contactMethods'
    ]),
    email () {
      return this.$route.params.email
    }
  }
}
</script>
<style>
hr {
  margin: 0.5rem 0;
}
.nomargin {
  margin: 0
}
</style>
