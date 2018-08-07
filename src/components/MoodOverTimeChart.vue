<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <Heatmap />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <Timeline />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <GeneralMood />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Heatmap from '@/components/charts/Heatmap'
import Timeline from '@/components/charts/Timeline'
import GeneralMood from '@/components/charts/GeneralMood'

export default {
  components: { Heatmap, Timeline, GeneralMood }
}
</script>

<style lang="css">
</style>
