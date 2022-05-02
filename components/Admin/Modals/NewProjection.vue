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
          >New Projection</v-btn
        >
      </template>
      <v-card style="width: 550px">
        <v-card-title>
          <span class="text-h5">New Projection</span>
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
                You have successfully added a new projection.
              </v-alert>

              <v-select
                v-model="frm.movieId"
                outlined
                label="Movie"
                :items="movies"
                class="mt-3"
                required
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.title }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.title }}
                </template>
              </v-select>

              <v-menu
                ref="menu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateDisplay"
                    label="Datum"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateValue"
                  no-title
                  scrollable
                  first-day-of-week="1"
                  :min="minDateValue"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="datePickerMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(dateValue)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-container class="my-4 d-flex">
                <v-time-picker
                  v-model="time"
                  class="flex-grow-1"
                  :allowed-minutes="[
                    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
                  ]"
                  format="24hr"
                  min="6:00"
                  max="23:00"
                ></v-time-picker>
              </v-container>

              <ValidationProvider
                v-slot="{ errors }"
                name="Fee"
                :rules="{
                  required: true,
                  regex: floatingPointRegex,
                }"
              >
                <v-text-field
                  v-model="frm.fee"
                  :error-messages="errors"
                  label="Fee (number, max 2 decimals)"
                  required
                ></v-text-field>
              </ValidationProvider>

              <v-select
                v-model="frm.hallId"
                outlined
                label="Hall"
                :items="halls"
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
const props = {
  movies: {
    type: Array,
    required: true,
  },
  halls: {
    type: Array,
    required: true,
  },
}

const frmDefaults = () => {
  return {
    dateTimeString: '',
    fee: '500.00',
    hallId: null,
    movieId: null,
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
  floatingPointRegex: /^\d+(\.\d{1,2})?$/,
  dateValue: new Date().toISOString().slice(0, 10),
  minDateValue: new Date().toISOString().slice(0, 10),
  datePickerMenu: false,
  time: '07:00',
})

const computed = {
  dateDisplay() {
    console.log(this.movies)
    return this.dateValue
  },
}

const methods = {
  async submit() {
    this.buttonLoading = true

    this.frm.dateTimeString = `${this.dateValue}T${this.time}`

    this.frm.movieId = this.frm.movieId.id
    this.frm.hallId = this.frm.hallId.id

    let res
    try {
      res = await this.$axios.$post(`api/movies/projection`, this.frm)
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

const created = function () {
  this.frm.movieId = this.movies[0]
  this.frm.hallId = this.halls[0]
}

const mounted = function () {
  this.frm.movieId = this.movies[0]
  this.frm.hallId = this.halls[0]
}

export default {
  name,
  components,
  props,
  data,
  computed,
  created,
  mounted,
  methods,
}
</script>
