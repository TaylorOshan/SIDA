<template>
  <div class="relative">
    <Layout>
      <FlowMap class="card full">FlowMap</FlowMap>

      <div class="card half">
        <div class="row" v-for="(f, index) in flows" :key="index">
          <div class="col">
            {{ f }}
          </div>
          <button @click="removeFlow(index)">Click</button>
        </div>
      </div>

      <div class="card half">
        <div class="row" v-for="(loc, index) in getLocations" :key="index">
          <div class="col">
            {{ loc.name }}
          </div>
          <button @click="removeLocation(index)">Click</button>
        </div>
      </div>
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
import { mapGetters, mapActions } from "vuex";
import store from "../store";

export default {
  name: "FlowModel",
  props: {},
  components: {
    Branding,
    FlowMap,
    Layout,
  },
  data() {
    return {
      locations: [],
      flows: [],
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations", "getDataLoading"]),
  },
  methods: {
    ...mapActions(["setLatestFlowLayer", "load"]),
    removeLocation(i) {
      store.commit("removeLocation", i);
    },
    removeFlow(i) {
      store.commit("removeFlow", i);
    },
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
  @apply relative flex flex-col justify-between flex-initial flex-grow p-4 m-2 transition duration-300 ease-in-out transform bg-blue-400 rounded-lg shadow-lg  hover:shadow-2xl;
}

.full {
  @apply md:w-full;
}

.half {
  @apply md:w-1/3;
}
</style>