<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <Heatmap />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Heatmap from '@/components/charts/Heatmap'

export default {
  components: { Heatmap }
}
</script>

<style lang="css">
</style>
