<template>
  <div class="home">
    <!-- <p>{{ projection.displayDto.movie }}</p> -->
    <v-card flat>
      <v-card-text v-if="projection">
        <div three-line>
          <v-row class="mb-6">
            <v-col cols="3">
              <v-img
                :src="projection.displayDto.movie.image"
                :alt="`${projection.displayDto.movie.title} poster`"
                height="400px"
                width="300px"
              />
            </v-col>
            <v-col cols="7">
              <div class="d-flex flex-column" style="height: 100%">
                <h3 class="text-h3 mb-8">
                  {{ projection.displayDto.movie.title }}
                </h3>
                <p>runtime: {{ projection.displayDto.movie.runtime }}</p>
                <p>{{ projection.displayDto.movie.description }}</p>
                <v-spacer></v-spacer>

                <v-chip-group class="mb-4">
                  <v-chip
                    v-for="genre in projection.displayDto.movie.genres"
                    :key="`${projection.displayDto.movie.title}-genre${genre.id}`"
                    style="background-color: #ffa21a"
                  >
                    {{ genre.genre }}
                  </v-chip>
                </v-chip-group>
              </div>
            </v-col>
            <v-col cols="2" class="d-flex flex-column justify-end align-start">
              <div class="">
                <p>
                  <span class="mr-2">
                    <v-icon> mdi-calendar </v-icon>
                  </span>
                  {{ projection.displayDto.dateTime.split('T')[0] }}
                </p>
                <p>
                  <span class="mr-2">
                    <v-icon> mdi-clock </v-icon>
                  </span>
                  {{
                    projection.displayDto.dateTime.split('T')[1].substring(0, 5)
                  }}
                </p>
                <p>
                  <span class="mr-2">
                    <v-icon> mdi-currency-usd </v-icon>
                  </span>
                  {{ projection.displayDto.fee }} RSD
                </p>
              </div>
            </v-col>
          </v-row>
          <v-divider
            :inset="false"
            class="mb-8"
            style="border-color: #ffa21a"
          ></v-divider>
          <div>
            <p>TODO: rezervacija...</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const name = 'CoursePage'
const middleware = ['auth']

const methods = {}

const data = () => {
  return {
    projection: null,
  }
}

export default {
  name,
  middleware,
  data,
  async fetch() {
    this.projection = await this.$axios.$get(
      `api/movies/projection/${this.$route.params.id}`
    )
  },
  methods,
}
</script>