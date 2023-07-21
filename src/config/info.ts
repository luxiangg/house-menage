export const BASE_URL = process.env.VUE_APP_API_URL

import { resolveUrl } from "@/utils"
export const API_INFO_CONFIG = {
  getInformation: () => resolveUrl("/information"),
  setInformation: () => resolveUrl("/set/information"),
  delInformation: () => resolveUrl("/del/information"),
  addInformation: () => resolveUrl("/add/information"),
  searchInformation: () => resolveUrl("/search/information"),
  searchCheckInformation: () => resolveUrl("/searchCheck/information"),
}
