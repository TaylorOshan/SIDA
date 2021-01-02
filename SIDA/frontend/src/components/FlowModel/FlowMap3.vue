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
import { onMounted, ref, watchEffect } from "vue";
import { Deck, Layer } from "@deck.gl/core";
import FlowMapLayer from "@flowmap.gl/core";
import mapboxgl from "mapbox-gl";
import store from "../../store";

export default {
  name: "FlowMap3",
  props: {},
  data() {
    return {
      INITIAL_VIEW_STATE: {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        bearing: 0,
        pitch: 30,
      },
    };
  },
  created() {
    this.map = null;
    this.deckGL = null;
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA"; // eslint-disable-line

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v9",
      interactive: false,
      center: [
        this.INITIAL_VIEW_STATE.longitude,
        this.INITIAL_VIEW_STATE.latitude,
      ],
      zoom: this.INITIAL_VIEW_STATE.zoom,
      bearing: this.INITIAL_VIEW_STATE.bearing,
      pitch: this.INITIAL_VIEW_STATE.pitch,
    });

    this.deckGL = new Deck({
      canvas: "deck-canvas",
      width: "100%",
      height: "100%",
      initialViewState: this.INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
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
      const flows = new FlowMapLayer({
        id: "my-flowmap-layer",
        locations: store.state.locations,
        flows: store.state.flows,
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

      return [flows];
    },
  },
  methods: {
    renderLayers(layers) {
      this.deckGL.setProps({ layers });
    },
  },
  watch: {
    getLayers(layers) {
      this.renderLayers(layers);
    },
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  position: relative;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
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