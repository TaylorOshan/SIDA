<template>
  <div id="container" class="w-full h-full overflow-hidden">
    <DeckGL :layers="layers"></DeckGL>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import DeckGL from './DeckGL.vue'
import FlowMapLayer from '@flowmap.gl/core'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FlowMap',
  components: {
    DeckGL
  },
  data () {
    return {
      layers: []
    }
  },
  computed: {
    ...mapGetters(['getLocationLayer', 'getFlowLayer'])
  },
  watch: {
    getLocationLayer (value) {
      this.layers = [value, this.getFlowLayer]
    },
    getFlowLayer (value) {
      this.layers = [value, this.getLocationLayer]
    }
  }
  // getFlowLayer: {
  //   handler(value) {
  //     console.log("Layers Changed...Modifying DeckGL");
  //     if (this.deck) {
  //       console.log(value);
  //       try {
  //         this.deck.setProps({
  //           layers: [value, this.getLocationLayer],
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("No DeckGL Instance");
  //     }
  //   },
  //   deep: false,
  // },
}
</script>

<style scoped>
#container {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  height: 60vh;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
