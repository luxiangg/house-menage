<template>
  <div>
    <a-button type="primary" @click="showModal">新增</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" keyboard="true">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="楼盘名称">
          <a-input v-model:value="formState.xq" />
        </a-form-item>
        <a-form-item label="详细地址">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input v-model:value="formState.jiage" type="textarea" />
        </a-form-item>
        <a-form-item label="更新时间">
          <a-date-picker v-model:value="formState.created_at" show-time type="date" placeholder="Pick a date" style="width: 100%" />
        </a-form-item>
        <a-form-item label="经纪人">
          <a-input v-model:value="formState.jjr" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px">Cancel</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { Moment } from "moment"
import { reactive, toRaw, UnwrapRef, ref } from "vue"
interface FormState {
  xq: string
  name: string | undefined
  created_at: Moment | undefined
  jjr: string
  jiage: string
  desc: string
}
const formState: UnwrapRef<FormState> = reactive({
  xq: "",
  name: undefined,
  created_at: undefined,
  jjr: "",
  jiage: "",
  desc: "",
})
const onSubmit = () => {
  console.log("submit!", toRaw(formState))
  visible.value = false
}
const visible = ref<boolean>(false)

const showModal = () => {
  visible.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  visible.value = false
}
</script>
