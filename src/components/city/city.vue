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
    <a-input-search v-model:value="value" placeholder="input search text" enter-button="Search" size="large" @search="onSearch" />
  </div>
</template>
<script lang="ts" setup>
import { SelectTypes } from "ant-design-vue/es/select"
import { useStore } from "vuex"
import { ref } from "vue"
const store = useStore()

const value = ref<string>("")

const onSearch = async (searchValue: string) => {
  console.log("use value", searchValue)
  console.log("or use this.value", value.value)
  console.log(store.state.houses.hosing)
  store.state.houses.hosing = store.state.houses.hosing.filter((item: any) => item.xq.includes(searchValue))
}
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
