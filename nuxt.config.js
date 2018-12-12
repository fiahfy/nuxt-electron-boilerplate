const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: { title: pkg.productName },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Extend only webpack config for client-bundle
      if (ctx.isClient) {
        config.target = 'electron-renderer'
      }
      // Set relative path
      config.output.publicPath = './_nuxt/'
    }
  },

  /*
   ** Router configuration
   */
  router: {
    mode: 'hash'
  },

  /*
   ** Source directory
   */
  srcDir: 'src',

  /*
   ** Generate configuration
   */
  generate: {
    dir: 'app'
  },

  /*
   ** Vue configuration
   */
  vue: {
    config: {
      productionTip: false
    }
  }
}
