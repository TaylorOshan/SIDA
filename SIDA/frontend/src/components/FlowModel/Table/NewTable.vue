<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
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
      lists: ["flows", "locations"],
      currentList: "locations",
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations"]),
    columns: function columns() {
      if (typeof this.items !== "undefined") {
        if (this.items == 0) {
          return [];
        }
        console.log(Object.keys(this.items[0]));
        return Object.keys(this.items[0]);
      }
    },
    items() {
      if (this.currentList == "flows") {
        return this.getFlows;
      } else if (this.currentList == "locations") {
        return this.getLocations;
      }
    },
    headers() {
      let array = [];

      for (let item of this.columns) {
        array.push({ text: item, value: item });
      }
      return array;
    },
  },
  methods: {
    setActiveList(list) {
      this.currentList = list;
    },
  },
};
</script>

<style scoped>
#root {
  max-height: 45vh;
  min-height: 45vh;
}
</style>
