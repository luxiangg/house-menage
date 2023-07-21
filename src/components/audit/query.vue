<template>
  <div class="query">
    <a-space>
      <a-select ref="select" v-model:value="value1" style="width: 120px" :options="options1" @focus="focus" @change="handleChange"></a-select>
      <a-select v-model:value="value2" style="width: 120px">
        <a-select-option value="lucy">选择省</a-select-option>
      </a-select>
      <a-select v-model:value="value3" style="width: 120px">
        <a-select-option value="lucy">选择市</a-select-option>
      </a-select>
      <a-select v-model:value="value4" style="width: 120px">
        <a-select-option value="lucy">选择区</a-select-option>
      </a-select>
    </a-space>
    <a-button type="primary" @click="query">查询</a-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import type { SelectProps } from "ant-design-vue"
const value1 = ref("发布类型")
const value2 = ref("选择省")
const value3 = ref("选择市")
const value4 = ref("选择区")
const value5 = ref("")
const options1 = ref<SelectProps["options"]>([
  {
    value: "二手房出售",
    label: "二手房出售",
  },
  {
    value: "有房出租",
    label: "有房出租",
  },
  {
    value: "我想买个房",
    label: "我想买个房",
  },
  {
    value: "我想租个房",
    label: "我想租个房",
  },
  {
    value: "帮我找房",
    label: "帮我找房",
  },
])
const focus = () => {
  console.log("focus")
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
  value5.value = value
}
const query = () => {
  console.log(value5.value)
}
</script>
<style>
.query {
  display: flex;
}
</style>
