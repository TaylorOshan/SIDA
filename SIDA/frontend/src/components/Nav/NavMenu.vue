<template>
  <nav
    id="navMenu"
    class="hidden mx-auto text-lg font-bold leading-snug text-right md:text-center md:flex md:flex-row md:items-center md:justify-start"
    style="color: #e7dfdd; z-index: 999"
  >
    <!-- <router-link to="/" class="nav__item">
      <ul class="p-2 mx-3">
        Home
      </ul>
    </router-link>

    <router-link to="/flow/2" class="nav__item">
      <ul class="p-2 mx-3">
        Flow Models
      </ul>
    </router-link> -->
  </nav>
</template>

<script>
export default {
  name: "NavMenu",
  components: {},
};
</script>

<style scoped>
.nav__item {
  @apply m-4 rounded-md hover:bg-gray-400;
}
</style>