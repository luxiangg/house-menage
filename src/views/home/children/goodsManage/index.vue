<template>
  <div class="box">
    <h4>订单管理</h4>
    <p>
      <span>订单类型：</span>
      <a-select style="width: 180px" @change="selectChange">
        <a-select-option value="请选择">请选择</a-select-option>
        <a-select-option value="二手房出租">二手房出租</a-select-option>
        <a-select-option value="房屋出租">房屋出租</a-select-option>
        <a-select-option value="我想买个房">我想买个房</a-select-option>
        <a-select-option value="我想租个房">我想租个房</a-select-option>
        <a-select-option value="垃圾房产">垃圾房产</a-select-option>
        <a-select-option value="新楼盘">新楼盘</a-select-option>
      </a-select>
      <span>搜索：</span>
      <input type="text" @focus="inputFocus" ref="inputValue" placeholder="请输入手机号/用户名/订单号" />
      <button @click="inquire">查询</button>
    </p>
    <div class="main">
      <a-table :dataSource="dataSource" :columns="columns" bordered />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import request from "../../../../utils/request"
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "订单编号",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "手机号",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "支付金额",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "支付时间",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "操作",
    dataIndex: "Controls",
    key: "Controls",
  },
]
let arr = ref([])
let inputValue = ref()
let dataSource = ref([])
onMounted(() => {
  list()
})
const list = async () => {
  const data = (await request.get("/dev/order")).data.data
  arr.value = data.sort((a: any, b: any) => {
    return a.id - b.id
  })
  dataSource.value = data.sort((a: any, b: any) => {
    return a.id - b.id
  })
}
const selectChange = (e: any) => {
  if (e == "请选择") {
    dataSource.value = arr.value
  } else {
    const filterArr = arr.value.filter((item: any, index: any) => {
      return item.type == e
    })
    dataSource.value = filterArr
  }
}
const inputFocus = (e: any) => {
  e.target.value = ""
}
const inquire = () => {
  if (inputValue.value.value == "") {
    dataSource.value = arr.value
  } else {
    const filterArr = arr.value.filter((item: any, index: any) => {
      return item.username == inputValue.value.value || item.tel == inputValue.value.value || item.serial == inputValue.value.value
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
  margin-right: 20px;
}

.box p input {
  color: #ccc;
  background-color: #fff;
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
