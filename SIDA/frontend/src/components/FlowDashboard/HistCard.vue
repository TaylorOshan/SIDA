<template>
  <div class="w-full h-full">
    <v-card class="h-full overflow-hidden" v-if="getHistData.length > 1">
      <div id="hist" ref="histChart" class="w-full h-full"></div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Plotly from "plotly.js";

export default {
  name: "FlowInfoCard",
  data() {
    return {
      config: {
        responsive: true,
        displayModeBar: false,
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
        showlegend: false,
        font: {
          family: "Eczar",
          size: 12,
          color: "white",
        },
        title: {
          text: `Relative delta modified | observed flows`,
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
  watch: {
    getHistData: function () {
      this.createHist();
    },
  },
  methods: {
    createHist() {
      this.trace.x = this.getHistData;
      Plotly.newPlot("hist", [this.trace], this.layout, this.config);
    },
  },
  computed: {
    ...mapGetters(["getHistData"]),
  },
  mounted() {
    this.createHist();
  },
};
</script>