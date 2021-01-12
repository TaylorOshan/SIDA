<template>
  <div class="flex flex-row items-center justify-center p-2">
    <DeleteIcon
      class="cursor-pointer"
      @click="sendDelete"
      v-show="!isMarked"
    ></DeleteIcon>
    <UndoIcon
      class="cursor-pointer"
      @click="sendUndo"
      v-show="isMarked"
    ></UndoIcon>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteIcon from "../../DeleteIcon.vue";
import UndoIcon from "../../UndoIcon.vue";

export default {
  name: "TableFunctionCell",
  components: {
    DeleteIcon,
    UndoIcon,
  },
  data() {
    return {
      isMarked: false,
    };
  },
  methods: {
    mark() {
      this.$emit("mark");
      this.isMarked = !this.isMarked;
    },
    sendDelete() {
      this.mark();
      this.$emit("removeItem");
    },
    sendUndo() {
      this.mark();
      this.$emit("undoItem");
    },
  },
};
</script>