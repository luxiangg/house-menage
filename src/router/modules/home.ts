export const Home = {
  path: "/home",
  name: "Home",
  component: () => import(/* webpackChunkName: "Home" */ "@/views/home/index.vue"),
  children: [
    {
      // 房源管理
      path: "/home/houses",
      name: "Houses",
      title: "房源管理",
      component: () => import(/* webpackChunkName: "Houses" */ "@/views/home/children/houses/index.vue"),
    },

    {
      // 直播管理
      path: "/home/linemanage",
      name: "LineManage",
      title: "直播管理",
      component: () => import(/* webpackChunkName: "LineManage" */ "@/views/home/children/liveManage/index.vue"),
    },
    {
      // 团购管理
      path: "/home/groupbuying",
      name: "GroupBuying",
      title: "团购管理",
      component: () => import(/* webpackChunkName: "GroupBuying" */ "@/views/home/children/Groupbuying/index.vue"),
    },
    {
      // 审核管理
      path: "/home/processmanage",
      name: "ProcessManage",
      title: "审核管理",
      component: () => import(/* webpackChunkName: "ProcessManage" */ "@/views/home/children/processManage/index.vue"),
    },
    {
      // 订单管理
      path: "/home/goodsmanage",
      name: "GoodsManage",
      title: "订单管理",
      component: () => import(/* webpackChunkName: "GoodsManage" */ "@/views/home/children/goodsManage/index.vue"),
    },
    {
      // 资讯管理
      path: "/home/info",
      name: "Info",
      title: "资讯管理",
      component: () => import(/* webpackChunkName: "GoodsManage" */ "@/views/home/children/info/index.vue"),
    },
    {
      // 经纪人管理
      path: "/home/brokermanage",
      name: "BrokerManage",
      title: "经纪人管理",
      component: () => import(/* webpackChunkName: "BrokerManage" */ "@/views/home/children/brokerManage/index.vue"),
    },
    {
      // 员工管理
      path: "/home/staff",
      name: "StaffManage",
      title: "员工管理",
      component: () => import(/* webpackChunkName: "StaffManage" */ "@/views/home/children/staff/index.vue"),
    },
    {
      // 用户管理
      path: "/home/user",
      name: "UserManage",
      title: "用户管理",
      component: () => import(/* webpackChunkName: "UserManage" */ "@/views/home/children/user/index.vue"),
    },
  ],
}
