<template>
  <v-card outlined v-ripple elevation="3" class="w-full h-full">
    <v-card-title class="text-h4"> LODES </v-card-title>

    <v-card-subtitle class="subtitle-1"> data set info </v-card-subtitle>

    <v-card-text class="body-1">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, fuga porro.
      Impedit eaque cumque voluptatibus voluptatum deleniti? A quam mollitia at
      quia laborum explicabo! Assumenda tenetur nostrum rerum neque totam?Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Et, fuga porro.
      Impedit eaque cumque voluptatibus voluptatum deleniti? A quam mollitia at
      quia laborum explicabo! Assumenda tenetur nostrum rerum neque totam?
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="reveal = true"
        block
        large
        absolute
        bottom
      >
        See Flow Deltas
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
        outlined
        elevation="3"
      >
        <v-card-title class="text-h4">
          <v-icon x-large dark color="secondary">mdi-delta</v-icon>
        </v-card-title>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="">
                <th class="text-center text-h5 font-weight-bold">Original</th>
                <th class="text-center text-h5 font-weight-bold">Computed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="body-1 font-weight-medium">Population</td>
                <td class="body-1 font-weight-medium">Other Attr</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="accent"
            @click="reveal = false"
            block
            large
            absolute
            bottom
          >
            <v-icon>mdi-backburger</v-icon>
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "DataSetInfoCard",
  data() {
    return {
      reveal: false,
    };
  },
};
</script>

><<style scoped>

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>