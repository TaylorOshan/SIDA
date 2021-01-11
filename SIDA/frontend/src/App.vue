<template>
  <v-app>
    <!-- <v-navigation-drawer app>
      
    </v-navigation-drawer> -->

    <v-app-bar absolute app elevate-on-scroll dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h3 font-weight-medium">SIDA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu></v-menu>

      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-globe-model</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app absolute> FOOTER </v-footer>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  name: "App",

  components: {
    Footer,
  },

  data() {
    return {
      appTitle: "SIDA",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "home" },
        { title: "Model", path: "/signup", icon: "face" },
      ],
    };
  },
};
</script>

<style scoped>
#branding {
  color: #a239ca;
  text-shadow: 2px 3px 0px #ff0000 !important;
}
</style>
