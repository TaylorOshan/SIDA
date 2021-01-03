<template>
  <div id="container" class="w-full h-full overflow-hidden">
    <DeckGL
      :accessToken="'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA'"
      :latitude="0"
      :longitude="0"
    />
    <button class="block" @click="loadLayers">click</button>
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
  props: {},
  components: {
    DeckGL,
  },
  data() {
    return {
      //layers: [],
    };
  },
  computed: {
    //...mapGetters(["getFlows", "getLocations", "getLayers"]),
    // layers: function () {
    //   return this.getLayers();
    // },
  },
  methods: {
    //...mapGetters(["getLatestFlowLayer", "getLayers"]),
    //...mapActions(["setLatestFlowLayer"]),
    async loadLayers() {
      console.log("load buton...");
      this.setLatestFlowLayer();
      //let newLayer = this.getLatestFlowLayer();
      //newLayer.updateState();
      //this.layers = newLayer;
      // TODO. fix for typing
      //this.layers.splice(0, this.layers.length, this.getLatestFlowLayer());
    },
  },
  watch: {
    // layers: {
    //   deep: true,
    //   handler() {
    //     console.log("layers chnaged flowmap");
    //   },
    // },
    // getLayers(value) {
    //   console.log("store values ddd");
    //   this.loadLayers();
    // },
    // getFlows(value) {
    //   console.log("Flows just changed");
    //   this.loadLayers();
    // },
    // getLocations(value) {
    //   console.log("Locations just changed");
    //   this.loadLayers();
    // },
    // layers(value) {
    //   console.log("Layers just changed");
    //   console.log(this.layers);
    // },
  },
  async mounted() {
    console.log("mounted");
    //this.setLatestFlowLayer();
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