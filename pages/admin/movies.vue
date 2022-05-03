<template>
  <div>
    <h1>Movies</h1>
    <new-movie></new-movie>
    <div class="container">
      <!-- <p style="max-width: 500px">{{ movies }}</p> -->
      <div
        v-for="movie in movies"
        :key="`movie-${movie.id}`"
        class="detail mb-2"
      >
        <h3>{{ movie.title }}</h3>
        <div class="row mt-1">
          <div class="col flex-grow-0">
            <!-- image -->
            <v-img
              :src="movie.image"
              :alt="`${movie.title} poster`"
              max-height="300px"
              max-width="180px"
            />
          </div>
          <div class="col">
            <div
              class="d-flex flex-column justify-space-between py-2"
              style="height: 100%"
            >
              <!-- description -->
              <p>{{ movie.description }}</p>

              <!-- genres -->
              <div class="">
                <v-chip-group class="">
                  <v-chip
                    v-for="genre in movie.genres"
                    :key="`${movie.title}-genre${genre.id}`"
                    style="background-color: #ffa21a"
                  >
                    {{ genre.genre }}
                  </v-chip>
                </v-chip-group>
                <v-btn
                  color="error"
                  style="width: 100px"
                  @click="deleteMovie(movie.id)"
                >
                  <v-icon small class="mr-2"> mdi-delete </v-icon>
                  Delete
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const name = 'Movies'
const layout = 'admin'

const middleware = ['auth-and-admin']

const data = () => ({
  movies: [],
})

const methods = {
  async deleteMovie(id) {
    // this.buttonLoading = true

    try {
      await this.$axios.$post(`api/movies/delete/${id}`)
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
    this.movies = await this.$axios.$get('api/movies')
  },
  methods,
}
</script>
