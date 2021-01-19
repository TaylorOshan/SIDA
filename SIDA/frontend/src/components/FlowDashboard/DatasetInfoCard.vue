<template>
  <v-card outlined v-ripple elevation="3" class="w-full h-full">
    <v-card-title class="text-h4"> LODES </v-card-title>

    <v-card-subtitle class="subtitle-1"> data set info </v-card-subtitle>

    <v-card-text class="body-1">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, fuga porro.
      Impedit eaque cumque voluptatibus voluptatum deleniti? A quam mollitia at
      quia laborum explicabo! Assumenda tenetur nostrum rerum neque totam?Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Et, fuga porro.
      Impedit eaque cumque voluptatibus voluptatum deleniti? A quam mollitia at
      quia laborum explicabo! Assumenda tenetur nostrum rerum neque totam?
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="reveal = true"
        block
        large
        class="left-0"
        :disabled="!getPredictionErrors.show"
      >
        See Flow Deltas
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
        outlined
        elevation="3"
      >
        <v-card-title class="text-h4">
          <v-icon x-large dark color="secondary">mdi-delta</v-icon>
        </v-card-title>

        <v-card-text class="text-center text-h4 text-accent font-weight-bold">
          Mean-Square <v-icon dark color="secondary">mdi-delta</v-icon>
        </v-card-text>

        <v-card-text class="text-center font-weight-light text-h5 color-red">
          {{ getPredictionErrors.mse }}
        </v-card-text>

        <v-card-text class="text-center text-h4 text-accent font-weight-bold">
          Absolute <v-icon dark color="secondary">mdi-delta</v-icon>
        </v-card-text>

        <v-card-text class="text-center font-weight-light text-h5">
          {{ getPredictionErrors.abs }}
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="accent"
            @click="reveal = false"
            block
            large
            absolute
            bottom
          >
            <v-icon>mdi-backburger</v-icon>
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DataSetInfoCard",
  data() {
    return {
      reveal: false,
    };
  },
  computed: {
    ...mapGetters(["getPredictionErrors"]),
  },
};
</script>

><<style scoped>

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>