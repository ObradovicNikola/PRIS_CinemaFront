<template>
  <div>
    <h1>Halls</h1>

    <new-hall></new-hall>

    <div class="container">
      <v-data-table
        :headers="[
          { text: 'id', value: 'id' },
          { text: 'Naziv', value: 'name' },
          { text: 'Seats Ground Floor', value: 'seatsGroundFloor' },
          { text: 'Seats Gallery Left', value: 'seatsGalleryLeft' },
          {
            text: 'Seats Gallery Right',
            value: 'seatsGalleryRight',
          },
          { text: 'control', value: 'control' },
        ]"
        :items="halls"
        :items-per-page="5"
        class="elevation-1"
        :search="tableSearch"
      >
        <template #top>
          <v-text-field
            v-model="tableSearch"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
        <template #[`item.control`]="{ item }">
          <v-btn
            color="error"
            style="width: 100px"
            :loading="item.buttonLoading"
            @click="deleteHall(item.id)"
          >
            <v-icon small class="mr-2"> mdi-delete </v-icon>
            Delete
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
const name = 'Halls'
const layout = 'admin'

const middleware = ['auth-and-admin']

const data = () => ({
  halls: [],
  tableSearch: '',
  buttonLoading: false,
})

const methods = {
  async deleteHall(id) {
    // this.buttonLoading = true

    try {
      await this.$axios.$post(`api/halls/delete/${id}`)
      this.$nuxt.refresh()
    } catch (err) {
      // this.buttonLoading = false
    }
    // this.buttonLoading = false
  },
}

export default {
  name,
  layout,
  middleware,
  data,
  async fetch() {
    this.halls = await this.$axios.$get('api/halls/display')
  },
  methods,
}
</script>
