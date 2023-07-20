<template>
  <div class="info">
    <h5 class="info_title">资讯管理</h5>
    <div class="info_search">
      <ul>
        <li>搜索：<input type="text" placeholder="资讯名称" v-model="value" class="search_ipt" /></li>
        <li>状态： <a-select v-model:value="value1" label-in-value style="width: 120px" :options="options" @change="handleChange"></a-select></li>
        <li>
          <a-button @click="searchBtn">查询</a-button>&nbsp;
          <a-button type="primary">新增</a-button>
        </li>
      </ul>
    </div>
    <div class="info_table">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn" class="info_table_item">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>创建人</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <a-space direction="vertical">
              <a-switch @click="switchChange(record)" :checked="record.status === 1 ? true : false" checked-children="开" un-checked-children="关" />
            </a-space>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="showModal(record)">查看</a>
              <a-divider type="vertical" />
              <a @click="showModal(record)">编辑</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link" @click="deleteInfo(record.id)"> 删除 </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <div>
      <a-modal v-model:open="open" title="编辑" @ok="handleOk">
        <div class="info_modal" style="width: 400px; height: 400px; margin: 0">
          <ul
            style="
              width: 400px;
              height: 400px;
              list-style: none;
              display: flex;
              flex-direction: column;
              flex-wrap: nowrap;
              align-content: space-around;
              justify-content: flex-start;
              align-items: flex-start;
            "
          >
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">文章标题:</span>
              <input type="text" v-model="ipt2" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.tit" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">创建人:</span>
              <input type="text" v-model="ipt3" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.name" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">创建日期: </span>
              <a-space direction="vertical" :size="12">
                <a-date-picker v-model:value="value2" />
              </a-space>
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">状态: </span>
              <a-space direction="vertical">
                <a-switch v-model:checked="checked" checked-children="开" un-checked-children="关" />
              </a-space>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from "ant-design-vue"
import { useStore } from "vuex"
import type { TableColumnsType } from "ant-design-vue"
import { onMounted, ref } from "vue"
import { useInfoSerivice } from "@/api/info"
import type { Dayjs } from "dayjs"
const value2 = ref<Dayjs>()
const open = ref<boolean>(false)
const store = useStore()
const value = ref("")
const data = ref([])
const checked = ref(false)
const value1 = ref({ value: "请选择" })
const infoSerivice = useInfoSerivice()
const data_item = ref()
const ipt2 = ref("")
const ipt3 = ref("")
const options = ref<SelectProps["options"]>([
  {
    value: "1",
    label: "开启",
  },
  {
    value: "2",
    label: "关闭",
  },
])
const columns = ref<TableColumnsType>([
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 150,
  },
  {
    title: "文章标题",
    dataIndex: "tit",
    key: "tit",
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    title: "创建人",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "创建日期",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    key: "action",
  },
])
const handleChange: SelectProps["onChange"] = (value: any) => {
  if (value.key == 1) {
    store.dispatch({
      type: "SAVE_SELECT_DATA",
      payload: 1,
    })
  } else {
    store.dispatch({
      type: "SAVE_SELECT_DATA",
      payload: 0,
    })
  }

  data.value = store.state.information.data
}
const searchBtn = () => {
  if (value.value) {
    store.dispatch({
      type: "SAVE_SEARCH_DATA",
      payload: value.value,
    })
    data.value = store.state.information.data
  } else {
    getList()
  }
}
const getList = async () => {
  const result = await infoSerivice.getInfoData()
  // data.value = result.data
  store.dispatch({
    type: "SAVE_USER_DATA",
    payload: result.data,
  })
  data.value = store.state.information.data
}
const switchChange = async (item: any) => {
  store.dispatch({
    type: "SAVE_SET_DATA",
    payload: item.id,
  })
  data.value = store.state.information.data
  // const result = await infoSerivice.setInfoData({ id: item.id })
  // console.log(result.data, "result")
}
const deleteInfo = async (id: string) => {
  store.dispatch({
    type: "SAVE_DELETE_DATA",
    payload: id,
  })
  data.value = store.state.information.data
  // const result = await infoSerivice.delInfoData({ id })
  // console.log(result.data, "result")
}
function handleResizeColumn(w: any, col: any) {
  col.width = w
}
const showModal = (record: any) => {
  data_item.value = record
  console.log(data_item.value, "data_item.value")
  checked.value = data_item.value.status == 1 ? true : false
  off()
}
const off = () => {
  open.value = true
}
const handleOk = (e: MouseEvent) => {
  if (ipt2.value && ipt3.value) {
    let date = dateFtt("yyyy-MM-dd hh:mm:ss", value2.value)
    let obj = {
      created_at: date,
      date: data_item.value.date,
      id: data_item.value.id,
      name: ipt3.value,
      price: data_item.value.price,
      status: checked.value ? 1 : 0,
      tit: ipt2.value,
    }
    store.dispatch({
      type: "SAVE_SET_DATE",
      payload: obj,
    })
    data.value = store.state.information.data
    data_item.value = ""
    on()
  } else {
    // console.log(value2.value.$d);
    on()
  }
}
const on = () => {
  console.log(data_item.value, "data_item.value")
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

onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .info_title {
    width: 100%;
    height: 20px;
    line-height: 20px;
  }
  .info_search {
    width: 100%;
    height: 100px;
    background: #fff;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      list-style: none;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      li {
        margin: 0 15px;
        .search_ipt {
          width: 200px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }
  .info_table {
    width: 100%;
    height: calc(100% - 1);
    background: #fff;
    margin-top: 20px;
    .info_table_item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
