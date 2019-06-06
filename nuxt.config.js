const pkg = require('./package')

module.exports = {
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Extend only webpack config for client-bundle
      if (ctx.isClient) {
        config.target = 'electron-renderer'
      }
      // Set relative path
      config.output.publicPath = './_nuxt/'
    }
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/app.css'],

  /*
   ** Generate configuration
   */
  generate: {
    dir: 'app'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.productName,
    meta: [{ hid: 'charset', charset: 'utf-8' }]
  },

  /*
   ** SPA or Universal
   */
  mode: 'spa',

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

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
   ** Vue configuration
   */
  vue: {
    config: {
      productionTip: false
    }
  }
}
