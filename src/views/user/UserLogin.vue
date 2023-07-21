<template>
  <div class="box">
    <div class="left">
      <img src="https://img1.baidu.com/it/u=508964994,2237805635&fm=253&fmt=auto&app=138&f=PNG?w=500&h=679" alt="" />
    </div>
    <div class="right">
      <h1>宏烨找房后台系统</h1>
      <a-form
        class="form"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button style="background-color: rgb(60, 126, 184); width: 100%" type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
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
<style lang="less" scoped>
body {
  width: 100%;
  height: 100%;
  background-image: url(https://img.tukuppt.com/bg_grid/01/21/73/Z3uzP6zWY5.jpg%21/fh/350);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.box {
  border-radius: 5%;
  box-shadow: 0px 10px 20px 10px rgb(60, 126, 184);
  background-color: aliceblue;
  margin: 0 auto;
  width: 800px;
  height: 400px;
  margin-top: 175px;
  display: flex;
  .left {
    border-radius: 5%;
    width: 60%;
    height: 100%;
    img {
      border-radius: 5%;
      width: 100%;
      height: 100%;
    }
  }
  .right {
    h1 {
      text-align: center;
    }
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
