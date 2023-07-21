<template>
  <div>
    <a-button type="primary" @click="showModal">新增</a-button>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk" keyboard="true">
      <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
import { reactive, toRaw, ref, onMounted } from "vue"
import { message } from "ant-design-vue"
import { HousesService } from "@/api/houses"
import { HousesManageType } from "@/interface/model/houses"
import { nanoid } from "nanoid"
const housesService = HousesService()
// const data = ref<HousesManageType.GoodsForm>()
interface FormState {
  xq?: string
  name?: string | undefined
  created_at?: Moment | undefined | any
  jjr?: string
  jiage?: string
  ll?: string | undefined
}
const formState = reactive<FormState>({
  xq: "",
  name: undefined,
  created_at: undefined,
  jjr: "",
  jiage: "",
  ll: "",
})
// 新增事件
const onSubmit = async () => {
  toRaw(formState).ll = "1"
  const result = await housesService.add(toRaw(formState))
  // 如果code返回200则给予成功提示否则给予失败提示
  if (result.code) {
    message.success(result.message, 1, () => {
      open.value = false
      getHousesList()
    })
  } else {
    message.error(result.message, 1, () => {
      // state.FormRef.value.formState.value = new HousesManageType.GoodsForm()
      open.value = false
    })
  }
}
onMounted(() => {
  getHousesList()
})
const getHousesList = async () => {
  const result = await housesService.housing()
  result.data.forEach((item: any, index: number) => {
    let date = dateFtt("yyyy-MM-dd hh:mm:ss", item.created_at)
    item.created_at = date
  })
}
const open = ref<boolean>(false)
const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
  open.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
function dateFtt(fmt: any, date: any) {
  if (!date) date = new Date()
  if (!(date instanceof Date)) date = new Date(date)
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
  return fmt
}
</script>
