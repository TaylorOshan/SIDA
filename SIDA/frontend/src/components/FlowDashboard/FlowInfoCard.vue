<template>
  <div class="w-full h-full">
    <v-card
      outlined
      elevation="3"
      class="h-full"
      v-if="getPopupData && getPopupData.show"
    >
      <v-card-title class="text-h4">
        Location: {{ getPopupData.name }}
        <v-spacer></v-spacer>
        <v-btn icon @click="clearCurrentFlow">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle class="subtitle-1">
        {{ getPopupData.lon }}, {{ getPopupData.lat }}
      </v-card-subtitle>

      <v-card-text class="my-4">
        <v-row v-for="item in sliders" :key="item.label">
          <v-col class="pr-4" cols="12">
            <v-subheader
              class="pl-0 text-h6 font-weight-bold text-accent"
              style="z-index: 99 !important; postion: relative"
            >
              {{ item.label }}&nbsp;:&nbsp;{{ getPopupData[item.label] }}&nbsp;
              <span
                v-if="item.val != 100"
                :style="{ color: getSliderColor(item.val) }"
                class="flex flex-row items-center justify-start"
              >
                <v-icon x-small>mdi-multiplication</v-icon>
                {{ item.val }}%
              </span>
            </v-subheader>
            <v-slider
              :id="item.label"
              v-model="item.val"
              dense
              height="20"
              class="ml-4 align-center"
              label="    "
              :color="getSliderColor(item.val)"
              :max="200"
              :min="25"
              thumb-size="50"
              append-icon="mdi-close"
              @click:append="item.val = 100"
            >
              <template v-slot:thumb-label="{ value }">
                <span class="inline text-button font-weight-bold"
                  >{{ value }}%</span
                >
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-btn
          text
          color="primary"
          @click="submitFlowChanges"
          block
          large
          class="mt-4"
        >
          Submit Changes
        </v-btn>
      </v-card-text>

      <!-- <v-list-item class="body-1">
        <v-list-item-content>
          <v-list-item-title>Inflows : {{ getPopupData.in }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="body-1">
        <v-list-item-content>
          <v-list-item-title
            >Outflows : {{ getPopupData.out }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item> -->
    </v-card>

    <v-card
      v-else
      outlined
      elevation="3"
      class="h-full shake-slow shake-constant shake-constant--hover"
    >
      <div
        class="flex flex-col items-center justify-center w-full h-full text-center text-h4 headline font-weight-bold"
      >
        Click a Location to load its flows!
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../../store";

export default {
  name: "FlowInfoCard",
  components: {},
  data() {
    return {
      sliders: [
        { label: "o_attr", val: 100, color: "grey" },
        { label: "d_attr", val: 100, color: "grey" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getPopupData"]),
    thumbSize() {
      return;
    },
  },
  methods: {
    ...mapActions(["renderFlow"]),
    getSliderColor(val) {
      if (val < 100) {
        return "red";
      } else if (val > 100) {
        return "green";
      } else {
        return "gray";
      }
    },
    clearCurrentFlow() {
      store.commit("SET_POPUP_INFO", { display: false });
      store.commit("SET_FLOW_VISIBLE", false);
      console.log(this.getFlowVisibility);
      this.renderFlow();
    },
    submitFlowChanges() {
      console.log("Submit Flow Changfes");
      for (let item in this.sliders) {
        console.log(this.sliders[item].val);
      }
      console.log(typeof this.sliders);
      let [, val1, ,] = this.sliders[1];
      console.log(val1);
    },
  },
};
</script>

><<style scoped>


</style>