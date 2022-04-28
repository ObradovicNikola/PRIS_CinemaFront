<template>
  <div>
    <h1>Users</h1>
  </div>
</template>

<script>
const name = 'Users'
const layout = 'admin'

const middleware = ['auth-and-admin']
export default {
  name,
  layout,
  middleware,
}
</script>
