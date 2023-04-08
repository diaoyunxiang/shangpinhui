const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {//匹配以api开头的路径
        target: 'http://gmall-h5-api.atguigu.cn', //目标基础路径
      },
    },
  },
})