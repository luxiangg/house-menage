<template>
  <div class="box">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import request from '@/utils/request'
import { reactive, toRaw } from 'vue'
interface FormState {
  username: string
  password: string
}
const formState = reactive<FormState>({
  username: '',
  password: ''
})
const onFinish = async (values: any) => {
  console.log('Success:', values)
  let { username, password } = values
  console.log(username, 'uu')

  let result = await request.post('/api/login', toRaw(values))
  console.log(result)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
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
