<template>
  <div>
    <FORM></FORM>
    <CITY></CITY>
    <a-table :data-source="list" :columns="columns">
      <template #action="{ record }">
        <span>
          <a>编辑</a>
          <a @click="shan(record.id)">删除 </a>
        </span>
      </template>
      <template #ll>
        <span>1</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import { HousesService } from "@/api/houses"
import { HousesManageType } from "@/interface/model/houses"
import { useStore } from "vuex"
import { message, Result } from "ant-design-vue"
const store = useStore()
const housesService = HousesService()
const housing = ref<Array<HousesManageType.GoodsForm>>([])
const dataSource = []
onMounted(() => {
  getHousesList()
})
const list = computed(() => {
  return store.state.houses.hosing
})
const getHousesList = async () => {
  const result = await housesService.housing()
  housing.value = result.data
  console.log(housing.value)
  store.commit("add", result)
  console.log(store.state.houses.hosing)
}
const shan = async (id: any) => {
  // store.commit("shan", record)
  const result = await housesService.delete({ id })
  if (result.code) {
    message.success(result.message, 1, () => {
      getHousesList()
    })
  } else {
    message.error(result.message, 1, () => {
      getHousesList()
    })
  }
}
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "楼盘名称",
    dataIndex: "xq",
    key: "xq",
  },
  {
    title: "详细地址",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "价格",
    dataIndex: "jiage",
    key: "jiage",
  },
  {
    title: "排序",
    key: "ll",
    slots: { customRender: "ll" },
  },
  {
    title: "更新时间",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "状态",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "经纪人",
    dataIndex: "jjr",
    key: "jjr",
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]
</script>
<style lang="less" scoped></style>
