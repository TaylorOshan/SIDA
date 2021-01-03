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
        <div class="row" v-for="(loc, index) in locations" :key="index">
          <div class="col">
            {{ loc.name }}
          </div>
          <button @click="removeLocation(index)">Click</button>
        </div>
      </div>
    </Layout>

    <p class="text-white" v-if="layerLoading">Still loading..</p>

    <ul class="text-white" v-if="!layerLoading">
      done
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowModel/FlowMap.vue";
import Layout from "../components/FlowModel/Layout.vue";
import store from "../store";

export default {
  name: "FlowModel2",
  props: {},
  components: {
    Branding,
    FlowMap,
    Layout,
  },
  methods: {
    removeLocation(i) {
      console.log(i);
      store.commit("removeLocation", i);
    },
    removeFlow(i) {
      console.log(i);
      store.commit("removeFlow", i);
    },
  },
  setup() {
    const layerLoading = computed(() => store.getters.getDataLoading);
    const locations = computed(() => store.getters.getLocations);
    const flows = computed(() => store.getters.getFlows);

    onMounted(() => {
      console.log("Trigger");
      store.dispatch("load");
    });

    return {
      layerLoading,
      locations,
      flows,
    };
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