<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="(item, index) in aaa" :key="item.key" :tab="item.tab" :disabled="item.key === '2' ? true : false">
        <!-- 新增modal弹框 -->
        <FORM></FORM>
        <!-- 下拉框和搜索框 -->
        <CITY></CITY>
        <a-table :columns="columns" :data-source="list">
          <template #bodyCell="{ column, record }">
            <!-- 表格操作内容 -->
            <template v-if="column.key === 'action'">
              <span>
                <a>编辑</a>
                <!-- 点击事件传入该数据的id -->
                <a @click="shan(record.id)">删除 </a>
              </span>
            </template>
            <!-- 表格排序 -->
            <template v-if="column.key === 'll'">
              <span>1</span>
            </template>
            <!-- 表格状态管理 -->
            <template v-if="column.key === 'jiage'">
              <span>{{ record.jiage }}/㎡</span>
            </template>
            <template v-if="column.key === 'state' && item.key === '3'">
              <a-switch :checked="record.state === '1' ? true : false" checked-children="正常" un-checked-children="关闭" @change="state(record)" />
            </template>
          </template>
          <!-- <template #ll>
            <span>1</span>
          </template>
          <template #state="{ record }" v-if="item.key === '3'">
            <a-switch :checked="record.state === '1' ? true : false" checked-children="正常" un-checked-children="关闭" @change="state(record)" />
          </template> -->
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import { HousesService } from "@/api/houses"
import { HousesManageType } from "@/interface/model/houses"
import { useStore } from "vuex"
import { message, Result } from "ant-design-vue"
import { reactive } from "vue"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue"
const store = useStore()
const housesService = HousesService()
const housing = ref<Array<HousesManageType.GoodsForm>>([])
// 挂载
onMounted(() => {
  // 获取数据库接口调用
  getHousesList()
})
// 从仓库将存储的数据取出
const list = computed(() => {
  return store.state.houses.hosing
})
// 后端返回的数据进行存储赋值
const getHousesList = async () => {
  // 将后端取出的值存储
  const result = await housesService.housing()
  // 将所有数据的时间循环将时间格式转化后再将值替换回去
  result.data.forEach((item: any, index: number) => {
    let date = dateFtt("yyyy-MM-dd hh:mm:ss", item.created_at)
    item.created_at = date
  })
  //赋值
  housing.value = result.data
  //传入仓库
  store.commit("add", result)
}
// 时间转换格式
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
//删除接口
const shan = async (id: any) => {
  // 将后端返回的值进行赋值
  const result = await housesService.delete({ id })
  // 如果code返回200则给予成功提示否则给予失败提示
  if (result.code) {
    message.success(result.message, 1, () => {
      getHousesList()
    })
  } else {
    message.error(result.message, 1, () => {
      getHousesList()
    })
  }
}
// 状态开关的change事件
const state = (record: HousesManageType.GoodsForm) => {
  // 如果获取到状态为1那么数据则改变为0否则就改变为1
  if (record.state === "1") {
    record.state = "0"
  } else {
    record.state = "1"
  }
  console.log(record)
}
const activeKey = ref("1")
// tabs切换数据
const aaa = [
  {
    key: "1",
    tab: "新房售卖",
  },
  {
    key: "2",
    tab: "二手房售卖",
  },
  {
    key: "3",
    tab: "房屋租聘",
  },
]
// 表格数据
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "楼盘名称",
    dataIndex: "xq",
    key: "xq",
  },
  {
    title: "详细地址",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "价格",
    dataIndex: "jiage",
    key: "jiage",
  },
  {
    title: "排序",
    dataIndex: "ll",
    key: "ll",
  },
  {
    title: "更新时间",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "状态",
    key: "state",
  },
  {
    title: "经纪人",
    dataIndex: "jjr",
    key: "jjr",
  },
  {
    title: "操作",
    key: "action",
  },
]
</script>
<style lang="less" scoped></style>
