<template>
  
</template>

<script>
export default {
  name: "FlowInfoSlider",
  props: {
    header: String,
  },
  data() {
    return {
      slider: 0,
    };
  },
  computed: {
    
  },
  method: {
    endSlide: function (value) {
      $emit("endSlide", value);
    },
  },
};
</script>