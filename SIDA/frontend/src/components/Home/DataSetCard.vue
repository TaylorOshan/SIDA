<template>
  <v-card class="mx-auto" max-width="500" elevation="5" outline>
    <v-container>
      <v-img
        :src="imgLink"
        height="200px"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        class="align-end"
      >
        <v-card-title class="text-h6 font-weight-bold text-capitalize">
          <slot name="title"></slot>
        </v-card-title>
        <v-card-subtitle class="text-subtitle-2 font-weight-light">
          <slot name="subtitle"></slot
        ></v-card-subtitle>
      </v-img>

      <v-card-actions>
        <router-link :to="{ name: 'Flow Dashboard', params: { name: datasetID } }">
          <v-btn color="accent text-button" text> Model Me </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="show = !show" v-on="on" v-bind="attrs">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </template>
          <span>See more</span>
        </v-tooltip>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="text-body-1">
            <slot name="body"></slot>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "DataSetCard",
  data: () => ({
    show: false,
  }),
  props: {
    imgLink: String,
    datasetID : String
  },
};
</script>