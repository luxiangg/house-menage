<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane v-for="(item, index) in aaa" :key="item.key" :tab="item.tab">
      <QUETY></QUETY>
      <FORM_AUDIT></FORM_AUDIT>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const activeKey = ref("1")
const aaa = [
  {
    key: "1",
    tab: "发布审核",
  },
  {
    key: "2",
    tab: "求租求购审核",
  },
]
</script>
