<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex v-if="!registeredUser" offset-sm2 offset-md3 offset-lg4 xs12 sm8 md6 lg4>
          <h1 class="headline">New User</h1>
          <p class="subheading">Create an account to keep track of your mood.</p>
          <v-form @submit.prevent="registeringUserSubmit" ref="registerUserForm" class="mt-4" v-model="registerUserFormValid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="Please include numbers and special characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <p v-if="registeringError" class="body-2 orange--text">{{registeringError.message}}</p>
            <v-btn :disabled="!registerUserFormValid" color="primary" :loading="!!registeringUser" type="submit">
              create
            </v-btn>
          </v-form>

        </v-flex>

        <v-flex v-else offset-sm2 offset-md3 offset-lg4 xs12 sm8 md6 lg4>
          <h1 class="headline green--text">One more thing :)</h1>
          <p class="subheading">Please check your email and type the confirmation number in the box below</p>
          <v-form @submit.prevent="validateUserCodeSubmit" ref="validateUserCode" class="mt-4" v-model="validateUserCodeFormValid" lazy-validation>
            <v-text-field
              v-model="userCode"
              :rules="userCodeRules"
              label="Confirmation Code"
              hint="A 6 digits code that we sent to your email"
              required
            ></v-text-field>
            <p v-if="validatingUserCodeError" class="body-2 orange--text">{{registeringError.message}}</p>
            <v-btn :disabled="!validateUserCodeFormValid" color="primary" :loading="!!validatingUserCode" type="submit">
              confirm
            </v-btn>
          </v-form>
        </v-flex>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('users')

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  data: () => ({
    registerUserFormValid: false,
    validateUserCodeFormValid: false,
    showPassword: false,
    email: 'jonathanmv@outlook.com',
    password: 'move0820',
    userCode: '',
    passwordRules: [
      v => !!v || 'Please provide a password',
      v => v.length > 7 || 'Password is too short'
    ],
    emailRules: [
      v => !!v || 'Please add an E-mail',
      v => emailPattern.test(v) || 'Please use a valid E-mail'
    ],
    userCodeRules: [
      v => !!v || 'Please provide a 6 digits confirmation code',
      v => v.length === 6 || 'Please provide a 6 digits confirmation code'
    ]
  }),
  computed: {
    ...mapGetters([
      'registeringUser',
      'registeringError',
      'registeredUser',
      'validatingUserCode',
      'validatingUserCodeError'
    ])
  },
  methods: {
    ...mapActions([
      'registerUser',
      'validateUserCode'
    ]),
    registeringUserSubmit () {
      if (this.$refs.registerUserForm.validate() && !this.registeringUser) {
        const { email, password } = this
        this.registerUser({ email, password })
      }
    },
    validateUserCodeSubmit () {
      if (this.$refs.validateUserCode.validate() && !this.validatingUserCode) {
        const { email, userCode } = this
        this.validateUserCode({ email, userCode })
      }
    }
  }
}
</script>

<style lang="css">
</style>
