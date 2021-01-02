<template>
  <div class="relative">
    <Branding />
    <Layout>
      <FlowMap :layerData="data" class="card full">Map</FlowMap>

      <div class="card half">This is a card</div>

      <div class="card half">This is a card</div>
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
import { onMounted, ref } from "vue";
import Branding from "../components/Branding.vue";
import FlowMap from "../components/FlowModel/FlowMap.vue";
import Layout from "../components/FlowModel/Layout.vue";

export default {
  name: "FlowModel",
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

    function fetchAPIData() {
      const AIR_PORTS = "http://127.0.0.1:8000/layer";
      //"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

      loading.value = true;
      console.log(loading.value);

      return fetch(AIR_PORTS, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            console.log("API response not OK... throwing error");
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((featureCollection) => {
          console.log("Received API Features");
          console.log(featureCollection);
          data.value = featureCollection;
        })
        .catch((err) => {
          console.log("Catching unknown error");
          error.value = err;
          if (err.json) {
            return err.json.then((json) => {
              error.value.message = json.message;
            });
          }
        })
        .then(() => {
          loading.value = false;
          console.log(`Done Loading Parent`);
        });
    }
    onMounted(() => {
      fetchAPIData();
    });

    return {
      data,
      loading,
      error,
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