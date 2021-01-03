<template>
  <div class="overflow-scroll">
    <button class="block" @click="loadLayers">click</button>
    <div id="container" class="w-full h-full">
      <DeckGL
        :accessToken="'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA'"
        :latitude="0"
        :longitude="0"
        :layers="layers"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import DeckGL from "./deckgl/DeckGL.vue";
import FlowMapLayer from "@flowmap.gl/core";

import store from "../store";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FlowMap",
  props: {},
  components: {
    DeckGL,
  },
  data() {
    return {
      layers: [],
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations", "getLayers"]),
  },
  methods: {
    ...mapGetters(["getCurrentFlowLayer"]),
    loadLayers() {
      console.log("loadLayers...");
      let newLayer = this.getCurrentFlowLayer();
      //newLayer.updateState();
      this.layers = newLayer;
      // TODO. fix for typing
      //this.layers.splice(0, this.layers.length, this.getCurrentFlowLayer());
    },
  },
  watch: {
    getLayers(value) {
      console.log("store values changed");
    },
    getFlows(value) {
      this.loadLayers();
    },
    getLocations(value) {
      this.loadLayers();
    },
    layers(value) {
      console.log("Layers just changed");
      console.log(this.layers);
    },
  },
  async mounted() {
    this.loadLayers();
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