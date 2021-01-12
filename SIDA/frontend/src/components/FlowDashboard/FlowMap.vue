<template>
  <div id="container" class="w-full h-full overflow-hidden">
    <DeckGL :layers="layers"></DeckGL>
    <v-speed-dial
      v-model="fab"
      right
      bottom
      direction="top"
      transition="slide-y-reverse-transition"
      open-on-hover
      absolute
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="secondary" dark fab tile>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-layers-outline </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        medium
        text
        :color="locationColor"
        @click="toggleLocations"
      >
        <v-container>
          Locations
          <!-- <v-icon>mdi-pencil</v-icon> -->
        </v-container>
      </v-btn>
      <v-btn
        fab
        dark
        medium
        text
        :color="flowColor"
        @click="toggleFlows"
        :disabled="flowsLoaded"
      >
        <v-container>
          Flows
          <!-- <v-icon>mdi-pencil</v-icon> -->
        </v-container>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import DeckGL from "./DeckGL.vue";
import FlowMapLayer from "@flowmap.gl/core";
import store from "../../store";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FlowMap",
  components: {
    DeckGL,
  },
  data() {
    return {
      layers: [],
      fab: false,
    };
  },
  computed: {
    ...mapGetters([
      "getLocationLayer",
      "getFlowLayer",
      "getFlowVisibility",
      "getLocationVisibility",
      "getFlows",
    ]),
    locationColor() {
      if (this.getLocationVisibility) {
        return "primary";
      } else {
        return "accent";
      }
    },
    flowColor() {
      if (this.getFlowVisibility) {
        return "primary";
      } else {
        return "accent";
      }
    },
    flowsLoaded() {
      if (this.getFlowLayer && this.getFlows.length >= 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    getLocationLayer(value) {
      this.layers = [value, this.getFlowLayer];
    },
    getFlowLayer(value) {
      this.layers = [this.getLocationLayer, value];
    },
  },
  methods: {
    ...mapActions(["renderLoc", "renderFlow"]),
    toggleFlows() {
      store.commit("TOGGLE_FLOW_VISIBILITY");
      this.renderFlow();
    },
    toggleLocations() {
      store.commit("TOGGLE_LOCATION_VISIBILITY");
      this.renderLoc();
    },
  },
  // getFlowLayer: {
  //   handler(value) {
  //     console.log("Layers Changed...Modifying DeckGL");
  //     if (this.deck) {
  //       console.log(value);
  //       try {
  //         this.deck.setProps({
  //           layers: [value, this.getLocationLayer],
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
  height: 60vh;
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

.fab--primary {
  background-color: #0082fb !important;
}
</style>
