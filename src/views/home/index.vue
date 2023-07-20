<template>
  <div class="home">
    <div class="header">
      <Header></Header>
    </div>
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="right">
      <Content></Content>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router"
import { defineComponent, reactive, toRefs, watch } from "vue"
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from "@ant-design/icons-vue"
import Header from "@/components/layout/Header.vue"
import Menu from "@/components/layout/Menu.vue"
import Content from "@/components/layout/Content.vue"
export default defineComponent({
  name: "HomePage",
  components: {
    Header,
    Menu,
    Content
  },
  setup() {
    const router = useRoute()
    // console.log(router.matched[0].children, "router")
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

.home {
  width: 100%;
  height: 100%;
  background: red;
  .header {
    width: 100%;
    height: 70px;
  }
  .left {
    width: 10%;
    height: calc(100% - 70px);
    float: left;
  }
  .right {
    width: 90%;
    height: calc(100% - 70px);
    float: left;
  }
}
</style>
