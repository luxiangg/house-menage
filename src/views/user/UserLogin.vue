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
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useUserService } from "@/api/user"
import { ref } from "vue"
import { useRouter } from "vue-router"
interface FormState {
  username: string
  password: string
}
const router = useRouter()
const userService = useUserService()
const formState = ref<FormState>({
  username: "",
  password: "",
})
//表单字段校验通过
const onFinish = async (values: any) => {
  console.log("Success:", values)
  let result = await userService.login(values)
  if (result.code == 200) {
    localStorage.setItem("token", result.token)
    router.push({
      name: "Houses",
    })
  }
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
