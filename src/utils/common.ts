/*
 * @Author: ch.zhoumengqi
 * @Date: 2023-07-18 11:33:05
 * @Last Modified by: ch.zhoumengqi
 * @Last Modified time: 2023-07-18 11:34:43
 */
import { BASE_URL } from "@/config/common"

// 接收一个url地址返回完整的请求接口地址
// BASE_URL可以针对多个开发人员及环境动态判断修改请求接口的前缀
export const resolveUrl = (url: string): string => {
  return BASE_URL + url
}
