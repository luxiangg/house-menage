import request from "@/utils/request"
import { API_USER } from "@/config/api/user"

interface UserServiceInterface {
  login({ username, password }: { username: string; password: string }): Promise<any>
  registry({ username, password, tel }: { username: string; password: string; tel: string }): Promise<any>
}

export const useUserService = (): UserServiceInterface => {
  class UserService {
    login(params: { username: string; password: string }) {
      const url = API_USER.login()
      return request
        .post(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
    registry(params: { username: string; password: string; tel: string }) {
      const url = API_USER.regisrty()
      return request
        .post(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
  }
  return new UserService()
}
