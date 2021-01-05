<template>
  <div class="overflow-hidden rounded-lg bg-yellow-50" id="root">
    <ul class="tableSelectors">
      <li class="active">Flows</li>
      <li>Locations</li>
    </ul>
    <div class="tableWrapper">
      <table id="" class="">
        <thead>
          <th class="px-3 py-2 text-xl" v-for="col in columns" :key="col">
            {{ col }}
          </th>
          <th class="px-3 py-2 text-xl"></th>
          <tr></tr>
        </thead>

        <tbody class="overflow-y-scroll">
          <tr class="" v-for="(row, index) in getFlows" :key="index">
            <td v-for="col in columns" :key="col">{{ row[col] }}</td>
            <td class="removeItem" @click="removeFlow(index)">X</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../../../store";
import { mapGetters } from "vuex";

export default {
  name: "Table",
  components: {},
  data() {
    return {
      values: "getFlows",
    };
  },
  computed: {
    ...mapGetters(["getFlows", "getLocations"]),
    columns: function columns() {
      if (typeof this.getFlows != "undefined") {
        if (this.getFlows.length == 0) {
          console.log("Sero");
          return [];
        }
        console.log(Object.keys(this.getFlows[0]));
        return Object.keys(this.getFlows[0]);
      }
    },
  },
  methods: {
    removeFlow(i) {
      store.commit("removeFlow", i);
    },
  },
};
</script>

<style scoped>
#root {
  max-height: 45vh;
  min-height: 45vh;
}

.removeItem {
  @apply px-1;
  @apply text-2xl font-bold;
  @apply rounded-2xl cursor-pointer;
}

.tableSelectors {
  @apply flex flex-row items-center justify-start text-2xl font-extrabold flex-nowrap;
}

.tableWrapper {
  @apply overflow-x-scroll;
  @apply top-0;
  @apply text-lg;
  max-height: 45vh;
  background-color: lightgray;
  min-height: 45vh;
}

.tableWrapper thead th {
  @apply sticky;
  @apply top-0;
  background-color: lightgray;
}

li {
  @apply py-2;
  @apply px-8;
  @apply cursor-pointer;
}

li:hover {
  background-color: lightgray;
}

.active {
  background-color: lightgray;
}

table {
  /* VOID : #0E0B16
    - FUSCHIA : #A239CA
    - JEWEL : #4717F6
    - STARK : #E7DFDD */
  @apply w-full;
  @apply mx-auto;
}

table th {
  text-transform: capitalize;
  @apply text-center;
  padding: 8px;
  min-width: 30px;
}
table tr {
  @apply hover:bg-blue-300;
}

table tbody {
  max-height: 200px;
}
thead th {
  @apply sticky;
  @apply top-0;
}

table td {
  @apply text-center;
  padding: 8px;
  border-right: 2px solid #7d82a815;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f932;
}
</style>