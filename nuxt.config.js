module.exports = {
  head: {
    title: 'loading',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: 'koa2-nuxt-weixin模板' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'static/favicon.ico' }
    ],
    script: []
  },
  css: [
    {
      src: 'static/sass/base.sass',
      lang: 'sass?indentedSyntax=true'
    },
  ],
  plugins: [
  ],
  build: {
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  },
  loading: { color: '#F44336' },
  performance: {
    prefetch: false
  }
}
