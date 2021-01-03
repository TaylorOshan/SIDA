<template>
  <div class="deck-container">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Deck } from "@deck.gl/core";
import mapboxgl from "mapbox-gl";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DeckGL",
  props: {
    accessToken: String,
  },
  data() {
    return {
      viewState: {
        latitude: 0,
        longitude: 0,
        zoom: 2,
        pitch: 0,
        bearing: 0,
      },
    };
  },
  created() {
    this.map = null;
    this.deck = null;
  },
  methods: {},
  computed: {
    ...mapGetters(["getLayers"]),
  },
  watch: {
    getLayers: {
      handler(value) {
        console.log("layers changed in DeckGL");
        this.deck.setProps({
          layers: value,
        });
      },
      deep: true,
    },
    // getLocations: {
    //   deep: true,
    //   handler() {
    //     const layer = this.getLatestFlowLayer();
    //     this.deck.setProps({
    //       layers: layer,
    //     });
    //   },
    // },
    // getFlows: {
    //   handler() {
    //     console.log("watch triggered deckGL getFlows");
    //     const layer = this.getLatestFlowLayer();
    //     this.deck.setProps({
    //       layers: layer,
    //     });
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: this.$refs.map,
      interactive: false,
      style: this.mapStyle || "mapbox://styles/mapbox/dark-v9",
      center: [this.viewState.longitude, this.viewState.latitude],
      zoom: this.viewState.zoom,
      pitch: this.viewState.pitch,
      bearing: this.viewState.bearing,
    });
    this.deck = new Deck({
      canvas: this.$refs.canvas,
      width: "100%",
      height: "100%",
      initialViewState: this.viewState,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
        this.$emit("viewStateChange");
      },
      onClick: (event, info) => {
        this.$emit("viewClicked", { event, info });
      },
    });
  },
};
</script>

<style scoped>
.deck-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.deck-container #map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e5e9ec;
  overflow: hidden;
}
.deck-container #deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* MAPBOX */
</style>