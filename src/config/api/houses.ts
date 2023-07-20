/*
 * @Author: ch.zhoumengqi
 * @Date: 2023-07-18 11:35:09
 * @Last Modified by: ch.zhoumengqi
 * @Last Modified time: 2023-07-19 11:52:37
 */
import { resolveUrl } from "@/utils/common"

export const API_HOUSES = {
  housing: () => resolveUrl("/housing"),
  del: () => resolveUrl("/deleteMarkethouses"),
}
