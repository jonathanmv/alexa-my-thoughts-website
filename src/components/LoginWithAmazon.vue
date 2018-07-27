<template lang="html">
  <div>
    <v-btn flat v-if="isAuthorized" @click.stop="logout">Logout</v-btn>
    <v-btn flat v-else @click.stop="login">Login</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    loaded: false
  }),
  computed: mapGetters([
    'isAuthorized'
  ]),
  methods: {
    ...mapActions([
      'setUpLoginWithAmazon',
      'login',
      'logout'
    ])
  },
  mounted () {
    this.setUpLoginWithAmazon()
  }
}
</script>

<style lang="css">
</style>
