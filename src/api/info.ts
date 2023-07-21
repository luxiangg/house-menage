import { request } from "@/utils/request"
import { API_INFO_CONFIG } from "@/config/info"
import { InfoManageType } from "@/interface/model/info"
import { AxiosError } from "axios"
interface InfoSeriviceInterface {
  [x: string]: any
  getInfoData: () => Promise<any>
  setInfoData: (obj: InfoManageType.InformationInterface) => Promise<any>
  delInfoData: (params: { id: string }) => Promise<any>
  searchCheckInfoData: (params: { status: number }) => Promise<any>
  searchInfoData: (params: { name: string }) => Promise<any>
}
export const useInfoSerivice = (): InfoSeriviceInterface => {
  class InfoSerivice {
    // 默认获取
    public getInfoData() {
      const url = API_INFO_CONFIG.getInformation()
      return request
        .get(url)
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    // 修改数据（修改状态码，编辑）
    public setInfoData(obj: InfoManageType.InformationInterface) {
      const url = API_INFO_CONFIG.setInformation()

      return request
        .post(url, obj)
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    // 删除数据接口
    public delInfoData(params: { id: string }) {
      const url = API_INFO_CONFIG.delInformation()
      return request
        .delete(url, {
          params,
        })
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    // 新增
    public addInfoData(obj: InfoManageType.InformationInterface) {
      const url = API_INFO_CONFIG.addInformation()
      return request
        .post(url, obj)
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    // 通过姓名查找
    public searchInfoData(params: { name: string }) {
      const url = API_INFO_CONFIG.searchInformation()
      return request
        .get(url, { params })
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    // 通过状态搜索接口
    public searchCheckInfoData(params: { status: number }) {
      const url = API_INFO_CONFIG.searchCheckInformation()
      return request
        .get(url, { params })
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
  }
  return new InfoSerivice()
}
