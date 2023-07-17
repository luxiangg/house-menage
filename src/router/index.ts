import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { UserLogin, UserManage } from "@/router/modules/user"
import { StaffManage } from "@/router/modules/staff"
import { Houses } from "@/router/modules/houses"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/user/login",
  },
  UserLogin,
  UserManage,
  StaffManage,
  Houses,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
