<template>
  <Header></Header>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">管理员</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in routes" :key="item.name">
          <pie-chart-outlined />
          <span
            ><router-link :to="item.path">{{ item.title }}</router-link></span
          >
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"><router-view></router-view></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { PieChartOutlined } from "@ant-design/icons-vue"
import Header from "@/components/layout/Header.vue"
import { ref } from "vue"
import { useRoute } from "vue-router"
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(["1"])
const route = useRoute()
const routes: any = route.matched[0].children
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.logo {
  height: 50px;
  color: azure;
  text-align: center;
  line-height: 50px;
}
</style>
