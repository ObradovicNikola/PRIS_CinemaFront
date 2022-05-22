<template>
  <div class="admin-projections">
    <h1>Projections of top rated movies</h1>
    <v-container class="mt-6" style="max-width: 1024px">
      <v-row>
        <v-col
          v-for="projection in projections"
          :key="`projection-${projection.id}`"
          cols="3"
        >
          <NuxtLink :to="`/projections/${projection.id}`">
            <v-card
              height="300"
              color="info"
              class="projection-background"
              :style="`background-image: url(${projection.displayDto.movie.image});`"
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
                    {{ projection.displayDto.movie.title }}
                  </span>
                </v-card-title>
                <v-card-text class="px-4">
                  <div class="d-flex flex-column align-start">
                    <v-chip
                      color="grey"
                      text-color="black"
                      class="mb-2 font-weight-bold"
                    >
                      {{ projection.displayDto.hallName }}
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
              </v-overlay>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const name = 'TopRatedMoviesProjections'

const data = () => ({
  projections: [],
})

export default {
  name,
  data,
  async fetch() {
    this.projections = await this.$axios.$get(
      'api/movies/projections/bestrated'
    )
    this.projections.forEach((element) => {
      element.date = element.dateTime.split('T')[0]
      element.time = element.dateTime.split('T')[1]
    })
  },
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