<template>
  <div class="box">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="手机号" name="tel" :rules="[{ required: true, message: 'Please input your tel!' }]">
        <a-input-password v-model:value="formState.tel" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import request from "../../utils/request"
import { ref } from "vue"
interface FormState {
  username: string
  password: string
  tel: string
}
const formState = ref<FormState>({
  username: "",
  password: "",
  tel: "",
})
//表单字段校验通过
const onFinish = async (values: any) => {
  let result = await request.post("/api/registry", formState.value)
  console.log(result)
}
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}
</script>
<style lang="less">
.box {
  margin: 0 auto;
  width: 500px;
  height: 500px;
  margin-top: 150px;
}
</style>
