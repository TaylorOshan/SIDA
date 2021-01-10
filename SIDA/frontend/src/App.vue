<template>
  <v-app>
    <!-- <v-navigation-drawer app>
      
    </v-navigation-drawer> -->

    <v-app-bar app absolute elevate-on-scroll dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>SIDA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app absolute padless>
      <Footer />
    </v-footer>
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
