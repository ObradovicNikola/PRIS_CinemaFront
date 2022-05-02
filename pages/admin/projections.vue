<template>
  <div>
    <h1>Projections</h1>
    <new-projection :halls="halls" :movies="movies"></new-projection>
    <v-container>
      <v-row>
        <v-col v-for="n in 23" :key="n" cols="4">
          <v-card height="200" color="info"></v-card>
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
})
export default {
  name,
  layout,
  middleware,
  data,
  async fetch() {
    this.halls = await this.$axios.$get('api/halls/display')
    this.movies = await this.$axios.$get('api/movies')
  },
}
</script>
