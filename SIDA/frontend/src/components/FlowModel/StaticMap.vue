<template>
  <div id="map" class="absolute top-0 left-0 w-full h-full"></div>
</template>

<script>
import {} from "vue";
import mapboxgl from "mapbox-gl";

export default {
  name: "StaticMap",
  props: {},
  setup() {
    const INITIAL_VIEW_STATE = {
      latitude: 51.47,
      longitude: 0.45,
      zoom: 4,
      bearing: 0,
      pitch: 30,
    };

    mapboxgl.accessToken =
      "pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA"; // eslint-disable-line

    const staticMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v9",
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
    });
  },
};
</script>