<template>
  <section class="overflow-hidden rounded-lg bg-yellow-50" id="root">
    <ul class="tableSelectors">
      <li
        v-for="list in lists"
        :key="list"
        @click="setActiveList(list)"
        :class="{ active: currentList == list }"
      >
        {{ list }}
      </li>
    </ul>
    <div class="tableWrapper">
      <table class="w-full mx-auto">
        <TableHeader :columns="columns"></TableHeader>
        <tbody class="overflow-y-scroll">
          <TableItem
            :row="row"
            :columns="columns"
            v-for="(row, index) in items"
            :key="index"
            :currentList="currentList"
            :index="index"
          ></TableItem>
        </tbody>
      </table>
    </div>
  </section>
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
      currentList: "flows",
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations"]),
    columns: function columns() {
      if (typeof this.items != "undefined") {
        if (this.items == 0) {
          return [];
        }
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
.tableSelectors {
  @apply flex flex-row items-center justify-start text-2xl font-extrabold flex-nowrap;
}

.tableWrapper {
  @apply overflow-x-hidden;
  @apply top-0;
  @apply text-lg;
  max-height: 45vh;
  background-color: lightgray;
  min-height: 45vh;
}

li {
  @apply py-2;
  @apply px-8;
  @apply cursor-pointer;
  text-transform: capitalize;
}

li:hover {
  background-color: lightgray;
}

.active {
  background-color: lightgray;
}

/* VOID : #0E0B16
    - FUSCHIA : #A239CA
    - JEWEL : #4717F6
    - STARK : #E7DFDD */

table tbody {
  max-height: 200px;
}

table tbody tr:nth-child(2n) td {
  background: #d4d8f932;
}
</style>