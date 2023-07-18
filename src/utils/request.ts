import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
const request: AxiosInstance = axios.create({
  timeout: 3000,
})
request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token")
    }
    return config
  },
  function (error: AxiosError) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  function (response: AxiosResponse) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error: AxiosError) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request
