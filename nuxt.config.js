import colors from 'vuetify/es5/util/colors'

const {
  NODE_ENV,
  HTTP_HOST, // http server host and port
  HTTP_PORT,
  SPRING_HOST,
  SPRING_PORT,
} = process.env

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-vuetify',
    title: 'nuxt-vuetify',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      // recommended for responsive design
      // <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  server: {
    host: HTTP_HOST || '127.0.0.1',
    port: HTTP_PORT || 3000,
  },

  env: {
    NODE_ENV: NODE_ENV || 'development',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vee-validate.js', ssr: true }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [
    // Equivalent to { path: '~/components' }
    '~/components',
    '~/components/Modals',
    '~/components/Forms',
    '~/components/Admin',
    '~/components/Admin/Modals',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // TODO: add default api url
  axios: {
    // baseURL: 'http://127.0.0.1:8080',
    // baseURL: 'http://192.168.1.10:8080',
    baseURL: SPRING_HOST + ':' + SPRING_PORT || 'http://127.0.0.1:8080',

    // 192.168.1.10
  },

  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'token',
          // global: true,
          // required: true,
          type: 'Bearer',
        },
        user: {
          // false to directly use API response
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'api/users/login', method: 'post' },
          user: { url: 'api/users/me', method: 'get' },
          logout: false,
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/custom-bulma.sass'],
    // to do: add svg icons to vuetify in nuxt
    // icons: {
    //   iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    // },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
