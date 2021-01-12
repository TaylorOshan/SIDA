<template>
  <v-app>
    <!-- <v-navigation-drawer app>
      
    </v-navigation-drawer> -->

    <v-app-bar absolute app elevate-on-scroll dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <!-- <v-toolbar-title class="text-h3 font-weight-medium">SIDA</v-toolbar-title> -->
      <router-link :to="{ name: 'Home' }">
        <v-toolbar-title>
          <v-img alt="SIDA" src="./assets/SIDA_LOGO_PURPLE.png" max-width="100">
          </v-img>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-menu></v-menu>

      <router-link :to="{ name: 'Home' }">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'Home' }">
        <v-btn icon>
          <v-icon>mdi-globe-model</v-icon>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'Home' }">
        <v-btn icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </router-link>

      <v-btn icon href="http://github.com">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app absolute padless color="secondary">
      <v-card class="w-full text-center" color="transparent">
        <v-card-text class="text-h6 font-weight-light"
          >&#169; 2020 SIDA</v-card-text
        >
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

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
