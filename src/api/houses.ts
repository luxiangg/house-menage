import request from "@/utils/request"
//数据的type类型
import { HousesManageType } from "@/interface/model/houses"
//接收数据接口
import { API_HOUSES } from "@/config/api/houses"
// 房源管理接口类型定义以及抛出数据的类型
interface HousesServiceInterface {
  housing(): Promise<any>
  delete(params: { id: string }): Promise<any>
  add(params: HousesManageType.GoodsForm): Promise<any>
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
    add(params: HousesManageType.GoodsForm) {
      console.log(params)
      const url = API_HOUSES.add()
      return request
        .post(url, params)
        .then(({ data }) => {
          console.log(data, "data")

          return Promise.resolve(data)
        })
        .catch((err) => {
          console.log(err, "err")

          console.error(err)
          return Promise.reject(err)
        })
    }
  }
  return new housesService()
}
