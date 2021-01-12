<template>
  <div id="wrapper" class="w-screen h-screen overflow-x-hidden font-sans">
    <Header />
    <router-view class="w-screen h-full min-h-full" />
    <!--<Footer />-->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
#wrapper {
  background-color: #0e0b16;
  height: 100vh;
  min-height: 100vh;
}
</style>
