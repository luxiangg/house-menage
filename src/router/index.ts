import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { UserLogin, UserRegistry } from "@/router/modules/user"
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
  UserRegistry,
  Home,
  NotFoundRedirect,
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.name !== "UserLogin") {
    if (localStorage.getItem("token")) {
      next()
    } else {
      window.alert("登录状态过期，请重新登陆")
      next({ name: "UserLogin" })
    }
  } else {
    next()
  }
})

export default router
