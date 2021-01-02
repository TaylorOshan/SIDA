<template>
  <div>
    <div id="container" class="w-full h-full">
      <DeckGL
        ref="deck"
        :class="['fill-wrapper']"
        :controlMap="true"
        :layers="layers"
        :width="'100%'"
        :height="'100%'"
        :controller="true"
        :useDevicePixels="false"
        :viewState="{
          latitude: 49.254,
          longitude: -123.13,
          zoom: 11,
          maxZoom: 16,
          pitch: 45,
          bearing: 0,
        }"
      >
        <Mapbox
          class="fill-wrapper"
          :center="[-123.13, 49.254]"
          :zoom="11"
          :bearing="0"
          :pitch="45"
        />
      </DeckGL>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { GeoJsonLayer } from "@deck.gl/layers";
import FlowMapLayer from "@flowmap.gl/core";
import DeckGL from "../deckgl/DeckGL.vue";
import Mapbox from "../deckgl/Mapbox.vue";
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
#container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#container > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>