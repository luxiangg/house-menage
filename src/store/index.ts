import { createStore } from "vuex"
import { BasicTypeInterface } from "@/interface/common"
import { CommitInterface } from "@/interface/store"

const createMoudel = (): BasicTypeInterface.Data<CommitInterface<string>> => {
  const context = require.context("./model", true, /\.ts|js$/)
  const modules: BasicTypeInterface.Data<CommitInterface<string>> = {}
  context.keys().forEach((key) => {
    const moduleContext = context(key).default
    modules[moduleContext.name] = moduleContext
  })

  return modules
}
const store = createStore({
  modules: createMoudel(),
})
export default store
