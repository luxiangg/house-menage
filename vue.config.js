const { defineConfig } = require("@vue/cli-service")
const dynamicProxyName = process.env.VUE_APP_API_URL
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 配置host
    host: "localhost",
    // 端口号
    port: 8080,
    // 跨域代理
    proxy: {
      [dynamicProxyName]: {
        target: "http://localhost:7001",
        changeOrigin: true,
        pathRewrite: {
          [`^${dynamicProxyName}`]: "",
        },
      },
    },
  },
})
