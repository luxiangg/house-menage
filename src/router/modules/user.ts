export const UserLogin = {
  path: "/user/login",
  name: "UserLogin",
  component: () => import(/* webpackChunkName: "UserLogin" */ "@/views/user/UserLogin.vue"),
}
export const UserManage = {
  path: "/user/userManage",
  name: "UserManage",
  component: () => import(/* webpackChunkName: "UserManage" */ "@/views/user/UserManage.vue"),
}
