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
          <button @click="editPort(record)">编辑</button>
          <button @click="delUser(record.id)">删除</button>
        </span>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" :title="isEdit" @ok="handleOk">
    <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
      <a-form-item label="部门名称" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="人数" name="num" :rules="[{ required: true, message: 'Please input your num!' }]">
        <a-input v-model:value="formState.num" />
      </a-form-item>
      <a-form-item label="负责人" name="charge" :rules="[{ required: true, message: 'Please input your charge!' }]">
        <a-input v-model:value="formState.charge" />
      </a-form-item>
      <a-form-item label="职务" name="job" :rules="[{ required: true, message: 'Please input your job!' }]">
        <a-input v-model:value="formState.job" />
      </a-form-item>
      <a-form-item label="手机号" name="tel" :rules="[{ required: true, message: 'Please input your tel!' }]">
        <a-input v-model:value="formState.tel" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import request from "../../utils/request"
interface FormState {
  id?: number
  name: string
  num?: number
  charge: string
  job: string
  tel: string
}
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
const formRef = ref()
const isEdit = ref<string>("新增")
const open = ref<boolean>(false)
const formState = ref<FormState>({
  name: "",
  charge: "",
  job: "",
  tel: "",
})
const showModal = () => {
  formState.value = { name: "", charge: "", job: "", tel: "" }
  isEdit.value = "新增"
  open.value = true
}
const handleOk = async () => {
  formRef.value
    .validateFields()
    .then(async (res: FormState) => {
      console.log(res, "ff")
      open.value = false
      if (isEdit.value == "新增") {
        addPort()
        getUserList()
      } else {
        let result = await request.post("/api/staff/portEdit", formState.value)
        console.log(result)
        getUserList()
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
}
const data = ref([])
const searchVal = ref<string>("")
const onSearch = async (searchValue: string) => {
  console.log("or use this.value", searchVal.value)
  let result = await request.get("/api/staff/portSearch", {
    params: {
      searchVal: searchValue,
    },
  })
  console.log(result)
  data.value = result.data.data
}
const getUserList = async () => {
  let result = await request.get("/api/staff/portList")
  data.value = result.data.data
}
const delUser = async (id: number) => {
  let result = await request.get("/api/staff/portDel", {
    params: {
      id,
    },
  })
  console.log(result)
  getUserList()
}
const editPort = async (value: FormState) => {
  isEdit.value = "编辑"
  open.value = true
  formState.value = value
}
const addPort = async () => {
  let result = await request.post("/api/staff/portAdd", formState.value)
  console.log(result)
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
