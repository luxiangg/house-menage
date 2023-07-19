<template>
  <div class="search">
    搜索:<a-input-search v-model:value="searchVal" placeholder="请输入员工名称" style="width: 200px" @search="onSearch" />
    <a-button type="primary" @click="reset">重置</a-button>
    <a-button type="primary" @click="showModal">新增员工</a-button>
  </div>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <button @click="editStaff(record)">编辑</button>
          <button @click="delStaff(record.id)">删除</button>
        </span>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" :title="isEdit" @ok="handleOk">
    <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
      <a-form-item label="部门选择" name="port" :rules="[{ required: true, message: 'Please input your name!' }]">
        <a-input v-model:value="formState.port" />
      </a-form-item>
      <a-form-item label="姓名" name="name" :rules="[{ required: true, message: 'Please input your num!' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="工号" name="jobNum" :rules="[{ required: true, message: 'Please input your charge!' }]">
        <a-input v-model:value="formState.jobNum" />
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
  jobNum?: string
  port: string
  job: string
  tel: string
  password?: string
}
const columns = [
  {
    title: "部门名称",
    dataIndex: "port",
    key: "port",
  },
  {
    title: "工号",
    dataIndex: "jobNum",
    key: "jobNum",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "职务",
    dataIndex: "job",
    key: "job",
  },
  {
    title: "生成密码",
    dataIndex: "password",
    key: "password",
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
  jobNum: "",
  job: "",
  tel: "",
  port: "",
})
const showModal = () => {
  formState.value = { name: "", jobNum: "", job: "", tel: "", port: "" }
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
        addStaff()
        getStaffList()
      } else {
        let result = await request.post("/api/staff/staffEdit", formState.value)
        console.log(result)
        getStaffList()
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
  let result = await request.get("/api/staff/staffSearch", {
    params: {
      searchVal: searchValue,
    },
  })
  console.log(result)
  data.value = result.data.data
}
const getStaffList = async () => {
  let result = await request.get("/api/staff/staffList")
  data.value = result.data.data
}
const delStaff = async (id: number) => {
  let result = await request.get("/api/staff/staffDel", {
    params: {
      id,
    },
  })
  console.log(result)
  getStaffList()
}
const editStaff = async (value: FormState) => {
  isEdit.value = "编辑"
  open.value = true
  formState.value = value
}
const addStaff = async () => {
  let result = await request.post("/api/staff/staffAdd", formState.value)
  console.log(result)
}
const reset = () => {
  searchVal.value = ""
  getStaffList()
}
onMounted(() => {
  getStaffList()
})
</script>
<style lang="less" scoped>
.search {
  height: 78px;
  display: flex;
  align-items: center;
}
</style>
