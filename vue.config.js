const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: "8080",
    proxy: {
      "/api": {
        // 代理标识, 如果出现了这个就代表需要代理
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路由, 把想替换掉的路由地址替换为空或者别的
        },
      },
    },
  },
})
