/*
 * @Author: heinan
 * @Date: 2023-06-29 10:37:15
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-03 16:51:38
 */
const { defineConfig } = require('@vue/cli-service')

const dynamicProxyName = process.env.VUE_APP_API_URL

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 配置host
    host: 'localhost',
    // 端口号
    port: 8088,
    // 跨域代理
    proxy: {
      [dynamicProxyName]: {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: {
          [`^${dynamicProxyName}`]: ''
        }
      }
    }
  }
})