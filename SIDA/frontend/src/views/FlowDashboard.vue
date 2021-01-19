<template>
  <div>
    <v-row class="mb-6" no-gutter>
      <v-col cols="12">
        <v-card elevation="7" :loading="getDataLoading">
          <FlowMap class="">FlowMap</FlowMap>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <DatasetInfoCard />
      </v-col>

      <v-col cols="12" md="6"><FlowInfoCard /></v-col>

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
import DatasetInfoCard from "../components/FlowDashboard/DatasetInfoCard.vue";
import FlowInfoCard from "../components/FlowDashboard/FlowInfoCard.vue";

import { mapGetters, mapActions } from "vuex";

import store from "../store";

export default {
  name: "FlowDashboard",
  props: {
    name: String,
  },
  components: {
    FlowMap,
    Table,
    HoverInfo,
    DatasetInfoCard,
    FlowInfoCard,
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
      "loadDatasetInfo",
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
  },
  watch: {},
  async mounted() {
    console.log(this.name);
    store.commit("SET_DATASET_NAME", this.name);
    await this.loadDatasetInfo();
    await this.loadLocations();
    console.log(this.getCurrentX, this.getCurrentY, this.getCurrentZ);
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
