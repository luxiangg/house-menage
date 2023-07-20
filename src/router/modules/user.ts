export const UserLogin = {
  path: "/user/login",
  name: "UserLogin",
  component: () => import(/* webpackChunkName: "UserLogin" */ "@/views/user/UserLogin.vue"),
}
export const UserRegistry = {
  path: "/user/registry",
  name: "UserRegistry",
  component: () => import(/* webpackChunkName: "UserRegistry" */ "@/views/user/UserRegistry.vue"),
}
