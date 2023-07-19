<template>
  <div class="menu_page">
    <div style="width: 100%; height: 100%">
      <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="(item, index) in data" :key="index">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>
            <router-link :to="item.path">
              {{ item.title }}
            </router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router"
import { defineComponent, reactive, toRefs, watch } from "vue"
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  name: "MenuPage",
  setup() {
    const router = useRoute()
    console.log(router.matched[0].children, "router")
    const data: any = router.matched[0].children
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    })
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal
      }
    )
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
      state.openKeys = state.collapsed ? [] : state.preOpenKeys
    }

    return {
      ...toRefs(state),
      toggleCollapsed,
      data,
    }
  },
})
</script>

<style lang="less" scoped>
.menu_page {
  width: 100%;
  height: 100%;
  ul {
    width: 100%;
    height: 100%;
  }
}
</style>
