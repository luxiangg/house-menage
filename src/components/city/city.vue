<template>
  <div class="city">
    <a-space>
      <a-select ref="select" v-model:value="value1" style="width: 150px" @focus="focus" @change="handleChange" placeholder="请选择省份">
        <a-select-option value="jack"></a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
      <a-select v-model:value="value2" style="width: 150px" placeholder="请选择城市">
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
      <a-select v-model:value="value3" style="width: 150px" placeholder="请选择区县">
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
    </a-space>
    <a-input v-model:value="value" placeholder="关键字" size="200px" style="width: 250px" />
    <a-button type="primary">搜索</a-button>
  </div>
</template>
<script lang="ts" setup>
import { SelectTypes } from "ant-design-vue/es/select"
import { ref } from "vue"
const value = ref<string>("")
const options1 = ref<SelectTypes["options"]>([
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
  {
    value: "yiminghe",
    label: "Yiminghe",
  },
])
const options2 = ref<SelectTypes["options"]>([
  {
    value: "lucy",
    label: "Lucy",
  },
])
const options3 = ref<SelectTypes["options"]>([
  {
    value: "lucy",
    label: "Lucy",
  },
])
const focus = () => {
  console.log("focus")
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}
</script>
<style lang="less" scoped>
.city {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
