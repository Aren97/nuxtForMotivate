require('dotenv').config()
export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    serverUrl: 'https://arenmotivate.ru/back/'
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: 'Мотивационные фразы и призивы к действию',
    titleTemplate: `%s - ${process.env.SITE_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { property: 'og:site_name', content: process.env.SITE_NAME },
      // The list of types is available here: http://ogp.me/#types
      { property: 'og:type', content: 'website' },
      // Should the the same as your canonical link, see below.
      { property: 'og:url', content: process.env.npm_package_homepage },
      { property: 'og:image', content: '/logoasargsyan.png' },
      // Often the same as your meta description, but not always.
      { property: 'og:description', content: process.env.npm_package_description || '' },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: process.env.npm_package_homepage },
      { name: 'twitter:description', content: process.env.npm_package_description || '' },
      // Your twitter handle, if you have one.
      { name: 'twitter:image:src', content: '/logoasargsyan.png' },

      // Google / Schema.org markup:
      { itemprop: 'description', content: process.env.npm_package_description || '' },
      { itemprop: 'image', content: '/logoasargsyan.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/photo16.ico' },
      { rel: 'apple-touch-icon', sizes: '52x52', href: '/favicon/photo52.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/photo72.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/photo114.png' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  styleResources: {
    scss: [
      '~assets/scss/_main.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/cookie.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-vuex-localstorage'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
