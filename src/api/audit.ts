import request from "@/utils/request" //requet axios拦截
import { API_AUDIT } from "@/config/api/audit"
import { AuditManageType } from "@/interface/model/audit"

interface AuditServiceInterface {
  audit(): Promise<any>
}
export const useAuditService = (): AuditServiceInterface => {
  class auditService {
    audit() {
      const url = API_AUDIT.audit()
      console.log(url)
      return request
        .get(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
  }
  return new auditService()
}
