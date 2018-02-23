<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left hero-brand">
            <img :src="logo" style="max-height: 49px;">
        </div>
        <div class="nav-center">

        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  props: ['show', 'logo']
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

:root {
  // --bg-color: rgba(79, 208, 220, 1);
  --bg-color: rgba(255, 255, 255, 1);
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
