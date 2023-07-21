import { request } from "@/utils/request"
import { API_BROKER_CONFIG } from "@/config/broker"
import { BroKerManageType } from "@/interface/model/BroKer"
import { AxiosError } from "axios"
interface BroKerSeriviceInterface {
  getBroKerData: () => Promise<any>
  setBroKerData: (obj: BroKerManageType.BroKerrmationInterface) => Promise<any>
  delBroKerData: (params: { id: string }) => Promise<any>
  addBroKerData: (obj: BroKerManageType.BroKerrmationInterface) => Promise<any>
  searchBroKerrmation: (params: { name: string }) => Promise<any>
  searchCheckBroKerrmation: (params: { state: string }) => Promise<any>
}
export const useBroKerSerivice = (): BroKerSeriviceInterface => {
  class BroKerSerivice {
    public getBroKerData() {
      const url = API_BROKER_CONFIG.getBorkerrmation()
      return request
        .get(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public setBroKerData(obj: BroKerManageType.BroKerrmationInterface) {
      const url = API_BROKER_CONFIG.setBroKerrmation()
      return request
        .post(url, obj)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public delBroKerData(params: { id: string }) {
      const url = API_BROKER_CONFIG.delBroKerrmation()
      return request
        .delete(url, {
          params,
        })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public addBroKerData(obj: BroKerManageType.BroKerrmationInterface) {
      const url = API_BROKER_CONFIG.addBroKerrmation()
      return request
        .post(url, obj)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public searchBroKerrmation(params: { name: string }) {
      const url = API_BROKER_CONFIG.searchBroKerrmation()
      return request
        .get(url, { params })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
    public searchCheckBroKerrmation(params: { state: string }) {
      const url = API_BROKER_CONFIG.searchCheckBroKerrmation()
      return request
        .get(url, { params })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((error: AxiosError) => {
          return Promise.reject(error)
        })
    }
  }
  return new BroKerSerivice()
}
