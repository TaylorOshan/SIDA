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
  data() {
    return {
      viewState: {
        latitude: 28,
        longitude: -36.5625,
        zoom: 1,
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
        console.log("Layers Changed...Modifying DeckGL");
        if (this.deck) {
          this.deck.setProps({
            layers: value,
          });
        } else {
          console.log("No DeckGL Instance");
        }
      },
      deep: false,
      // NS NDFNED error when true
      // may need change when tracking multiple layers
    },
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA", //this.accessToken,
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
        console.log("clicked map", { event, info });
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
  position: absolute;
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
</style>