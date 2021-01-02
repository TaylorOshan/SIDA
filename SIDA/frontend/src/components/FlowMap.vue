<template>
  <div>
    <div id="container" class="w-full h-full">
      <div id="map" class="absolute top-0 left-0 w-full h-full"></div>
      <canvas
        id="deck-canvas"
        class="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { Deck, Layer } from "@deck.gl/core";
import FlowMapLayer from "@flowmap.gl/core";
import mapboxgl from "mapbox-gl";
import store from "../store";

export default {
  name: "FlowMap",
  props: {
    layerData: Object,
  },
  data() {
    return {
      viewState: {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
    };
  },
  components: {},
  created() {
    this.map = null;
    this.deckGL = null;
    this.layer = null;
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA",
      container: "map",
      interactive: false,
      style: "mapbox://styles/mapbox/light-v9",
      center: [this.viewState.longitude, this.viewState.latitude],
      zoom: this.viewState.zoom,
      pitch: this.viewState.pitch,
      bearing: this.viewState.bearing,
    });

    this.deckGL = new Deck({
      canvas: "deck-canvas",
      width: "100%",
      height: "100%",
      initialViewState: this.viewState,
      controller: true,
      // change the map's viewstate whenever the view state of deck.gl changes
      onViewStateChange: ({ viewState }) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
    });
  },
  computed: {
    getLayers() {
      this.layer = new FlowMapLayer({
        id: "my-flowmap-layer",
        locations: this.$store.getters.getLocations,
        flows: this.$store.getters.getFlows,
        pickable: true,
        mixBlendMode: "multiply",
        showLocationAreas: false,
        getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
        getFlowOriginId: (f) => f.origin, //"LHR",
        getFlowDestId: (f) => f.dest, //f.properties.abbrev,
        getLocationId: (loc) => loc.id, //f.properties.abbrev,
        getLocationCentroid: (loc) => [loc.lon, loc.lat], //f.geometry.coordinates,
        showLocationAreas: false,
        maxFlowThickness: 2,
      });
    },
    getFlows() {
      return this.$store.getters.getFlows;
    },
    getLocations() {
      return this.$store.getters.getLocations;
    },
  },
  methods: {
    renderLayers(layers) {
      this.deckGL.setProps({ layers: layers });
    },
  },
  watch: {
    getLayers(layer) {
      setup.renderLayers(layers);
    },
  },
};
</script>

<style scoped>
#container {
  position: fixed;
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