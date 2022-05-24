<template>
  <div>
    <v-dialog v-model="enabled">
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
      <v-card style="width: 550px" class="mx-auto">
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
                name="Cover Image"
                :rules="{
                  required: true,
                  regex: validImageUrlRegex,
                }"
              >
                <v-text-field
                  v-model="frm.image"
                  :error-messages="errors"
                  label="Cover Image"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:1000"
              >
                <v-textarea
                  v-model="frm.description"
                  :error-messages="errors"
                  outlined
                  :counter="1000"
                  label="Description"
                ></v-textarea>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="Runtime"
                rules="required|numeric_message"
              >
                <v-text-field
                  v-model="frm.runtime"
                  type="text"
                  :error-messages="errors"
                  label="Runtime (minutes)"
                  required
                ></v-text-field>
              </ValidationProvider>

              <div class="genres">
                <label for="genres" class="v-label v-label--active theme--dark"
                  >Genres</label
                >
                <p>{{ frm.genres }}</p>
                <v-switch
                  v-for="genre in genres"
                  :key="`genre-${genre.id}`"
                  v-model="frm.genres"
                  color="primary"
                  :label="genre.name"
                  :value="genre.name"
                ></v-switch>
              </div>
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
    genres: [],
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
  validImageUrlRegex: /^(http(s?):)([/|.|\w|\s|-])*.*\.(?:jpg|jpeg|gif|png)$/,
  // genres: ['ACTION', 'THRILLER', 'DRAMA', 'COMEDY', 'HORROR'],
  genres: [
    { id: 1, name: 'ACTION' },
    { id: 2, name: 'THRILLER' },
    { id: 3, name: 'DRAMA' },
    { id: 4, name: 'COMEDY' },
    { id: 5, name: 'HORROR' },
  ],
})

const methods = {
  async submit() {
    this.buttonLoading = true
    let genresString = ''
    this.frm.genres.forEach((genre) => {
      genresString += genre
      if (genre !== this.frm.genres[this.frm.genres.length - 1]) {
        genresString += ', '
      }
    })
    this.frm.genres = genresString

    let res
    try {
      res = await this.$axios.$post(`api/movies`, this.frm)
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
