<template>
  <section
    class="flex flex-col w-full p-4 m-4 mx-auto max-w-7xl md:flex-row md:flex-wrap"
  >
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'Layout',
  props: {}
}
</script>

<style scoped>
</style>
