<template>
  <div class="home">
    <h1>Repertoire - this week</h1>

    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="entry in repertoire" :key="entry.date">
          {{ entry.date }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="entry in repertoire"
          :key="`item=${entry.date}`"
          class="pa-4"
        >
          <v-card flat>
            <v-card-text>
              <div v-if="entry.movies.length > 0" three-line>
                <div v-for="movie in entry.movies" :key="movie.id">
                  <v-row class="mb-6">
                    <v-col cols="3">
                      <v-img
                        :src="movie.imgUrl"
                        :alt="`${movie.title} poster`"
                        height="400px"
                        width="300px"
                      />
                    </v-col>
                    <v-col cols="7">
                      <div class="d-flex flex-column" style="height: 100%">
                        <h3 class="text-h3 mb-8">{{ movie.title }}</h3>
                        <p>runtime: {{ movie.runtime }}</p>
                        <p>{{ movie.description }}</p>
                        <v-spacer></v-spacer>
                        <v-chip-group class="mb-4">
                          <v-chip
                            v-for="genre in movie.genres"
                            :key="`${movie.title}-genre${genre.id}`"
                            style="background-color: #ffa21a"
                          >
                            {{ genre.genre }}
                          </v-chip>
                        </v-chip-group>
                      </div>
                    </v-col>
                    <v-col cols="2">
                      <p>Projections:</p>
                      <div
                        v-for="projection in movie.projections"
                        :key="`projection-${movie.id}-${projection.id}`"
                        class="mb-2"
                      >
                        <NuxtLink
                          :to="`/projections/${projection.id}`"
                          class="
                            projection-entry
                            d-flex
                            flex-column
                            justify-space-between
                            align-center
                          "
                          style="cursor: pointer"
                        >
                          <p class="text-h5" style="color: #ffa21a">
                            {{
                              projection.dateTime.split('T')[1].substring(0, 5)
                            }}
                          </p>
                          <p>{{ projection.fee }} RSD</p>
                          <p>{{ projection.hallName }}</p>
                        </NuxtLink>
                        <v-divider :inset="false"></v-divider>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider :inset="false" class="mb-8"></v-divider>
                </div>
              </div>
              <div v-else>
                <p>No projections here...</p>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
const name = 'HomePage'

const data = () => ({
  repertoire: [],
  tab: null,
})

export default {
  name,
  data,
  async fetch() {
    this.repertoire = await this.$axios.$get('api/movies/grouped/date')
  },
}
</script>

<style scoped>
.projection-entry {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.projection-entry:hover {
  background: #252626;
}
</style>