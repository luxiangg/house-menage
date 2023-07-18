import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { UserLogin, UserManage } from "@/router/modules/user"
import { Home } from "@/router/modules/home"
import { NotFoundRedirect } from "@/router/modules/NotFoundRedirect"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home/houses",
  },
  {
    path: "/livedetail",
    name: "LiveDetail",
    component: () => import(/* webpackChunkName: "UserManage" */ "@/views/liveDetail/index.vue"),
  },
  {
    path: "/404",
    name: "NotFoundRedirect",
    component: () => import(/* webpackChunkName: "NotFoundRedirect" */ "@/views/NotFoundRedirect/404.vue"),
  },
  UserLogin,
  UserManage,
  Home,
  NotFoundRedirect,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
