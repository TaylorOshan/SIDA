<template>
  <div class="w-full h-full">
    <v-card
      outlined
      elevation="3"
      class="h-full overflow-hidden"
      :v-if="getHistData && getHistData.show"
    >
      <div id="hist" class="w-full h-full"></div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../../store";
import Plotly from "plotly.js";

export default {
  name: "FlowInfoCard",
  components: {},
  data() {
    return {
      config: {
        responsive: true,
      },
      trace: {
        x: null,
        type: "histogram",
      },
      layout: {
        autosize: true,
        font: {
          family: "Serif Eczar",
        },
        title: {
          text: "Relative delta magnitude between modified and observed flows",
        },
        xaxis: {
          title: {
            text: "flows",
          },
          automargin: true,
        },
        yaxis: {
          title: {
            text: "modified divided by observed",
          },
          automargin: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getHistData"]),
  },
  watch: {
    getHistData: function () {
      console.log(this.getHistData.show);
      if (this.getHistData.data != null) {
        console.log("creating plotly");
        this.trace.x = this.getHistData.data;
        this.createPlotyHist();
      }
    },
  },
  methods: {
    createPlotyHist() {
      Plotly.newPlot("hist", [this.trace], this.layout, this.config);
    },
  },
};
</script>