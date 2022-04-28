<template>
  <div>
    <v-dialog v-model="enabled" max-width="500">
      <template #activator="{ on, attrs }">
        <v-btn
          color="orange"
          elevation="2"
          outlined
          rounded
          v-bind="attrs"
          v-on="on"
          >New Movie</v-btn
        >
      </template>
      <v-card style="min-width: 350px">
        <v-card-title>
          <span class="text-h5">New Movie</span>
        </v-card-title>
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
                You have successfully added a new movie.
              </v-alert>

              <ValidationProvider
                v-slot="{ errors }"
                name="Title"
                rules="required|max:80|min:2"
              >
                <v-text-field
                  v-model="frm.title"
                  :error-messages="errors"
                  label="Title"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="seatsGroundFloor"
                rules="required|numeric_message"
              >
                <v-text-field
                  v-model="frm.seatsGroundFloor"
                  type="text"
                  :counter="20"
                  :error-messages="errors"
                  label="Seats Ground Floor"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="seatsGalleryLeft"
                rules="required|numeric_message"
              >
                <v-text-field
                  v-model="frm.seatsGalleryLeft"
                  type="text"
                  :counter="20"
                  :error-messages="errors"
                  label="Seats Gallery Left"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="seatsGalleryRight"
                rules="required|numeric_message"
              >
                <v-text-field
                  v-model="frm.seatsGalleryRight"
                  type="text"
                  :counter="20"
                  :error-messages="errors"
                  label="Seats Gallery Right"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-1" text @click="enabled = false">
                Close
              </v-btn>
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
    </v-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// const FormData = require('form-data')

const name = 'NewHallModal'
const components = { ValidationObserver, ValidationProvider }
// const props = {
//   idCourse: {
//     type: Number,
//     required: true,
//   },
// }

const frmDefaults = () => {
  return {
    title: 'Predator',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/95/Predator_Movie.jpg',
    description:
      'Dutch and his team are out on a mission to rescue a group of hostages in Central America. There, they discover that they are being targeted by an extraterrestrial warrior.',
    runtime: 107,
    genres: 'ACTION, THRILLER',
  }
}

const frmMetaDefaults = () => ({
  error: null,
  status: null,
})

// data
const data = () => ({
  enabled: false,
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
  buttonLoading: false,
})

const methods = {
  async submit() {
    // await console.log(this.frm.datumAktivnostiunixTimestamp)
    this.buttonLoading = true

    let res
    try {
      res = await this.$axios.$post(`api/halls`, this.frm)
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

export default { name, components, data, methods }
</script>
