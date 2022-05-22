<template>
  <div>
    <v-card style="min-width: 350px">
      <v-card-title class="pb-2">
        <span class="text-h5">New Comment</span>
      </v-card-title>
      <ValidationObserver
        v-slot="{ invalid }"
        ref="observer"
        style="max-width: 800px; margin: auto"
      >
        <form
          class="mt-0"
          style="max-width: 800px; margin: auto"
          @submit.prevent="submit"
        >
          <v-card-text class="pa-0">
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
              You have successfully created a new comment.
            </v-alert>

            <ValidationProvider
              v-slot="{ errors }"
              name="Comment"
              rules="required"
            >
              <v-textarea
                v-model="frm.content"
                outlined
                required
                :error-messages="errors"
                name="input-7-4"
                label="Comment"
              ></v-textarea>
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
  idMovie: {
    type: Number,
    required: true,
  },
}

const frmDefaults = () => {
  return {
    content: '',
    movieId: -1,
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
    this.buttonLoading = true

    let res
    try {
      this.frm.movieId = this.idMovie
      res = await this.$axios.$post(`api/comments/new`, this.frm)
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
