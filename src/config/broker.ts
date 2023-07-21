
import { resolveUrl } from "@/utils"
export const API_BROKER_CONFIG ={
    getBorkerrmation: () => resolveUrl("/broker"),
    setBroKerrmation: () => resolveUrl("/set/BrokerStatus"),
    delBroKerrmation: () => resolveUrl("/del/broker"),
    addBroKerrmation: () => resolveUrl("/Broker/Add"),
    searchBroKerrmation: () => resolveUrl("/Broker/search"),
    searchCheckBroKerrmation: () => resolveUrl("/Broker/searchCheck"),
}
