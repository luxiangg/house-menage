<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane v-for="(item, index) in list" :key="item.key" :tab="item.tab">Content of Tab Pane 1</a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const activeKey = ref("1")
const list = [
  {
    key: "1",
    tab: "新房售卖",
  },
  {
    key: "2",
    tab: "二手房售卖",
  },
  {
    key: "3",
    tab: "房屋租聘",
  },
]
</script>
