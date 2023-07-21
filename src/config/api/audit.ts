/*
 * @Author: ch.zhoumengqi
 * @Date: 2023-07-20 16:50:10
 * @Last Modified by: ch.zhoumengqi
 * @Last Modified time: 2023-07-21 20:38:50
 */
import { resolveUrl } from "@/utils/common"

export const API_AUDIT = {
  audit: () => resolveUrl("/audit"),
  del: () => resolveUrl("/del/audit"),
  change: () => resolveUrl("/set/audit"),
}
