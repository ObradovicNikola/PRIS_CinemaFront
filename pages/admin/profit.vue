<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="text-h5">Profit checker</span>
      </v-card-title>
      <ValidationObserver v-slot="{ invalid }" ref="observer">
        <!-- style="max-width: 800px; margin: auto" -->
        <!-- style="max-width: 400px; margin: auto" -->
        <form class="mx-10" @submit.prevent="submit">
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
              Look at all that money!
            </v-alert>
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker
                  v-model="dates"
                  range
                  first-day-of-week="1"
                ></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  class="mt-5"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>

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
              </v-col>
            </v-row>
          </v-card-text>
        </form>
      </ValidationObserver>
    </v-card>

    <p
      v-if="totalProfit != null"
      class="my-8 text-h5"
      style="text-align: center"
    >
      Total profit: {{ totalProfit }}
    </p>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// const FormData = require('form-data')

const name = 'ProfitAdmin'
const layout = 'admin'
const components = { ValidationObserver, ValidationProvider }

const frmDefaults = () => {
  return {
    startDateString: '',
    endDateString: '',
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
  dates: [
    new Date('2022-05-23').toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10),
  ],
  totalProfit: 0,
})

const computed = {
  dateRangeText() {
    return this.dates.join(' ~ ')
  },
}

const methods = {
  async submit() {
    this.buttonLoading = true

    this.frm.startDateString = this.dates[0]
    this.frm.endDateString = this.dates[1]

    let res
    try {
      res = await this.$axios.$post(`api/tickets/profit`, this.frm)
      this.totalProfit = res
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      this.buttonLoading = false
      return
    }
    this.response = res

    this.buttonLoading = false

    // this.clear()
    this.frmMeta.status = 'submitted'
  },
  clear() {
    this.frm = frmDefaults()
    this.frmMeta = frmMetaDefaults()

    this.dates = [
      new Date('2022-05-23').toISOString().slice(0, 10),
      new Date().toISOString().slice(0, 10),
    ]

    this.totalProfit = 0

    this.$refs.observer.reset()
  },
}

export default {
  name,
  components,
  layout,
  data,
  computed,
  methods,
}
</script>
