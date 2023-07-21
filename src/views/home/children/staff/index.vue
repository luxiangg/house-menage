<template>
  <div>员工管理</div>
  <!-- tab切换 -->
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="部门列表"><PortList></PortList></a-tab-pane>
    <a-tab-pane key="2" tab="员工列表" force-render><StaffList></StaffList></a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import PortList from "@/components/staff/PortList.vue"
import StaffList from "@/components/staff/StaffList.vue"
import { ref } from "vue"
const activeKey = ref("1")
</script>
