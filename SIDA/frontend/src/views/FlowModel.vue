<template>
  <div>
    <v-row class="mb-6" justify="" no-gutter>
      <v-col cols="12">
        <v-card elevation="7">
          <FlowMap class="">FlowMap</FlowMap>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card outlined elevation="3" class="">
          <v-card-title> Location: XXXXX </v-card-title>

          <v-card-subtitle> Subtitle Info Important </v-card-subtitle>

          <v-card-text>
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

      <v-col cols="6">
        <v-card outlined elevation="3">
          <NewTable></NewTable>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card outlined shaped elevation="3">
          <v-card-title> Location: XXXXX </v-card-title>

          <v-card-subtitle> Subtitle Info Important </v-card-subtitle>

          <v-card-text>
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
    </v-row>

    <!-- <Layout>
      <FlowMap class="card full">FlowMap</FlowMap>

      <div class="card half bg-yellow-50">
        <HoverInfo></HoverInfo>
      </div>

      <NewTable class="card half"></NewTable>

      <v-card shaped elevation="2">
        <v-card-title>Locations</v-card-title>
      </v-card>
    </Layout> -->

    <!-- <p class="text-white" v-if="getDataLoading">Still loading..</p>

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
      @click="updateDeck"
    >
      update deck
    </ul> -->
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowModel/FlowMap.vue";
import Layout from "../components/FlowModel/Layout.vue";
import NewTable from "../components/FlowModel/Table/NewTable.vue";
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
    NewTable,
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
