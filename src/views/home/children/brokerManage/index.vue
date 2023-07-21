<template>
  <div class="broker">
    <h5 class="broker_title">资讯管理</h5>
    <div class="broker_search">
      <ul>
        <li>搜索：<input type="text" placeholder="资讯名称" v-model="value2" class="search_ipt" /></li>
        <li>状态： <a-select v-model:value="value1" label-in-value style="width: 120px" :options="options" @change="handleChange"></a-select></li>
        <li>
          <a-button @click="nameSearch">查询</a-button>&nbsp; <a-button type="primary" @click="addButton">新增</a-button>&nbsp;
          <a-button type="primary" @click="getList">重置</a-button>
        </li>
      </ul>
    </div>
    <div class="broker_table">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn" class="broker_table_item">
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
              <a-switch @click="switchChange(record)" :checked="record.state === '在职' ? true : false" checked-children="开" un-checked-children="关" />
            </a-space>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="showModal(record)">查看</a>
              <a-divider type="vertical" />
              <a @click="showModal(record)">编辑</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link" @click="deletebroker(record.id)"> 删除 </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <div>
      <a-modal v-model:open="open" title="编辑" @ok="handleOk" @cancel="offButton">
        <div class="broker_modal" style="width: 400px; height: 400px; margin: 0">
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
              <span style="display: inline-block; width: 80px; float: left">姓名:</span>
              <input type="text" v-model="name" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.name" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">手机号:</span>
              <input type="text" v-model="tel" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.tel" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">公司:</span>
              <input type="text" v-model="company" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.company" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">新房:</span>
              <input type="text" v-model="new_house" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.new_house" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">二手房:</span>
              <input
                type="text"
                v-model="second_hand_house"
                style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc"
                :placeholder="data_item.second_hand_house"
              />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">租房:</span>
              <input type="text" v-model="renting" style="width: 200px; height: 30px; border-radius: 10px; border: 1px solid #ccc" :placeholder="data_item.renting" />
            </li>
            <li style="width: 100%; height: 50px; margin-top: 10px">
              <span style="display: inline-block; width: 80px; float: left">状态: </span>
              <a-space direction="vertical">
                <a-switch v-model:checked="checked" checked-children="在职" un-checked-children="离职" />
              </a-space>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
    <BorderTopOutlined />
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from "ant-design-vue"
import type { TableColumnsType } from "ant-design-vue"
import { onMounted, ref } from "vue"
import { useBroKerSerivice } from "@/api/broker"
import { RadiusUpleftOutlined, RadiusUprightOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined, BorderTopOutlined, BorderBottomOutlined } from "@ant-design/icons-vue"
import { notification } from "ant-design-vue"
import type { NotificationPlacement } from "ant-design-vue"

const open = ref<boolean>(false)
const value2 = ref("")
const data = ref([])
const checked = ref(false)
const value1 = ref({ value: "请选择" })
const brokerSerivice = useBroKerSerivice()
const data_item = ref({
  name: "请填写姓名",
  tel: "请填写手机号",
  company: "请填写公司名称",
  new_house: "请填写新房数量",
  second_hand_house: "请填写二手房数量",
  renting: "请填写出租房数量",
  created_at: "",
  id: "",
  updated_at: "",
  state: "",
})
const name = ref("")
const company = ref("")
const new_house = ref("")
const second_hand_house = ref("")
const renting = ref("")
const tel = ref("")
const flag = ref(false)
const strFlag = ref("")
const allNull = () => {
  data_item.value.name = "请填写姓名"
  data_item.value.tel = "请填写手机号"
  data_item.value.company = "请填写公司名称"
  data_item.value.new_house = "请填写新房数量"
  data_item.value.second_hand_house = "请填写二手房数量"
  data_item.value.renting = "请填写出租房数量"
  data_item.value.created_at = ""
  data_item.value.id = ""
  data_item.value.updated_at = ""
  name.value = ""
  company.value = ""
  new_house.value = ""
  second_hand_house.value = ""
  renting.value = ""
  tel.value = ""
}
const options = ref<SelectProps["options"]>([
  {
    value: "1",
    label: "在职",
  },
  {
    value: "2",
    label: "离职",
  },
])
const columns = ref<TableColumnsType>([
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },

  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "手机号",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "公司",
    dataIndex: "company",
    key: "company",
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    title: "新房",
    dataIndex: "new_house",
    key: "new_house",
  },
  {
    title: "二手房",
    dataIndex: "second_hand_house",
    key: "second_hand_house",
  },
  {
    title: "租房",
    dataIndex: "renting",
    key: "renting",
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
// 根据状态查找内容
const handleChange: SelectProps["onChange"] = async (value: any) => {
  const result = await brokerSerivice.searchCheckBroKerrmation({ state: value.label })
  if (result.code === 200) {
    data.value = result.data
    on()
    openNotification("top", "查找成功")
  } else {
    on()
    openNotification("top", "查找失败")
  }
}
function handleResizeColumn(w: any, col: any) {
  col.width = w
}

// 默认获取数据
const getList = async () => {
  const result = await brokerSerivice.getBroKerData()
  data.value = result.data
}
// 编辑
const showModal = (record: any) => {
  flag.value = false
  data_item.value = record
  checked.value = data_item.value.state == "在职" ? true : false
  strFlag.value = "编辑"
  off()
}
// 修改开关
const switchChange = async (item: any) => {
  const { state, id, company, name, new_house, created_at, renting, second_hand_house, tel, updated_at } = item
  let str = ""
  if (item.state === "离职") {
    str = "在职"
  } else {
    str = "离职"
  }
  let obj = {
    company,
    created_at,
    id,
    name,
    new_house,
    renting,
    second_hand_house,
    state: str,
    tel,
    updated_at,
  }
  const result = await brokerSerivice.setBroKerData(obj)
  if (result.code === 200) {
    getList()
    openNotification("top", result.message)
  } else {
    openNotification("top", result.message)
  }
  allNull()
}
// 删除数据
const deletebroker = async (id: string) => {
  const result = await brokerSerivice.delBroKerData({ id })
  if (result.code === 200) {
    openNotification("top", result.message)
    getList()
  } else {
    openNotification("top", result.message)
  }
}
// 关闭对话框
const offButton = () => {
  allNull()
}
// 保存
const handleOk = async (e: MouseEvent) => {
  off()
  if (strFlag.value === "新增") {
    let date = new Date()
    let time = dateFtt("yyyy-MM-dd hh:mm:ss", date)
    const id = data.value.length + 4
    let obj = {
      company: company.value,
      created_at: "0000-00-00 00:00:00",
      id: id,
      name: name.value,
      new_house: new_house.value,
      renting: renting.value,
      second_hand_house: second_hand_house.value,
      state: checked.value == true ? "在职" : "离职",
      tel: tel.value,
      updated_at: "0000-00-00 00:00:00",
    }
    const result = await brokerSerivice.addBroKerData(obj)
    if (result.code === 200) {
      getList()
      on()
      openNotification("top", result.message)
    } else {
      openNotification("top", result.message)
    }
  } else {
    let obj: any = {
      company: company.value,
      created_at: data_item.value.created_at,
      id: data_item.value.id,
      name: name.value,
      new_house: new_house.value,
      renting: renting.value,
      second_hand_house: second_hand_house.value,
      state: checked.value == true ? "在职" : "离职",
      tel: tel.value,
      updated_at: data_item.value.updated_at,
    }
    const result = await brokerSerivice.setBroKerData(obj)
    if (result.code) {
      openNotification("top", result.message)
      getList()
      allNull()
      setTimeout(() => {
        on()
      }, 100)
    }
  }
}
// 新增功能
const addButton = () => {
  strFlag.value = "新增"
  off()
}
// name搜索
const nameSearch = async () => {
  if (value2.value) {
    const result = await brokerSerivice.searchBroKerrmation({ name: value2.value })
    if (result.code === 200) {
      data.value = result.data
      on()
      openNotification("top", "查找成功")
    } else {
      on()
      openNotification("top", "查找失败")
    }
  }
}
const on = () => {
  allNull()
  open.value = false
}
const off = () => {
  open.value = true
}
function dateFtt(fmt: any, date: any) {
  if (!date) date = new Date()
  if (!(date instanceof Date)) date = new Date(date)
  var o: any = {
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
const openNotification = (placement: NotificationPlacement, msg: string) => {
  notification.open({
    message: `Notification ${placement}`,
    description: msg,
    placement,
  })
}
onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
#webpack-dev-server-client-overlay-div {
  display: none !important;
}
.broker {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .broker_title {
    width: 100%;
    height: 20px;
    line-height: 20px;
  }
  .broker_search {
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
  .broker_table {
    width: 100%;
    height: calc(100% - 1);
    background: #fff;
    margin-top: 20px;
    .broker_table_item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
