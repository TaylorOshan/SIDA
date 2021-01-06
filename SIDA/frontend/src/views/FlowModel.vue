<template>
  <div class="relative">
    <Layout>
      <FlowMap class="card full">FlowMap</FlowMap>

      <div class="card half bg-yellow-50">
        <div class="row" v-for="(f, index) in getRemoveFlows" :key="index">
          <div class="col">
            {{ f }}
          </div>
        </div>
      </div>

      <Table class="card half"></Table>
    </Layout>

    <p class="text-white" v-if="getDataLoading">Still loading..</p>

    <ul class="text-white" v-if="!getDataLoading">
      done
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowModel/FlowMap.vue";
import Layout from "../components/FlowModel/Layout.vue";
import Table from "../components/FlowModel/Table/Table.vue";
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
  },
  data() {
    return {
      locations: [],
      flows: [],
    };
  },
  computed: {
    ...mapGetters([
      "getFlows",
      "getLocations",
      "getDataLoading",
      "getRemoveFlows",
    ]),
  },
  methods: {
    ...mapActions(["setLatestFlowLayer", "load"]),
  },
  watch: {
    getFlows: {
      handler(value) {
        console.log("Flows Changed");
        this.setLatestFlowLayer();
        this.flows = value;
      },
      deep: true,
    },
    getLocations: {
      handler(value) {
        console.log("Locs Changed");
        this.setLatestFlowLayer();
        this.locations = value;
      },
      deep: true,
    },
  },
  // created() {
  //   this.load();
  // },
  async mounted() {
    this.load();
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