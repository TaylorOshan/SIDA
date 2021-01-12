<template>
  <div>
    <v-row class="mb-6" no-gutter>
      <v-col cols="12">
        <v-card elevation="7" :loading="getDataLoading">
          <FlowMap class="">FlowMap</FlowMap>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined elevation="3" class="">
          <v-card-title class="text-h4"> LODES </v-card-title>

          <v-card-subtitle class="subtitle-1"> data set info </v-card-subtitle>

          <v-card-text class="body-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, fuga
            porro. Impedit eaque cumque voluptatibus voluptatum deleniti? A quam
            mollitia at quia laborum explicabo! Assumenda tenetur nostrum rerum
            neque totam?Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Et, fuga porro. Impedit eaque cumque voluptatibus voluptatum
            deleniti? A quam mollitia at quia laborum explicabo! Assumenda
            tenetur nostrum rerum neque totam?
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          outlined
          elevation="3"
          class="h-full"
          v-if="getPopupData && getPopupData.show"
        >
          <v-card-title class="text-h4">
            Location: {{ getPopupData.name }}
            <v-spacer></v-spacer>
            <v-btn icon @click="clearCurrentFlow">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-subtitle class="subtitle-1">
            {{ getPopupData.lon }}, {{ getPopupData.lat }}
          </v-card-subtitle>

          <v-list-item class="body-1">
            <v-list-item-content>
              <v-list-item-title
                >Inflows : {{ getPopupData.in }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="body-1">
            <v-list-item-content>
              <v-list-item-title
                >Outflows : {{ getPopupData.out }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="body-1">
            <v-list-item-content>
              <v-list-item-title
                >Population : {{ getPopupData.pop }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="body-1">
            <v-list-item-content>
              <v-list-item-title
                >Flows : {{ getPopupData.pop }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card
          v-else
          outlined
          elevation="3"
          class="h-full shake-slow shake-constant shake-constant--hover"
        >
          <div
            class="flex flex-col items-center justify-center w-full h-full text-center text-h4 headline font-weight-bold"
          >
            Click a Location to load its flows!
          </div>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card outlined elevation="3">
          <Table></Table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import FlowMap from "../components/FlowDashboard/FlowMap.vue";
import Table from "../components/FlowDashboard/Table.vue";
import HoverInfo from "../components/FlowDashboard/HoverInfo.vue";
import { mapGetters, mapActions } from "vuex";
import store from "../store";

export default {
  name: "FlowDashboard",
  props: {},
  components: {
    FlowMap,
    Table,
    HoverInfo,
  },
  data() {
    return {
      locations: [],
      flows: [],
    };
  },
  computed: {
    ...mapGetters([
      "getCurrentX",
      "getCurrentY",
      "getCurrentZ",
      "getDataLoading",
      "getRemoveFlows",
      "getLocationsVisibility",
      "getPopupData",
      "getFlowLayer",
      "getFlowVisibility",
    ]),
  },
  methods: {
    ...mapActions([
      "setLatestFlowLayer",
      "loadTileFlows",
      "loadLocations",
      "renderFlow",
    ]),
    showLocation() {
      console.log(this.getLocations);
    },
    showFlow() {
      console.log(this.getFlows);
    },
    setLocationVis() {
      const vis = this.getLocationsVisibility;
      store.commit("SET_LOCATIONS_LAYER_VIS", !vis);
      console.log(this.getLocationsVisibility);
    },
    clearCurrentFlow() {
      store.commit("SET_POPUP_INFO", { display: false });
      store.commit("SET_FLOW_VISIBLE", false);
      console.log(this.getFlowVisibility);
      this.renderFlow();
    },
  },

  watch: {
    // getFlows: {
    //   handler(value) {
    //     console.log("Flows Changed");
    //     this.setLatestFlowLayer();
    //     this.flows = value;
    //   },
    //   deep: true,
    // },
    // getLocations: {
    //   handler(value) {
    //     console.log("Locs Changed");
    //     this.setLatestFlowLayer();
    //     this.locations = value;
    //   },
    //   deep: true,
    // },
  },

  async mounted() {
    console.log("loading");
    await this.loadLocations();
    console.log(this.getCurrentX, this.getCurrentY, this.getCurrentZ);
    store.commit("SET_DATASET_NAME", "fake_name");
    // await this.loadTileFlows();
  },
};
</script>

<style scoped>
.card {
  @apply relative flex-grow m-2  rounded-lg shadow-lg  hover:shadow-2xl;
}

.full {
  @apply md:w-full;
}

.half {
  @apply md:w-1/3;
}
</style>
