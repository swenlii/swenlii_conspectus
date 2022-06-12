export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'conspectus',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Лучший сайт для обучения веб-разработке и программированию.' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: 'Conspectus - блог о веб-разработке'},
      { hid: 'og:locale', name: 'og:locale', content: 'ru_RU'},
      { hid: 'og:description', name: 'og:description', content: 'Блог о программировании "Conspectus". Сборник конспектов одного разработчика.'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },

  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/api", handler: "~/api/api-server.js" }
  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'article-template',
          path: '/article-template',
          component: resolve(__dirname, 'pages/article/_id.vue'),
        },
        {
          name: 'guide-template',
          path: '/guide-template',
          component: resolve(__dirname, 'pages/guide/_id.vue'),
        },
        {
          name: 'tags',
          path: '/tags',
          component: resolve(__dirname, 'pages/articles.vue'),
        },
        {
          name: 'search',
          path: '/search',
          component: resolve(__dirname, 'pages/articles.vue'),
        },
      )
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/mobile.scss',
    '~assets/styles/l_style.scss',
    '~assets/styles/variables.scss',
    '~assets/styles/d_style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api-context.client.js",
    "~/plugins/api-context.server.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vue-social-sharing/nuxt',
    '@nuxtjs/pwa'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },

  pwa: {
    meta: {
      title: 'Conspectus',
      author: 'Swenlii',
    },
    manifest: {
      name: 'Conspectus by swenlii',
      short_name: 'Conspectus',
      lang: 'ru',
      start_url: "/articles",
      background_color: "#dedede",
      display: "minimal-ui",
      theme_color: "#1f1f1f",
      description: "Блог о программировании \"Conspectus\". Сборник конспектов одного разработчика."
    },
  }
}
