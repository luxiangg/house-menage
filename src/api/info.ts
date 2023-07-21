import request from "@/utils/request"
import { API_INFO_CONFIG } from "@/config/common"
import { InfoManageType } from "@/interface/model/info"
import { AxiosError } from "axios"
interface InfoSeriviceInterface {
  getInfoData: () => Promise<any>
  setInfoData: (params: { id: string }) => Promise<any>
  delInfoData: (params: { id: string }) => Promise<any>
}
export const useInfoSerivice = (): InfoSeriviceInterface => {
  class InfoSerivice {
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
    public setInfoData(params: { id: string }) {
      const url = API_INFO_CONFIG.setInformation()
      return request
        .post(url, params)
        .then(({ data }: any) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public delInfoData(params: { id: string }) {
      const url = API_INFO_CONFIG.delInformation()
      return request
        .delete(url, {
          data: params,
        })
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
