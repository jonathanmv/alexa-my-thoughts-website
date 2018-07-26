<template lang="html">
  <div>
    <v-btn v-if="isAuthorized" @click.stop="logout">Logout</v-btn>
    <v-btn v-else @click.stop="login">Login</v-btn>
  </div>
</template>

<script>
/* global amazon */
import { mapGetters, mapActions } from 'vuex'

const {
  LOGIN_WITH_AMAZON_CLIENT_ID,
  LOGIN_WITH_AMAZON_REDIRECT_URL
} = process.env

export default {
  data: () => ({
    loaded: false
  }),
  computed: mapGetters([
    'isAuthorized'
  ]),
  methods: {
    ...mapActions([
      'logout'
    ]),
    login () {
      const options = { scope: 'profile', popup: false }
      amazon.Login.authorize(options, LOGIN_WITH_AMAZON_REDIRECT_URL)
    }
  },
  mounted () {
    if (!this.loaded) {
      this.loaded = true
      pluginSetup()
    }
  }
}

const loadLibrary = d => {
  const c = d.getElementsByTagName('head')[0]
  const a = d.createElement('script')
  a.type = 'text/javascript'
  a.async = true
  a.id = 'amazon-login-sdk'
  a.src = 'https://api-cdn.amazon.com/sdk/login1.js'
  c.appendChild(a)
}
const pluginSetup = () => {
  window.onAmazonLoginReady = () => amazon.Login.setClientId(LOGIN_WITH_AMAZON_CLIENT_ID)
  loadLibrary(document)
}
</script>

<style lang="css">
</style>
