<template>
  <div class="relative">
    <Branding />
    <Layout>
      <FlowMap class="card full">Map</FlowMap>

      <div class="card half">
        <div class="row" v-for="(f, index) in flows" :key="index">
          <div class="col">
            {{ f }}
          </div>
        </div>
      </div>

      <div class="card half">
        <div class="row" v-for="(loc, index) in locations" :key="index">
          <div class="col">
            {{ loc.name }}
          </div>
        </div>
      </div>
    </Layout>

    <p class="text-white" v-if="loading">Still loading..</p>
    <p class="text-white" v-if="error">
      error
      <!--<h1 class="text-red-900 text-8xl">{{ name }}</h1>-->
    </p>

    <ul class="text-white" v-if="!loading && data">
      done
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowMap.vue";
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
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const locations = computed(() => store.getters.getLocations);
    const flows = computed(() => store.getters.getFlows);

    onMounted(() => {
      store.dispatch("load");
    });

    return {
      data,
      loading,
      error,
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