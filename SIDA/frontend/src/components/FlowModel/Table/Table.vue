<template>
  <div class="overflow-hidden rounded-lg bg-yellow-50" id="root">
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
      <table id="" class="">
        <thead>
          <th class="px-3 py-2 text-xl" v-for="col in columns" :key="col">
            {{ col }}
          </th>
          <th class="px-3 py-2 text-xl"></th>
          <tr></tr>
        </thead>
        <tbody class="overflow-y-scroll">
          <tr class="" v-for="(row, index) in items" :key="index">
            <td v-for="col in columns" :key="col">{{ row[col] }}</td>
            <td class="removeItem" @click="removeItem(currentList, index)">
              X
            </td>
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
    removeItem(list, index) {
      console.log("remove from", list, index);
      //store.commit("removeFlow", i);
    },
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
  text-transform: capitalize;
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