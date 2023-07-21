import { BASE_URL } from "@/config/info"
export const resolveUrl = (url: string): string => {
  return BASE_URL + url
}
