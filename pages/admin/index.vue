<template>
  <div>
    <h1>Admin dashboard</h1>
    <p>TBD</p>
    <!-- to projections -->
    <NuxtLink to="/admin/projections">Projections</NuxtLink>
  </div>
</template>

<script>
const name = 'AdminDashboard'
const layout = "admin"

const middleware = ['auth-and-admin']
export default {
  name,
  layout,
  middleware,
}
</script>
