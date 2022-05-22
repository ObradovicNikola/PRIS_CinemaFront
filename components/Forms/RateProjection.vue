<template>
  <div>
    <v-card style="min-width: 350px">
      <v-card-title class="pb-0">
        <span class="text-h5">Rate this movie</span>
      </v-card-title>
      <ValidationObserver
        v-slot="{ invalid }"
        ref="observer"
        style="max-width: 800px; margin: auto"
      >
        <form
          class="mt-0 d-flex"
          style="max-width: 800px; margin: auto"
          @submit.prevent="submit"
        >
          <v-card-text>
            <v-alert
              v-if="frmMeta.status === 'error'"
              border="left"
              prominent
              type="error"
            >
              {{ frmMeta.error }}
            </v-alert>

            <v-alert
              v-if="frmMeta.status === 'submitted'"
              border="left"
              type="info"
            >
              You have successfully rated this movie.
            </v-alert>

            <ValidationProvider
              v-slot="{ errors }"
              name="seatsGroundFloor"
              :rules="{
                required: true,
                regex: ratingRegex,
                numeric_message: true,
              }"
            >
              <v-text-field
                v-model="frm.rating"
                style="max-width: 200px"
                type="text"
                :error-messages="errors"
                label="Rating (1-5)"
                required
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ml-3" @click="clear"> Clear </v-btn>
            <v-btn
              class="ml-3"
              type="submit"
              color="orange darken-1"
              text
              :disabled="invalid"
              :loading="buttonLoading"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// const FormData = require('form-data')

const name = 'NewHallModal'
const components = { ValidationObserver, ValidationProvider }
const props = {
  idProjection: {
    type: Number,
    required: true,
  },
}

const frmDefaults = () => {
  return {
    rating: 5,
  }
}

const frmMetaDefaults = () => ({
  error: null,
  status: null,
})

// data
const data = () => ({
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
  buttonLoading: false,
  ratingRegex: /^[12345]$/,
})

const methods = {
  async submit() {
    // await console.log(this.frm.datumAktivnostiunixTimestamp)
    this.buttonLoading = true

    let res
    try {
      res = await this.$axios.$post(
        `api/movies/projections/rate/${this.idProjection}?rating=${this.frm.rating}`
      )
      await this.$nuxt.refresh()
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      this.buttonLoading = false
      return
    }
    this.response = res

    this.buttonLoading = false

    this.clear()
    this.frmMeta.status = 'submitted'
  },
  clear() {
    this.frm = frmDefaults()
    this.frmMeta = frmMetaDefaults()

    this.$refs.observer.reset()
  },
}

export default { name, components, props, data, methods }
</script>
