<template>
  <div>
    <h1>Halls</h1>

    <new-hall></new-hall>

    <div class="container">
      <span>list halls...</span>
    </div>
  </div>
</template>

<script>
// import NewHall from '../../components/Modals/NewHall.vue'

const name = 'Halls'
const layout = 'admin'

const middleware = ['auth-and-admin']

// const components = {
//   NewHall,
// }
export default {
  name,
  // components,
  layout,
  middleware,
}
</script>
