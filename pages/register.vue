<template>
  <div>
    <h1>Register</h1>

    <v-alert
      v-if="frmMeta.status === 'error'"
      border="left"
      prominent
      type="error"
    >
      {{ frmMeta.error }}
    </v-alert>

    <v-alert v-if="frmMeta.status === 'submitted'" border="left" type="info">
      You have successfully registered. Please login.
      <!-- login button -->
      <template v-if="!$auth.loggedIn">
        <v-btn to="/login" text>Login</v-btn>
      </template>
    </v-alert>

    <ValidationObserver
      v-slot="{ invalid }"
      ref="observer"
      style="max-width: 800px; margin: auto"
    >
      <form
        class="mt-5"
        style="max-width: 800px; margin: auto"
        @submit.prevent="submit"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="First name"
          rules="required|min:3"
        >
          <v-text-field
            v-model="frm.firstName"
            :error-messages="errors"
            label="First name"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Last name"
          rules="required|min:3"
        >
          <v-text-field
            v-model="frm.lastName"
            :error-messages="errors"
            label="Last name"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="frm.username"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Password"
          rules="required|min:7"
        >
          <v-text-field
            v-model="frm.password"
            type="password"
            :error-messages="errors"
            label="Password"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Password confirmation"
          :rules="`required|confirmedCustom:` + frm.password"
        >
          <v-text-field
            v-model="frm.confirmPassword"
            type="password"
            :error-messages="errors"
            label="Confirm password"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="checkbox"
        >
          <v-checkbox
            v-model="frm.agree"
            :error-messages="errors"
            :value="true"
            label="I agree to the terms and conditions"
            type="checkbox"
            required
          ></v-checkbox>
        </ValidationProvider>

        <div class="d-flex justify-end">
          <v-btn class="mr-4" @click="clear"> Clear </v-btn>
          <v-btn type="submit" :disabled="invalid" :loading="buttonLoading">
            Submit
          </v-btn>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

const name = 'RegisterPage'
const components = { ValidationObserver, ValidationProvider }

const frmDefaults = () => {
  return {
    username: '',
    password: '',
    confirmPassword: '',
    agree: false,
    firstName: 'John',
    lastName: 'Doe',
  }
}

const data = () => ({
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
  buttonLoading: false,
})

const frmMetaDefaults = () => ({
  error: null,
  status: null,
})

const methods = {
  async submit() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    this.buttonLoading = true

    try {
      await this.$axios.$post(`api/users/register/2`, this.frm, config)
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      this.buttonLoading = false
      return
    }

    this.buttonLoading = false
    this.frmMeta.status = 'submitted'

    this.clear()
  },

  clear() {
    this.frm = frmDefaults()
    this.$refs.observer.reset()
  },
}

export default { name, components, data, methods }
</script>
