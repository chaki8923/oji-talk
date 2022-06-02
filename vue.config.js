const { defineConfig } = require('@vue/cli-service')
const globImporter = require('node-sass-glob-importer')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          importer: globImporter()
        }
      }
    }
  },

}