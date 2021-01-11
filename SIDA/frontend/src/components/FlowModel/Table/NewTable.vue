<template>
  <v-card>
    <v-card-title class="font-weight-bold">
      <v-btn-toggle v-model="toggleLocations" mandatory>
        <v-btn
          class="px-4 text-h5 list-selector"
          v-for="item in lists"
          :key="item"
        >
          {{ item }}
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        clearable
        style="max-width: 300px"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
      show-group-by
      height="300"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import TableFunctionCell from "./TableFunctionCell.vue";
import TableItem from "./TableItem.vue";
import TableHeader from "./TableHeader.vue";

export default {
  name: "Table",
  components: {
    TableFunctionCell,
    TableItem,
    TableHeader,
  },
  data() {
    return {
      search: "",
      lists: ["locations", "flows"],
      currentList: "locations",
      toggleLocations: 0,
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations"]),
    columns: function columns() {
      if (typeof this.items !== "undefined") {
        if (this.items == 0) {
          return [];
        }
        let array = Object.keys(this.items[0]);
        let index = array.indexOf("id");
        array.splice(index, 1);
        return array;
      }
    },
    items() {
      if (this.toggleLocations === 1) {
        console.log(this.getFlows);
        return this.getFlows;
      } else if (this.toggleLocations === 0) {
        return this.getLocations;
      }
    },
    headers() {
      let array = [];
      for (let item of this.columns) {
        array.push({
          text: item.charAt(0).toUpperCase() + item.slice(1),
          value: item,
        });
      }
      return array;
    },
  },
  methods: {
    // setActiveList(list) {
    //   this.currentList = list;
    // },
  },
};
</script>

<style scoped>
#root {
  max-height: 45vh;
  min-height: 45vh;
}

.list-selector {
  min-width: 120px !important;
}
</style>
