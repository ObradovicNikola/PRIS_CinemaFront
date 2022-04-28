<template>
  <div>
    <h1>Movies</h1>
  </div>
</template>

<script>
const name = 'Movies'
const layout = 'admin'

const middleware = ['auth-and-admin']
export default {
  name,
  layout,
  middleware,
}
</script>
