<template>
  <v-app>
    <v-app-bar app elevate-on-scroll :collapse-on-scroll="!ifHomePage()">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <router-link :to="{ name: 'Home' }">
        <v-toolbar-title>
          <v-img
            contain
            alt="SIDA"
            src="./assets/SIDA_LOGO_PURPLE.png"
            max-width="100"
          >
          </v-img>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-menu></v-menu>

      <router-link :to="{ name: 'Home' }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
      </router-link>

      <router-link to="/#models">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs">
              <v-icon>mdi-globe-model</v-icon>
            </v-btn>
          </template>
          <span>Models</span>
        </v-tooltip>
      </router-link>

      <router-link to="/#about">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs">
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>
          <span>About</span>
        </v-tooltip>
      </router-link>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            href="https://github.com/TaylorOshan/SIDA"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>Github</span>
      </v-tooltip>
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
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    ifHomePage() {
      if (this.currentRouteName === "Home") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
#branding {
  color: #a239ca;
  text-shadow: 2px 3px 0px #ff0000 !important;
}
</style>
