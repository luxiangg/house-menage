<template>
  <div class="box">
    <h4>咨讯管理</h4>
    <p>
      <span>搜索:</span>
      <input type="text" placeholder="团购名称" />
      <span>状态：</span>
      <a-select style="width: 80px" @change="selectChange">
        <a-select-option value="请选择">请选择</a-select-option>
        <a-select-option value="已开团">已开团</a-select-option>
        <a-select-option value="未开团">未开团</a-select-option>
      </a-select>
      <select style="width: 100px">
        <option value="请选择">请选择省份</option>
        <option value="北京">北京</option>
        <option value="安徽">安徽</option>
        <option value="福建">福建</option>
        <option value="甘肃">甘肃</option>
        <option value="广西">广西</option>
        <option value="广东">广东</option>
      </select>
      <select style="width: 100px">
        <option value="请选择">请选择城市</option>
        <option value="北京市">北京市</option>
        <option value="宿州">宿州</option>
        <option value="福州">福州</option>
        <option value="兰州">兰州</option>
        <option value="南宁">南宁</option>
        <option value="广州">广州</option>
      </select>
      <select style="width: 100px">
        <option value="请选择">请选择区县</option>
        <option value="北京县">北京县</option>
        <option value="宿州县">宿州县</option>
        <option value="福州县">福州县</option>
        <option value="兰州县">兰州县</option>
        <option value="南宁县">南宁县</option>
        <option value="广州县">广州县</option>
      </select>
      <input type="text" placeholder="关键字" style="margin-left: 10px" />
      <a-select style="width: 80px" @change="selectChange">
        <a-select-option value="请选择">请选择</a-select-option>
        <a-select-option value="已开团">正常</a-select-option>
        <a-select-option value="未开团">关闭</a-select-option>
      </a-select>
      <button>查询</button>
    </p>
    <div class="main">
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'Controls'">
            <span>
              <button @click="delStaff(record.id)">删除</button>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Ref } from "vue"
import request from "../../../../utils/request"
import { group } from "@/interface/model/Group"

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "图片",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "楼盘名称",
    dataIndex: "titname",
    key: "titname",
  },
  {
    title: "楼盘地址",
    dataIndex: "tit",
    key: "tit",
  },
  {
    title: "发起人",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "起始时间",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "团购状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "状态",
    dataIndex: "anyStatus",
    key: "anyStatus",
  },
  {
    title: "编辑",
    dataIndex: "Controls",
    key: "Controls",
  },
]
const dataSource = ref<Array<group>>([])
let arr = ref<Array<group>>([])
onMounted(() => {
  list()
})
//列表数据
const list = async () => {
  const data = (await request.get("/dev/information")).data.data
  if (data.length > 0) {
    arr.value = data.sort((arrItem: group, brrItem: group) => {
      return arrItem.id - brrItem.id
    })
    dataSource.value = data.sort((arrItem: group, brrItem: group) => {
      return arrItem.id - brrItem.id
    })
    dataSource.value.forEach((dataSourceItem: group) => {
      if (dataSourceItem.status == 1 && dataSourceItem.anyStatus == 1) {
        dataSourceItem.status = "已开团"
        dataSourceItem.anyStatus = "正常"
      } else {
        dataSourceItem.status = "未开团"
        dataSourceItem.anyStatus = "关闭"
      }
    })
  } else {
    dataSource.value = []
  }
}
const delStaff = async (id: number) => {
  const data = await request.delete("/dev/del/information", { params: { id: id } })
  list()
}
const selectChange = (selectItem: group) => {
  if (selectItem == "请选择") {
    dataSource.value = arr.value
  } else {
    const filterArr = arr.value.filter((Arritem: group) => {
      return Arritem.status == selectItem
    })
    dataSource.value = filterArr
  }
}
</script>

<style>
.box {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.box h4 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #f4f1f1;
  font-weight: normal;
}

.box p {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.box p select {
  color: #ccc;
  width: 180px;
  margin-left: 10px;
}

.box p input {
  color: #ccc;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  margin-right: 10px;
}

.box p button {
  width: 50px;
  height: 25px;
  margin-left: 10px;
  color: #f4f1f1;
  background: #ccc;
  border: none;
}
</style>
