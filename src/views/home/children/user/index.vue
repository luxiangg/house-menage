<template>
  <div>用户管理</div>
  <div class="search">
    搜索:<a-input-search v-model:value="searchVal" placeholder="请输入用户名搜索" style="width: 200px" @search="onSearch" />
    <a-button type="primary" @click="reset">重置</a-button>
  </div>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <button @click="delUser(record.id)">删除</button>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import request from "@/utils/request"
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
  },
]
const data = ref([])
const searchVal = ref<string>("")

const onSearch = async (searchValue: string) => {
  console.log("or use this.value", searchVal.value)
  let result = await request.get("/dev/user/search", {
    params: {
      searchVal: searchValue,
    },
  })
  console.log(result)
  data.value = result.data.data
}
const getUserList = async () => {
  let result = await request.get("/dev/user/list")
  console.log(result)
  data.value = result.data.data
}
const delUser = async (uid: number) => {
  let result = await request.get("/dev/user/delete", {
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
