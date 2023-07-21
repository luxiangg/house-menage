/*
 * @Author: ch.zhoumengqi
 * @Date: 2023-07-18 11:35:09
 * @Last Modified by: ch.zhoumengqi
 * @Last Modified time: 2023-07-20 20:35:10
 */
import { resolveUrl } from "@/utils/common"

export const API_HOUSES = {
  housing: () => resolveUrl("/housing"),
  del: () => resolveUrl("/deleteMarkethouses"),
  add: () => resolveUrl("/housing/add"),
}
