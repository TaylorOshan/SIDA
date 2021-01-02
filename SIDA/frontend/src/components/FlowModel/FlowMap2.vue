<template>
  <div>
    <div id="container" class="w-full h-full">
      <div id="map" ref="map"
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import FlowMapLayer from "@flowmap.gl/core";
import { Deck, Layer } from "@deck.gl/core";
import mapboxgl from "mapbox-gl";
import store from "../../store";

export default {
  name: "FlowMap2",
  props: {},
  components: {
    DeckGL,
    Mapbox,
  },
  data() {
    return {
      layers: [],
    };
  },
  mounted() {
    this.layers.push(
      new GeoJsonLayer({
        id: "mylayer",
        data:
          "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json",
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: true,
        getElevation: (f) => Math.sqrt(f.properties.valuePerSqm) * 10,
        getLineColor: [255, 255, 255],
        pickable: true,
      })
    );
  },
  setup() {
    var layers = new Array();
    const locations = computed(() => store.state.locations);
    const flows = computed(() => store.state.flows);

    onMounted(() => {
      // layers.push(
      //   new FlowMapLayer({
      //     id: "my-flowmap-layer",
      //     locations: locations,
      //     flows: flows,
      //     pickable: true,
      //     mixBlendMode: "multiply",
      //     showLocationAreas: false,
      //     getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
      //     getFlowOriginId: (f) => f.origin, //"LHR",
      //     getFlowDestId: (f) => f.dest, //f.properties.abbrev,
      //     getLocationId: (loc) => loc.id, //f.properties.abbrev,
      //     getLocationCentroid: (loc) => [loc.lon, loc.lat], //f.geometry.coordinates,
      //   })
      // );
    });

    return {
      layers,
      flows,
      locations,
    };
  },
};
</script>

<style scoped>
.fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>