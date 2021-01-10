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
    <!-- <div class="tableWrapper">
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
    </div> -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TableFunctionCell from './TableFunctionCell.vue'
import TableItem from './TableItem.vue'
import TableHeader from './TableHeader.vue'

export default {
  name: 'Table',
  components: {
    TableFunctionCell,
    TableItem,
    TableHeader
  },
  data () {
    return {
      lists: ['flows', 'locations'],
      currentList: 'flows'
    }
  },
  computed: {
    ...mapGetters(['getFlows', 'getLocations']),
    columns: function columns () {
      if (typeof this.items !== 'undefined') {
        if (this.items == 0) {
          return []
        }
        return Object.keys(this.items[0])
      }
    },
    items () {
      if (this.currentList == 'flows') {
        return this.getFlows
      } else if (this.currentList == 'locations') {
        return this.getLocations
      }
    }
  },
  methods: {
    setActiveList (list) {
      this.currentList = list
    }
  }
}
</script>

<style scoped>
#root {
  max-height: 45vh;
  min-height: 45vh;
}
</style>
