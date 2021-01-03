<template>
  <div id="container" class="w-full h-full overflow-hidden">
    <DeckGL />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import DeckGL from "./DeckGL.vue";
import FlowMapLayer from "@flowmap.gl/core";

import store from "../../store";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FlowMap",
  components: {
    DeckGL,
  },
};
</script>

<style scoped>
#container {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  height: 50vh;
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