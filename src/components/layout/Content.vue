<template>
  <div class="content">
    <a-layout class="layout">
      <a-layout-content style="padding: 0 50px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item></a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ background: '#f5f5f5', padding: '24px', minHeight: '100%' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> 八维第二，无人第一 </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
  setup() {
    return {
      selectedKeys: ref<string[]>(["2"]),
    }
  },
})
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    height: 100%;
  }
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
