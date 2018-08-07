<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <h3 class="headline text-xs-center">How you feel, generally</h3>
                <GeneralMood />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <h3 class="headline text-xs-center">How often you report your mood</h3>
                <Heatmap />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card class="mb-3">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <h3 class="headline text-xs-center">How is your mood during the days</h3>
                <Timeline />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
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
