<template>
  <aside v-if="getPopupData && getPopupData.show">
    <p>{{ getPopupData }}</p>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HoverInfo',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getPopupData'])
  },
  methods: {}
}
</script>

<style scoped>
</style>
