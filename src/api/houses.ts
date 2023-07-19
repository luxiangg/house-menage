/*
 * @Author: ch.zhoumengqi
 * @Date: 2023-07-18 15:39:54
 * @Last Modified by: ch.zhoumengqi
 * @Last Modified time: 2023-07-19 19:39:56
 */
import request from "@/utils/request"
import { HousesManageType } from "@/interface/model/houses"
import { API_HOUSES } from "@/config/api/houses"

interface HousesServiceInterface {
  housing(): Promise<any>
  delete(params: { id: string }): Promise<any>
}

export const HousesService = (): HousesServiceInterface => {
  class housesService {
    housing() {
      const url = API_HOUSES.housing()
      console.log(url)

      return request
        .get(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
    delete(params: { id: string }) {
      const url = API_HOUSES.del()
      return request
        .delete(url, { params })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
  }
  return new housesService()
}
