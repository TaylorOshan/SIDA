<template>
  <header class="static w-screen" style="">
    <div class="md:flex md:flex-row md:items-center md:justify-between">
      <div class="flex flex-row items-center justify-between md:inline-block">
        <NavBranding />
        <NavBurger />
      </div>
      <NavMenu />
    </div>

    <hr />
  </header>
</template>

<script>
import NavBranding from './Nav/NavBranding.vue'
import NavBurger from './Nav/NavBurger.vue'
import NavMenu from './Nav/NavMenu.vue'

export default {
  name: 'Header',
  components: {
    NavBranding,
    NavBurger,
    NavMenu
  }
}
</script>

<style scoped>
header {
  background-color: #0e0b16;
  z-index: 999;
}
</style>
