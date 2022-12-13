const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/js-part/'
    : '/',
  transpileDependencies: true,
  chainWebpack(config) {
    config.resolve.alias.delete("@")
    config.resolve
      .plugin("tsconfig-paths")
      .use(require("tsconfig-paths-webpack-plugin"))
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/vars.sass"`
      },
      scss: {
        additionalData: `@import "@/assets/styles/vars.sass";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'icons': path.resolve(__dirname, 'src/assets/svg'),
        'interfaces': path.resolve(__dirname, 'src/interfaces'),
        'mocks': path.resolve(__dirname, 'src/mocks'),
      },
      extensions: ['*', '.tsx', '.ts', '.js', '.vue', '.json']
    },
  },
})

