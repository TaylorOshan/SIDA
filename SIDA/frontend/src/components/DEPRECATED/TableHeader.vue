<template>
  <thead>
    <th
      class="sticky top-0 px-3 py-2 text-xl text-center"
      v-for="col in columns"
      :key="col"
    >
      {{ col }}
    </th>
  </thead>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    columns: {
      type: Array
    }
  }
}
</script>

<style scoped>
thead th {
  background-color: lightgray;
  text-transform: capitalize;
  padding: 8px;
  min-width: 30px;
}
</style>
