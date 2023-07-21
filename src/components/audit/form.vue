<template lang="">
  <div>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="(item, index) in aaa" :key="item.key" :tab="item.tab">
        <a-table :columns="columns" :data-source="data">
          <template #action="{ record }">
            <span>
              <a>审核通过</a>
              <a @click="shan(record.id)">审核不通过 </a>
              <a>详情</a>
            </span>
          </template>
          <template #img>
            <img src="https://ts2.cn.mm.bing.net/th?id=OIP-C.Y5Lu0NFThWsYNIqm4enL_gHaFh&w=289&h=215&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" style="width: 20px; height: 20px" />
            <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.L4soOWXr0_o4-w4-MH7mYQHaFj?w=243&h=182&c=7&r=0&o=5&pid=1.7" alt="" style="width: 20px; height: 20px; margin: 5px" />
          </template>
          <template #status v-if="item.key === '3'">
            <a-switch v-model:checked="state.checked1" checked-children="正常" un-checked-children="关闭" />
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useAuditService } from "../../api/audit"
import { AuditManageType } from "../../interface/model/audit"
const anditservice = useAuditService()
const data = ref()
onMounted(() => {
  gitAuditmessage()
})
const gitAuditmessage = async () => {
  const result = await anditservice.audit()
  console.log(result.data)
  data.value = result.data
}
const activeKey = ref("1")
const aaa = [
  {
    key: "1",
    tab: "待审核",
  },
  {
    key: "2",
    tab: "审核通过",
  },
  {
    key: "3",
    tab: "审核不通过",
  },
]
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户名",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "手机号",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "小区名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "地址",
    key: "prov",
    dataIndex: "prov",
  },
  {
    title: "面积",
    dataIndex: "area",
    key: "area",
  },
  {
    title: "房产证件照片",
    key: "img",
    slots: { customRender: "img" },
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "发布类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]
</script>
<style lang=""></style>
