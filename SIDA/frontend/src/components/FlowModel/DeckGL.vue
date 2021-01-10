<template>
  <div class="deck-container">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { ScatterplotLayer } from '@deck.gl/layers'
import { Deck } from '@deck.gl/core'
import mapboxgl from 'mapbox-gl'
import { mapGetters, mapActions } from 'vuex'
import store from '../../store'
import { getFlowLayer } from '../../visualizers/flowmap'
export default {
  name: 'DeckGL',
  props: {
    layers: {
      required: true
    }
  },
  data () {
    return {
      viewState: {
        latitude: 36.102376,
        longitude: -80.649277,
        zoom: 4,
        pitch: 0,
        bearing: 0
      }
    }
  },
  created () {
    this.map = null
    this.deck = null
  },
  methods: {},
  computed: {
    ...mapGetters([
      'getLocationLayer',
      'getFlowLayer',
      'getCurrentX',
      'getCurrentY',
      'getCurrentZ',
      'getDataLoading',
      'getLocationsVisibility'
    ])
  },
  watch: {
    layers (value) {
      this.deck.setProps({ layers: value })
    },
    // getLocationLayer: {
    //   handler(value) {
    //     console.log("Layers Changed...Modifying DeckGL");
    //     if (this.deck) {
    //       console.log(value);
    //       try {
    //         this.deck.setProps({
    //           layers: [value, this.getFlowLayer],
    //         });
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     } else {
    //       console.log("No DeckGL Instance");
    //     }
    //   },
    //   deep: false,
    // },

    getLocationsVisibility: {
      handler (value) {
        if (value) {
          console.log(this.deck.props.layers)
        }
      }
    }
  },
  mounted () {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA', // this.accessToken,
      container: this.$refs.map,
      interactive: false,
      style: this.mapStyle || 'mapbox://styles/mapbox/dark-v9',
      center: [this.getCurrentX, this.getCurrentY],
      zoom: this.getCurrentZ,
      pitch: this.viewState.pitch,
      bearing: this.viewState.bearing
    })
    this.deck = new Deck({
      canvas: this.$refs.canvas,
      width: '100%',
      height: '100%',
      pickingRadious: 5,
      initialViewState: this.viewState,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        })
        // console.log(viewState.longitude, viewState.latitude, viewState.zoom);
        store.commit('SET_CURRENT_X', viewState.longitude)
        store.commit('SET_CURRENT_Y', viewState.latitude)
        store.commit('SET_CURRENT_Z', viewState.zoom)
        this.$emit('viewStateChange')
      },
      onClick: (event, info) => {
        console.log('clicked map', { event, info })
        this.$emit('viewClicked', { event, info })
      },
      getTooltip: ({ object }) =>
        object && ` Name: ${object.name} Count: ${object.count}`
    })
  }
}
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
