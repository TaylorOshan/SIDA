<template>
  <tr class="hover:bg-blue-300" :class="{ marked: isMarked }">
    <td class="text-center" v-for="col in columns" :key="row + col">
      {{ row[col] }}
    </td>
    <TableFunctionCell
      @mark="mark"
      @removeItem="removeItem"
      @editItem="editItem"
      @undoItem="undoItem"
    ></TableFunctionCell>
  </tr>
</template>

<script>
import TableFunctionCell from './TableFunctionCell.vue'
import store from '../../../store'
export default {
  name: 'TableItem',
  components: {
    TableFunctionCell
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    currentList: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isMarked: false
    }
  },
  computed: {},
  methods: {
    mark () {
      this.isMarked = !this.isMarked
    },
    removeItem () {
      if (this.isMarked) {
        if (this.currentList == 'flows') {
          console.log('remove from', this.currentList, this.index)
          store.commit('setRemoveFlow', this.index)
        } else if (this.currentList == 'locations') {
          console.log('remove from', this.currentList, this.index)
          store.commit('setRemoveLocation', this.index)
        } else {
          console.log('ERR: Removal of unknown item')
        }
      }
    },
    editItem () {
      console.log('edit from', list, index)
      if (list == 'flows') {
        store.commit('setEditFlow')
      } else {
        console.log('Edit of unknown item')
      }
    },
    addItem () {
      if (list == 'flows') {
        store.commit('setNewFlow')
      } else if (list == 'locations') {
        store.commit('setNewLocation')
      } else {
        console.log('Adding unknown Object')
      }
    },
    undoItem () {
      // undo all modifications to item
    }
  }
}
</script>

<style scoped>
table td {
  padding: 8px;
  border-right: 2px solid #7d82a815;
}
table td:last-child {
  border-right: none;
}

.marked {
  text-decoration: line-through;
  background-color: rgb(60, 68, 60) !important;
}

.undo {
  text-decoration: none !important;
  background-color: initial;
}
</style>
