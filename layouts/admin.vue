<template>
  <v-app color="red lighten-4">
    <app-header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <!-- <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

                <NuxtLink
                  v-for="item in adminMenuItems"
                  :key="item.title"
                  :to="item.link"
                  text
                  class="navigation-link"
                >
                  <v-list-item link>
                    <v-list-item-content :to="item.link">
                      <v-list-item-title>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </NuxtLink>

              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pa-2">
              <Nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-container class="my-5" style="max-width: 1200px">
        <Nuxt />
      </v-container> -->
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <v-bottom-navigation v-model="value" :background-color="color"> -->
    <!-- hide-on-scroll -->
    <v-bottom-navigation
      :background-color="color"
      dark
      shift
      fixed
      class="d-md-none"
    >
      <v-btn exact to="/" @click="color = 'blue-grey'">
        <span>Home</span>
        <v-icon class="mx-auto">mdi-home</v-icon>
      </v-btn>

      <template v-for="item in menuItems">
        <v-btn
          v-if="
            item.auth == false ||
            (item.auth == true &&
              $auth.loggedIn &&
              $auth.user.role == item.role)
          "
          :key="item.title"
          :to="item.link"
          text
          >{{ item.title }}
        </v-btn>
      </template>
      <template v-if="$auth.loggedIn">
        <v-btn text @click="logout">Logout</v-btn>
      </template>
      <template v-else>
        <v-btn to="/login" text>Login</v-btn>
        <v-btn to="/register" text>Register</v-btn>
      </template>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
const name = 'NuxtDefaultLayout'
const data = () => ({
  color: 'blue-grey',
  menuItems: [
    {
      auth: true,
      role: 'STUDENT',
      title: 'Courses',
      icon: 'school',
      link: '/courses',
    },
    {
      auth: true,
      role: 'ADMIN',
      title: 'Courses',
      icon: 'school',
      link: '/courses',
    },
    {
      auth: true,
      role: 'STUDENT',
      title: 'My Courses',
      icon: 'school',
      link: '/mycourses',
    },
    {
      auth: true,
      role: 'PROFESOR',
      title: 'My Courses',
      icon: 'school',
      link: '/mycourses',
    },
    {
      auth: true,
      role: 'STUDENT',
      title: 'Profile',
      icon: 'school',
      link: '/profile',
    },
    {
      auth: true,
      role: 'PROFESOR',
      title: 'Profile',
      icon: 'school',
      link: '/profile',
    },
    {
      auth: true,
      role: 'ADMIN',
      title: 'Administration',
      icon: 'school',
      link: '/admin',
    },
  ],

  adminMenuItems: [
    {
      title: 'Projections',
      icon: 'school',
      link: '/admin/projections',
    },
    {
      title: 'Movies',
      icon: 'school',
      link: '/admin/movies',
    },
    {
      title: 'Halls',
      icon: 'school',
      link: '/admin/halls',
    },
    {
      title: 'Users',
      icon: 'school',
      link: '/admin/users',
    },
  ],
})

const methods = {
  logout() {
    this.$auth.logout()

    this.$router.push('/')
  },
}

export default { name, data, methods }
</script>

<style scoped>
.navigation-link {
  text-decoration: none;
  text-transform: uppercase;
}

.nuxt-link-active .v-list-item {
  cursor: default;
  background: #ff9800;
}
</style>