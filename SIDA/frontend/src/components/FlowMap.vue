<template>
  <div class="overflow-scroll">
    <button class="block" @click="addFlowLayer">click</button>
    <div id="container" class="w-full h-full">
      <div id="map" class="absolute top-0 left-0 w-full h-full"></div>
      <canvas
        id="deck-canvas"
        class="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>
    <div class="row" v-for="(f, index) in getFlows" :key="index">
      <div class="col">
        {{ f }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { Deck, Layer } from "@deck.gl/core";
import FlowMapLayer from "@flowmap.gl/core";
import mapboxgl from "mapbox-gl";
import store from "../store";
import { mapState } from "vuex";

export default {
  name: "FlowMap",
  props: {},
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
    console.log("created");
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
    getLocations() {
      return store.state.locations;
    },
    getFlows() {
      return store.getters.getFlows;
    },
    // Or return basket.getters.fruitsCount
    // (depends on your design decisions).

    // getLayers() {
    //   const layer = new FlowMapLayer({
    //     id: "my-flowmap-layer",
    //     locations: this.$store.getters.getLocations, //this.locations, //
    //     flows: this.$store.getters.getFlows, //this.flows, //
    //     pickable: true,
    //     showLocationAreas: true,
    //     getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
    //     getFlowOriginId: (f) => f.origin, //"LHR",
    //     getFlowDestId: (f) => f.dest, //f.properties.abbrev,
    //     getLocationId: (loc) => loc.id, //f.properties.abbrev,
    //     getLocationCentroid: (loc) => [loc.lon, loc.lat], //f.geometry.coordinates,
    //   });
    //   console.log("computing");
    //   return layer;
    // },
  },
  methods: {
    renderLayers(layers) {
      this.deckGL.setProps({ layers });
    },
    addFlowLayer() {
      const layer = new FlowMapLayer({
        id: "my-flowmap-layer",
        locations: this.$store.getters.getLocations, //this.locations, //
        flows: this.$store.getters.getFlows, //this.flows, //
        pickable: true,
        showLocationAreas: true,
        getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
        getFlowOriginId: (f) => f.origin, //"LHR",
        getFlowDestId: (f) => f.dest, //f.properties.abbrev,
        getLocationId: (loc) => loc.id, //f.properties.abbrev,
        getLocationCentroid: (loc) => [loc.lon, loc.lat], //f.geometry.coordinates,
      });
      console.log("Adding new Layer");
      this.deckGL.setProps({ layers: layer });
    },
  },
  watch: {
    getFlows: {
      handler: function () {
        console.log("Flows Update");
        return {
          deep: true,
        };
      },
    },
    getLocations(newcount, oldcount) {
      console.log("NEW LOCATIONS");
    },
    getFlows(newcount, oldcount) {
      console.log("NEW FLOWS");
    },
    count(newCount, oldCount) {
      // Our fancy notification (2).
      console.log(`We have ${newCount} fruits now, yay!`);
    },
    // "$store.state.locations": function () {
    //   console.log("store changed");
    //   locations = $store.getters.getLocations;
    //   console.log($store.getters.getLocations);
    // },
    // "$store.getters.getFlows": function () {
    //   console.log("store changed");
    //   flows = $store.getters.getFlows;
    //   console.log($store.getters.getFlows);
    // },
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