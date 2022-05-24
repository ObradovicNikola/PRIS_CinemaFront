<template>
  <div>
    <h1>Admin dashboard</h1>
    <v-col class="d-flex flex-column">
      <NuxtLink to="/admin/projections">Projections</NuxtLink>
      <NuxtLink to="/admin/halls">Halls</NuxtLink>
      <NuxtLink to="/admin/movies">Movies</NuxtLink>
      <NuxtLink to="/admin/profit">Profit</NuxtLink>
    </v-col>
  </div>
</template>

<script>
const name = 'AdminDashboard'
const layout = 'admin'

const middleware = ['auth-and-admin']
export default {
  name,
  layout,
  middleware,
}
</script>
