<template>
  <div>
    <v-card style="min-width: 350px">
      <v-card-title class="pb-2">
        <span class="text-h5">Reserve a ticket</span>
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
              You have successfully reserved a new ticket.
            </v-alert>

            <v-select
              v-model="frm.sectionId"
              outlined
              label="Section"
              :items="sections"
              class="mt-3"
              required
            >
              <template slot="selection" slot-scope="data">
                <!-- HTML that describe how select should render selected items -->
                {{ data.item.name }}
              </template>
              <template slot="item" slot-scope="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item.name }}
              </template>
            </v-select>
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
              Reserve
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
    sectionId: 1,
    projectionId: -1,
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
  sections: [
    {
      id: 1,
      name: 'GROUND FLOOR',
    },
    {
      id: 2,
      name: 'GALLERY LEFT',
    },
    {
      id: 3,
      name: 'GALLERY RIGHT',
    },
  ],
})

const methods = {
  async submit() {
    this.buttonLoading = true

    let res
    try {
      this.frm.projectionId = this.idProjection

      this.frm.sectionId = this.frm.sectionId.id
      res = await this.$axios.$post(`api/tickets/simple`, this.frm)
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
