<template>
  <div>
    <section class="relative h-screen">
      <v-container
        class="flex flex-col items-center justify-center pt-20 mb-8 md:flex-row md:pt-36"
      >
        <h1 class="sm:text-center text-h2 font-weight-black md:text-left">
          <span class="block"><strong>S</strong>patial</span>
          <span class="block"><strong>I</strong>nteraction</span>
          <span class="block"><strong>D</strong>ecision</span>
          <span class="block"><strong>A</strong>nalytics</span>
        </h1>

        <!-- <div>
          <div id="globe"></div>
        </div> -->
      </v-container>

      <v-container
        class="flex flex-col items-center justify-around mx-auto md:flex-row md:justify-center"
      >
        <router-link to="/#about">
          <v-btn class="btn" elevation="10" x-large color="primary" outlined>
            Learn More
          </v-btn>
        </router-link>

        <router-link to="/#models">
          <v-btn class="btn" elevation="10" x-large color="primary" outlined>
            See our Models
          </v-btn>
        </router-link>
      </v-container>

      <div
        class="absolute bottom-0 w-full md:relative md:pt-40"
        style="padding-bottom: 20vh"
      >
        <a href="#about" id="scrollMarker">
          <div class="flex flex-col items-center p-6 arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </section>

    <section id="about">
      <v-lazy
        :options="{
          threshold: 1,
        }"
        min-height="200"
        transition="fade-transition"
      >
        <h1 class="max-w-3xl p-4 mb-10 text-right font-weight-bold text-h3">
          We are the next generation of spatial decision support.
        </h1>
      </v-lazy>

      <v-row class="mt-40 mb-6" >
        <v-col cols="12" md="6" class="flex flex-col items-center justify-center">
          <p
            class="max-w-sm pl-4 mt-40 mb-10 leading-relaxed text-left p-7 font-weight-medium"
            style="font-size: 1.2rem !important"
          >
            Our vision is to streamline spatial interaction analysis through
            SIDA, a lightweight, flexible platform that allows users of all
            backgrounds to leverage predefined sets of organized results and
            visualizations for spatial interaction modelling.
          </p>
        </v-col>
        <v-col  cols="12" md="6">
          <v-img
            lazy-src="../../assets/connected_world.svg"
            max-height="600"
            max-width="350"
            src="../../assets/connected_world.svg"
          ></v-img>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="mb-8">
        <v-timeline-item fill-dot v-for="(item, i) in timelineItems" :key="i" :color="item.color" :icon="item.icon">
          <v-card shaped>
            <v-container>
              <v-row>
                <v-col cols="12" md="10" class="text-h5 font-weight-light">
                  {{item.text}}
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </section>

    <v-lazy
      :options="{
        threshold: 1,
      }"
      min-height="200"
      transition="fade-transition"
      style="margin-top: 5rem; margin-bottom: 5rem"
    >
      <section>
        <h2
          
          class="pt-4 pb-8 pl-2 text-left text-h3 font-weight-bold"
        >
          How to Use
        </h2>

        <v-expansion-panels popout>
          <v-expansion-panel v-for="(item, i) in howToItems" :key="i">
            <v-expansion-panel-header
              class="font-weight-medium text-subtitle-1"
            >
              {{item.title}}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-body-1">
              {{item.text}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </v-lazy>
    <section id="models" class="mb-12">
      
        <v-divider></v-divider>
        <h2 class="pt-12 pb-5 pl-2 text-left text-h3 font-weight-bold">
          Models
        </h2>
        <v-row dense style="max-width: 800px" class="pt-10 mx-auto">
          <v-col
            v-for="(card, _, index) in getPossibleDatasetInfo"
            :key="card.id"
            :cols="12"
            md="6"
          >
          <v-lazy
        :options="{
          threshold: 1,
        }"
        transition="fade-transition"
        style="margin-bottom: 5rem"
      >
            <DataSetCard
              :imgLink="card[index].image_url"
              :datasetID="card[index].id"
            >
              <template v-slot:title>
                {{ card[index].name }}
              </template>
              <template v-slot:subtitle>
                {{ card[index].subtitle }}
              </template>
              <template v-slot:body>
                {{ card[index].description }}
              </template>
            </DataSetCard>
          </v-lazy>
          </v-col>
        </v-row>
      </v-lazy>
    </section>
  </div>
</template>

<script>
import DataSetCard from "./DataSetCard.vue";
import { mapGetters, mapActions } from "vuex";
import store from "../../store";
export default {
  name: "HomePage",
  components: {
    DataSetCard,
  },

  data() {
    return {
      timelineItems: [
        {
          color: "primary",
          icon: "mdi-database",
          text:
            "Data is pre-cleaned and formatted, ready for immediate use in your spatial interaction model.",
        },
        {
          color: "secondary lighten-2",
          icon: "mdi-code-braces-box",
          text:
            "Models are intelligently calibrated and available for immediate use",
        },
        {
          color: "accent lighten-2",
          icon: "mdi-antenna",
          text:
            "Our dashboard lets you instantly visualize large datasets with minimal resource requirements",
        },
        {
          color: "primary darken-2",
          icon: "mdi-cards-heart",
          text:
            "With built in-attribute tuning, you can predict changing parameters to your hearts content",
        },
      ],
      howToItems: [
        {
          title: "Step 1",
          text: "Select a model from the Models section below.",
        },
        {
          title: "Step 2",
          text:
            "On each model’s page, the central element is a map illustrating the dataset, allowing one to visualize the mobility flows by clicking on a location. Below this, there are sliders which enable the user to modify data values at a given location and resubmit these values to receive a new prediction.",
        },
        {
          title: "Step 3",
          text:
            "After modifying the data values, click on “submit” and view the new predicted flows from the selected location in the map view. On the left, the deltas pane will update with the mean-square error and the absolute error of this prediction.",
        },
        {
          title: "Step 4",
          text:
            "That’s it! You’re now ready to use SIDA to imagine different futures in your human mobility dataset.",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["loadPossibleDatasets"]),
  },
  computed: {
    ...mapGetters(["getPossibleDatasetInfo"]),
  },
  async mounted() {
    store.commit("SET_DATASET_NAME", this.name);
    await this.loadPossibleDatasets();
  },
};
</script>

<style scoped>
h1 span strong {
  color: #a732fc;
  text-shadow: 2px 3px 0px #1db980;
}

.btn {
  @apply mx-4;
  @apply my-4;
  @apply md:flex-col;
  min-width: 185px;
}

#globe {
  max-width: 500px;
  max-height: 500px;
  min-width: 300px;
  min-height: 300px;
  overflow: hidden;
  @apply flex flex-col justify-center items-center;
}
</style>
