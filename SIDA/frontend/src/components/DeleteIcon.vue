<template>
  <svg
    class="icon line"
    :width="24"
    :height="24"
    id="delete"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M4,7H20M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7"
      style="
        fill: none;
        stroke: #000;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2px;
      "
    ></path>
    <path
      d="M6,7H18a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A0,0,0,0,1,6,7Z"
      style="
        fill: none;
        stroke: #000;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2px;
      "
    ></path>
  </svg>
</template>
<script>
export default {
  name: 'DeleteIcon',
  props: {
    width: { type: [Number, String], default: '16' },
    height: { type: [Number, String], default: '16' }
  }
}
</script>
