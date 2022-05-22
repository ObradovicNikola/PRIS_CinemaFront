<template>
  <div class="admin-projections">
    <h1>Projections</h1>
    <new-projection :halls="halls" :movies="movies"></new-projection>

    <v-data-table
      :headers="[
        { text: 'id', value: 'id' },
        { text: 'Naziv', value: 'movie.title' },
        { text: 'Hall', value: 'hallName' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Fee', value: 'fee' },
        { text: 'control', value: 'control' },
      ]"
      :items="projections"
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
          @click="deleteProjections(item.id)"
        >
          <v-icon small class="mr-2"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-container class="mt-6">
      <v-row>
        <v-col
          v-for="projection in projections"
          :key="`projection-${projection.id}`"
          cols="3"
        >
          <v-card
            height="300"
            color="info"
            class="projection-background"
            :style="`background-image: url(${projection.movie.image});`"
          >
            <v-overlay
              :absolute="true"
              :value="true"
              :opacity="0.5"
              :z-index="1"
              style="
                justify-content: unset !important;
                align-items: unset !important;
              "
            >
              <v-card-title>
                <span class="headline">
                  {{ projection.movie.title }}
                </span>
              </v-card-title>
              <v-card-text class="px-4">
                <div class="d-flex flex-column align-start">
                  <v-chip
                    color="grey"
                    text-color="black"
                    class="mb-2 font-weight-bold"
                  >
                    {{ projection.hallName }}
                  </v-chip>
                  <v-chip
                    color="grey"
                    text-color="black"
                    class="mb-2 font-weight-bold"
                  >
                    {{ projection.date }}
                  </v-chip>
                  <v-chip
                    color="grey"
                    text-color="black"
                    class="mb-2 font-weight-bold"
                  >
                    {{ projection.time }}
                  </v-chip>
                  <v-chip
                    color="info"
                    text-color="black"
                    class="font-weight-bold"
                  >
                    Fee: {{ projection.fee }}
                  </v-chip>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="error"
                  dark
                  @click="deleteProjections(projection.id)"
                >
                  <v-icon small class="mr-2"> mdi-delete </v-icon>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const name = 'AllProjections'
const layout = 'admin'

const middleware = ['auth-and-admin']

const data = () => ({
  halls: [],
  movies: [],
  projections: [],
  tableSearch: '',
})

const methods = {
  async deleteProjections(id) {
    // this.buttonLoading = true

    try {
      await this.$axios.$post(`api/movies/projections/delete/${id}`)
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
    this.movies = await this.$axios.$get('api/movies')
    this.projections = await this.$axios.$get('api/movies/projections/all')
    this.projections.forEach((element) => {
      element.date = element.dateTime.split('T')[0]
      element.time = element.dateTime.split('T')[1]
    })
  },
  methods,
}
</script>

<style>
.admin-projections .v-overlay__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>