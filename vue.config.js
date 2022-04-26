module.exports = {
  //去掉控制台日志输出
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs =
        ['console.log']
    }
  },
  runtimeCompiler: true,
  // 公共路径
  publicPath: './',
  // 打包路径
  outputDir: 'dist',
  // 静态资源路径
  assetsDir: 'assets',
  lintOnSave: false,
  // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）
  productionSourceMap: true,
  devServer: {
    port: 4277
    //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
    // proxy: {
    //     '/api': {
    //         target: 'http://192.168.200.3:3000',//代理地址，这里设置的地址会代替axios中设置的baseURL
    //         //changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
    //         //ws: true, // proxy websockets
    //         //pathRewrite方法重写url
    //         pathRewrite: {
    //             '^/api': '/api'
    //             //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
    //             //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    //         }
    //     },
    //     '/oauth': {
    //         target: 'http://192.168.200.3:3000',//代理地址，这里设置的地址会代替axios中设置的baseURL
    //         //changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
    //         //ws: true, // proxy websockets
    //         //pathRewrite方法重写url
    //         pathRewrite: {
    //             '^/oauth': '/oauth'
    //             //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
    //             //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    //         }
    //     },
    // }
  }
}
