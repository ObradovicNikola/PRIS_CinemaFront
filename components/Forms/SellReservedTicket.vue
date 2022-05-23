<template>
  <div>
    <v-card style="min-width: 350px">
      <v-card-title class="pb-2">
        <span class="text-h5">Sell reserved tickets</span>
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
              {{ frmMeta.errorMessage }}
            </v-alert>

            <ValidationProvider
              v-slot="{ errors }"
              name="username"
              rules="required|email"
            >
              <v-text-field
                v-model="frm.username"
                outlined
                required
                :error-messages="errors"
                name="input-7-4"
                label="Username (email)"
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
              Check reservations
            </v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>

    <v-card
      v-if="isPriceChecked === true"
      class="my-4"
      style="margin: auto; max-width: 400px"
    >
      <v-card-title class="pb-2">
        <span class="text-h5">Reserved tickets</span>
      </v-card-title>
      <template v-if="totalPrice != 0">
        <v-card-text>
          <p>Total price: {{ parseFloat(totalPrice).toFixed(2) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-3"
            type="submit"
            color="orange darken-1"
            :loading="sellButtonLoading"
            @click="sellTickets"
          >
            Sell reserved tickets
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-text>
          <p>No reserved tickets</p>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// const FormData = require('form-data')

const name = 'SellReservedTicket'
const components = { ValidationObserver, ValidationProvider }
const props = {
  idProjection: {
    type: Number,
    required: true,
  },
}

const frmDefaults = () => {
  return {
    username: '',
    projectionId: -1,
  }
}

const frmMetaDefaults = () => ({
  error: null,
  status: null,
  errorMessage: null,
})

// data
const data = () => ({
  enabled: false,
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
  buttonLoading: false,
  sellButtonLoading: false,
  totalPrice: 0,
  isPriceChecked: false,
})

const methods = {
  async submit() {
    this.buttonLoading = true

    let res
    try {
      this.frm.projectionId = this.idProjection
      res = await this.$axios.$post(`api/tickets/price`, this.frm)
      this.frmMeta.errorMessage = 'Please confirm...'
      this.totalPrice = res
      this.isPriceChecked = true
      // await this.$nuxt.refresh()
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      this.frmMeta.errorMessage = 'Unable to load total price for this email'
      this.buttonLoading = false
      return
    }
    this.response = res

    this.buttonLoading = false

    // this.clear()
    this.frmMeta.status = 'submitted'
  },
  async sellTickets() {
    this.sellButtonLoading = true

    let res
    try {
      this.frm.projectionId = this.idProjection
      res = await this.$axios.$post(`api/tickets/pay`, this.frm)
      this.frmMeta.errorMessage = 'Tickets sold!'
      // await this.$nuxt.refresh()
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      this.frmMeta.errorMessage = 'Error selling tickets...'
      this.sellButtonLoading = false
      return
    }
    this.response = res

    this.sellButtonLoading = false

    this.clear()
    this.frmMeta.status = 'submitted'
    this.frmMeta.errorMessage = 'Tickets sold!'
  },
  clear() {
    this.frm = frmDefaults()
    this.frmMeta = frmMetaDefaults()
    this.isPriceChecked = false
    this.totalPrice = 0

    this.$refs.observer.reset()
  },
}

export default { name, components, props, data, methods }
</script>
