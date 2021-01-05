<template>
  
    
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { mapGetters } from "vuex";

export default {
  name: "TableItem",
  components: {},
  props: {
    rowItem: {
      type: Object,
    },
  },
  data() {
    return {
      locations: [],
      flows: [],
    };
  },
  computed: {
    computed: {
      ...mapGetters(["getFlows", "getLocations"]),
      
    },
  },
};
</script>

<style scoped>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}
</style>