<template>
  <div class="relative">
    <Layout>
      <FlowMap class="card full">FlowMap</FlowMap>

      <div class="card half bg-yellow-50">
        <HoverInfo></HoverInfo>
      </div>

      <!-- <Table class="card half"></Table>-->
    </Layout>

    <p class="text-white" v-if="getDataLoading">Still loading..</p>

    <ul
      class="text-white cursor-pointer"
      v-if="!getDataLoading"
      @click="showData"
    >
      done
    </ul>
    <ul
      class="text-white cursor-pointer"
      v-if="!getDataLoading"
      @click="setLatestFlowLayer"
    >
      create layer
    </ul>
    <ul class="text-white cursor-pointer" @click="setLocationVis">
      show location
    </ul>
    <ul
      class="text-white cursor-pointer"
      v-if="!getDataLoading"
      @click="updateDeck"
    >
      update deck
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowModel/FlowMap.vue";
import Layout from "../components/FlowModel/Layout.vue";
import Table from "../components/FlowModel/Table/Table.vue";
import HoverInfo from "../components/FlowModel/HoverInfo.vue";
import { mapGetters, mapActions } from "vuex";
import store from "../store";

export default {
  name: "FlowModel",
  props: {},
  components: {
    Branding,
    FlowMap,
    Layout,
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
    ]),
  },
  methods: {
    ...mapActions(["setLatestFlowLayer", "loadTileFlows", "loadLocations"]),
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
    //await this.loadTileFlows();
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