<template>
  <div>
    <section class="relative">
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
        <router-link to="/#whatWeDo">
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

      <div class="relative h-32 mt-20 mb-12 md:mt-36">
        <a href="#scrollMarker" id="scrollMarker">
          <div class="flex flex-col items-center p-6 mb-5 arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </section>

    <section>
      <h2 id="whatWeDo" class="pt-4 pb-8 text-center text-h2 font-weight-bold">
        What we do
      </h2>

      <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="mb-8">
        <v-timeline-item color="primary" fill-dot right>
          <v-card>
            <v-card-title class="primary darken-2">
              <v-icon dark size="42" class="mr-4"> mdi-magnify </v-icon>
              <h2 class="display-1 white--text font-weight-light">Step 1</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                  scaevola imperdiet nec ut, sed euismod convenire principes at.
                  Est et nobis iisque percipit.
                </v-col>
                <!-- <v-col class="text-right hidden-sm-and-down" md="2">
                  <v-icon size="64"> mdi-calendar-text </v-icon>
                </v-col> -->
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="secondary lighten-2" fill-dot left small>
          <v-card>
            <v-card-title class="justify-end secondary lighten-1">
              <h2 class="mr-4 display-1 white--text font-weight-light">
                Step 2
              </h2>
              <v-icon dark size="42"> mdi-database-search </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                  scaevola imperdiet nec ut, sed euismod convenire principes at.
                  Est et nobis iisque percipit.
                </v-col>
                <v-col cols="12" md="4">
                  Lorem ipsum dolor sit amet, no nam oblique veritus.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="primary lighten-3" fill-dot right>
          <v-card>
            <v-card-title class="primary darken-3">
              <v-icon class="mr-4" dark size="42"> mdi-home-analytics </v-icon>
              <h2 class="display-1 white--text font-weight-light">Step 3</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col v-for="n in 3" :key="n" cols="12" md="4">
                  Lorem ipsum dolor sit amet, no nam oblique veritus no nam
                  oblique.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="secondary lighten-1" fill-dot left small>
          <v-card>
            <v-card-title class="justify-end secondary lighten-1">
              <h2 class="mr-4 display-1 white--text font-weight-light">
                Step 4
              </h2>
              <!-- <v-icon dark size="42"> mdi-account-multiple-outline </v-icon> -->
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="64"> mdi-map </v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                  scaevola imperdiet nec ut, sed euismod convenire principes at.
                  Est et nobis iisque percipit, an vim zril disputando
                  voluptatibus.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="accent lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="accent lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-check-bold </v-icon>
              <h2 class="display-1 white--text font-weight-light">Done</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                  scaevola imperdiet nec ut, sed euismod convenire principes at.
                  Est et nobis iisque percipit, an vim zril disputando
                  voluptatibus, vix an salutandi sententiae.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </section>
    <section id="models" class="mb-12">
      <h2 class="pt-12 pb-8 text-center text-h2 font-weight-bold">Models</h2>
      <v-row dense style="max-width: 800px" class="mx-auto">
        <v-col
          v-for="(card, _, index) in getPossibleDatasetInfo"
          :key="card.id"
          :cols="12"
          md="6"
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
        </v-col>
      </v-row>
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
      cards: [
        {
          title: "Pretty House",
          subtitle: "this is a house",
          body:
            "Spicy jalapeno bacon ipsum dolor amet andouille bresaola kevin, \
          jerky bacon chuck ribeye drumstick chicke filet mignon doner \
            burgdoggen beef ham hock. Kevin tongue ham hock jerky, \
            pork belly chicken short ribs capicola landjaeger. ",
          img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          width: 12,
          datasetID: "1d18fc7ee0d7935fc57f60f182ef7698",
        },
        {
          title: "Meaty Meats Meetup",
          subtitle: "Zuck got the meats",
          body:
            "Spicy jalapeno bacon ipsum dolor amet andouille bresaola kevin, \
          jerky bacon chuck ribeye drumstick chicke filet mignon doner \
            burgdoggen beef ham hock. Kevin tongue ham hock jerky, \
            pork belly chicken short ribs capicola landjaeger. ",
          img: "https://baconmockup.com/300/200",
          width: 6,
          datasetID: "1d18fc7ee0d7935fc57f60f182ef7698",
        },
        {
          title: "Cute Cat",
          subtitle: "This is a cute cat",
          body:
            "Spicy jalapeno bacon ipsum dolor amet andouille bresaola kevin, \
          jerky bacon chuck ribeye drumstick chicke filet mignon doner \
            burgdoggen beef ham hock. Kevin tongue ham hock jerky, \
            pork belly chicken short ribs capicola landjaeger. ",
          img: "http://placekitten.com/400/400",
          width: 6,
          datasetID: "1d18fc7ee0d7935fc57f60f182ef7698",
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
