import { resolveUrl } from "@/utils/common"

export const API_USER = {
  login: () => resolveUrl("/login"),
  regisrty: () => resolveUrl("/registry"),
}
