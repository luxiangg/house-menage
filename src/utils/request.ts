
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"

import { message } from 'ant-design-vue'
const request = axios.create({
  timeout: 3000,
})
request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token")
    }
    config.headers["Content-Type"] = "json/application"
    return config
  },
  function (error: AxiosError) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status = error.response?.status
    switch (status) {
      case 401:
        message.error(error.response?.data.msg, 1, () => {
          // signOut()
          const pathUrl = location.href.split("/")
          window.location.href = `/user/login?redirect=${encodeURIComponent("/" + pathUrl[3])}`
        })
        break
      case 406:
        message.error("暂无数据！")
        break
      case 500:
        message.error("服务端报错,请重启再试！")
        break
      default:
        message.error("未知错误，请刷新页面！")
        break
    }
    return Promise.reject(error)
  }
)
export { request }
