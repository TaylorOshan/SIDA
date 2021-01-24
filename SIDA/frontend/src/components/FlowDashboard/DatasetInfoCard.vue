<template>
  <v-card outlined elevation="3" class="w-full h-full">
    <v-card-title class="text-h4 font-weight-medium">
      {{ getSelectedDatasetInfo.name }}
    </v-card-title>

    <v-card-subtitle class="subtitle-1 font-italic font-weight-light">
      <a :href="getSelectedDatasetInfo.source" style="color: #ff4071">
        {{ getSelectedDatasetInfo.source }}</a
      >
    </v-card-subtitle>

    <v-card-text class="body-1 font-weight-light">
      {{ getSelectedDatasetInfo.description }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="clickToAltCard"
        block
        large
        class="left-0"
        :disabled="!getPredictionErrors.show"
      >
        Histogram Deltas
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
        <HistCard :trigger="genHist" />

        <v-card-actions class="pt-0">
          <v-btn
            text
            color="accent"
            @click="reveal = false"
            medium
            absolute
            bottom
          >
            <v-icon>mdi-backburger</v-icon>
            Back
          </v-btn>
        </v-card-actions>
        <!-- <v-card-title class="text-h4">
          <v-icon x-large dark color="secondary">mdi-delta</v-icon>
        </v-card-title>

        <v-card-text class="text-center text-h5 text-accent font-weight-bold">
          Mean-Square Delta
        </v-card-text>

        <v-card-text class="text-center font-weight-light text-h5 color-red">
          {{ getPredictionErrors.mse }}
        </v-card-text>

        <v-card-text class="text-center text-h5 text-accent font-weight-bold">
          Absolute Delta
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
        </v-card-actions> -->
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import HistCard from "./HistCard.vue";
export default {
  name: "DataSetInfoCard",
  components: {
    HistCard,
  },
  data() {
    return {
      reveal: false,
      genHist: 1,
    };
  },
  computed: {
    ...mapGetters(["getPredictionErrors", "getSelectedDatasetInfo"]),
  },
  methods: {
    clickToAltCard() {
      this.reveal = true;
    },
  },
};
</script>

<<style scoped>

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>