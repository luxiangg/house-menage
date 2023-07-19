<template>
  <div class="search">
    搜索:<a-input-search v-model:value="searchVal" placeholder="请输入部门名称" style="width: 200px" @search="onSearch" />
    <a-button type="primary" @click="reset">重置</a-button>
    <a-button type="primary" @click="showModal">创建部门</a-button>
  </div>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <button>编辑</button>
          <button @click="delUser(record.id)">删除</button>
        </span>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import request from "../../utils/request"
const columns = [
  {
    title: "部门名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "人数",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "负责人",
    dataIndex: "charge",
    key: "charge",
  },
  {
    title: "手机号",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "操作",
    key: "action",
  },
]
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
const data = ref([])
const searchVal = ref<string>("")
const onSearch = async (searchValue: string) => {
  console.log("or use this.value", searchVal.value)
  let result = await request.get("/api/user/search", {
    params: {
      searchVal: searchValue,
    },
  })
  console.log(result)
  data.value = result.data.data
}
const getUserList = async () => {
  let result = await request.get("/api/staff/list")
  console.log(result)
  data.value = result.data.data
}
const delUser = async (uid: number) => {
  let result = await request.get("/api/user/delete", {
    params: {
      id: uid,
    },
  })
  console.log(result)
  getUserList()
}
const reset = () => {
  searchVal.value = ""
  getUserList()
}
onMounted(() => {
  getUserList()
})
</script>
<style lang="less" scoped>
.search {
  height: 78px;
  display: flex;
  align-items: center;
}
</style>
