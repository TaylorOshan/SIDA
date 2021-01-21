<template>
  <div class="w-full h-full">
    <v-card
      outlined
      elevation="3"
      class="h-full overflow-hidden"
      v-if="getHistData.length > 1"
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
        x: this.getHistData,
        type: "histogram",
        marker: {
          color: "#ff6859",
        },
      },
      layout: {
        autosize: true,
        paper_bgcolor: "#33333d",
        plot_bgcolor: "#33333d",
        font: {
          family: "Eczar",
          size: 18,
          color: "white",
        },
        title: {
          text: `Relative delta magnitude between modified and observed flows`,
        },
        xaxis: {
          title: {
            text: "flows",
          },
          automargin: true,
        },
        yaxis: {
          title: {
            text: "modified over observed",
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
      console.log("trigger");
      this.trace.x = this.getHistData;
      this.createPlotyHist();
    },
  },
  methods: {
    createPlotyHist() {
      Plotly.newPlot("hist", [this.trace], this.layout, this.config);
    },
  },
};
</script>