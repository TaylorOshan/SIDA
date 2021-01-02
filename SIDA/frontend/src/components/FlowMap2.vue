<template>
  <div>
    <div id="container" class="w-full h-full">
      <div id="map" class="w-full h-full"></div>
      <canvas id="deck-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect, watch } from "vue";
import { Deck, Layer } from "@deck.gl/core";
import FlowMapLayer from "@flowmap.gl/core";
import mapboxgl from "mapbox-gl";

export default {
  name: "FlowMap2",
  props: {
    layerData: Object,
  },
  setup(props) {
    var deckGL;
    var map;

    function CreateFlowMap() {
      const INITIAL_VIEW_STATE = {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        bearing: 0,
        pitch: 30,
      };

      mapboxgl.accessToken =
        "pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA"; // eslint-disable-line

      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
        interactive: false,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch,
      });

      deckGL = new Deck({
        canvas: "deck-canvas",
        width: "100%",
        height: "100%",
        initialViewState: INITIAL_VIEW_STATE,
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
    }

    function UpdateFlowMap() {
      const newLayer = new FlowMapLayer({
        id: "my-flowmap-layer",
        locations: props.layerData,
        flows: props.layerData.features.filter(
          (f) => f.properties.scalerank < 3
        ),
        getFlowMagnitude: (f) => f.properties.scalerank,
        getFlowOriginId: (f) => "LHR",
        getFlowDestId: (f) => f.properties.abbrev,
        getLocationId: (f) => f.properties.abbrev,
        getLocationCentroid: (f) => f.geometry.coordinates,
      });

      deckGL.setProps({ layers: newLayer });
      console.log("Added new layer");
    }

    watchEffect(() => {
      console.log("Received on Child");
      console.log(props.layerData);
      if (props.layerData) {
        console.log("Received on Child");
        UpdateFlowMap();
      }
    });
    onMounted(() => {
      CreateFlowMap();
    });
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